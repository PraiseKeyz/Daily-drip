import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import { UsersRepository } from '../users/users.repository';
import { WalletsRepository } from '../wallets/wallets.repository';
import { EmailService } from '../../common/email/email.service';
import {
    SignupDto,
    LoginDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    VerifyEmailDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
        private readonly walletsRepository: WalletsRepository,
        private readonly emailService: EmailService,
    ) { }

    async signup(dto: SignupDto) {
        const { email, password, firstName, lastName } = dto;

        const existingUser = await this.usersRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('An account with this email already exists');
        }

        const passwordHash = await argon2.hash(password);

        const { newUser, wallet } = await this.usersRepository.transaction(async (tx) => {
            const newUser = await this.usersRepository.createWithTransaction(tx, {
                email,
                passwordHash,
                firstName,
                lastName,
            });
            const wallet = await this.walletsRepository.createWithTransaction(tx, newUser.id);
            return { newUser, wallet };
        });

        const token = this.generateSecureToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await this.usersRepository.createEmailVerificationToken(newUser.id, token, expiresAt);

        try {
            await this.emailService.sendWelcomeEmail(email, firstName);
            await this.emailService.sendVerificationEmail(email, firstName, token);
        } catch (err) {
            this.logger.warn(
                `[signup] Email delivery failed for ${email} — account created successfully. Error: ${err?.message}`,
            );
        }

        const payload = { email: newUser.email, sub: newUser.id };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                isEmailVerified: newUser.isEmailVerified,
                wallet: {
                    id: wallet.id,
                    tier: wallet.tier,
                    availableBalance: wallet.availableBalance,
                    currency: wallet.currency,
                },
            },
        };
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            await argon2.hash(password);
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await argon2.verify(user.passwordHash, password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { email: user.email, sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async verifyEmail(dto: VerifyEmailDto) {
        const record = await this.usersRepository.findEmailVerificationToken(dto.token);

        if (!record) {
            throw new BadRequestException('Invalid or expired verification link');
        }
        if (record.expiresAt < new Date()) {
            throw new BadRequestException('This verification link has expired. Please request a new one');
        }

        await this.usersRepository.markEmailVerified(record.userId);
        await this.usersRepository.deleteEmailVerificationToken(dto.token);

        return { message: 'Email verified successfully. You can now log in.' };
    }

    async resendVerificationEmail(email: string) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            return { message: 'If an account with that email exists, a verification link has been sent.' };
        }
        if (user.isEmailVerified) {
            throw new BadRequestException('This email is already verified');
        }

        await this.usersRepository.deleteEmailVerificationTokenByUserId(user.id);

        const token = this.generateSecureToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.usersRepository.createEmailVerificationToken(user.id, token, expiresAt);

        await this.emailService.sendVerificationEmail(user.email, user.firstName!, token);

        return { message: 'If an account with that email exists, a verification link has been sent.' };
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const user = await this.usersRepository.findByEmail(dto.email);

        if (!user) {
            return { message: 'If an account with that email exists, a reset link has been sent.' };
        }

        await this.usersRepository.deletePasswordResetTokenByUserId(user.id);

        const token = this.generateSecureToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.usersRepository.createPasswordResetToken(user.id, token, expiresAt);

        await this.emailService.sendPasswordResetEmail(user.email, user.firstName!, token);

        return { message: 'If an account with that email exists, a reset link has been sent.' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        const record = await this.usersRepository.findPasswordResetToken(dto.token);

        if (!record || record.used) {
            throw new BadRequestException('Invalid or expired reset link');
        }
        if (record.expiresAt < new Date()) {
            throw new BadRequestException('This reset link has expired. Please request a new one');
        }

        const passwordHash = await argon2.hash(dto.password);

        await this.usersRepository.updatePassword(record.userId, passwordHash);
        await this.usersRepository.markPasswordResetTokenUsed(dto.token);

        return { message: 'Password reset successfully. You can now log in with your new password.' };
    }

    private generateSecureToken(): string {
        return randomBytes(32).toString('hex');
    }
}
