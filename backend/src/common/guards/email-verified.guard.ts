import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { UsersRepository } from '../../modules/users/users.repository';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
    constructor(private readonly usersRepository: UsersRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId: string = request.user?.userId;

        if (!userId) {
            throw new ForbiddenException('Authentication required');
        }

        const user = await this.usersRepository.findById(userId);

        if (!user?.isEmailVerified) {
            throw new ForbiddenException(
                'Please verify your email address before performing this action. ',
            );
        }

        return true;
    }
}
