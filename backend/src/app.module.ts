
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ZodValidationPipe } from 'nestjs-zod';

import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { validateEnv } from './common/configs/env.validation';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvelopesModule } from './modules/envelopes/envelopes.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { AuthModule } from './modules/auths/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EmailModule } from './common/email/email.module';


@Module({
  imports: [
    // Logger (Pino)
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? {
            target: 'pino-pretty',
            options: { colorize: true, singleLine: true },
          }
          : undefined,
      },
    }),

    EmailModule,

    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute global limit
    }]),

    // Database
    DatabaseModule,

    // Scheduler (Cron)
    ScheduleModule.forRoot(),

    // Feature Modules
    AuthModule,
    UsersModule,
    WalletsModule,
    EnvelopesModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global Validation Pipe (Zod)
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // Global Response Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // Global Rate Limiter Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
