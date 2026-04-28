
import { Module } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { EnvelopesController } from './envelopes.controller';
import { UsersModule } from '../users/users.module';
import { EmailVerifiedGuard } from '../../common/guards/email-verified.guard';

@Module({
    imports: [UsersModule],
    controllers: [EnvelopesController],
    providers: [EnvelopesService, EmailVerifiedGuard],
})
export class EnvelopesModule { }
