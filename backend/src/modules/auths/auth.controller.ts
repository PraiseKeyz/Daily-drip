import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
    SignupDto,
    LoginDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    VerifyEmailDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    async verifyEmail(@Body() dto: VerifyEmailDto) {
        return this.authService.verifyEmail(dto);
    }

    @Post('resend-verification')
    @HttpCode(HttpStatus.OK)
    async resendVerification(@Body() body: { email: string }) {
        return this.authService.resendVerificationEmail(body.email);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req: any) {
        return req.user;
    }
}
