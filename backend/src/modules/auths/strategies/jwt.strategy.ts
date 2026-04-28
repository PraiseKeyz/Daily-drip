import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'secret', // Default for dev, ensure env is set
        });
    }

    async validate(payload: any) {
        // This payload is the decoded JWT.
        // You can add more validation here (e.g., check if user exists in DB).
        // The return value here is injected into req.user
        if (!payload.sub) {
            throw new UnauthorizedException();
        }
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
