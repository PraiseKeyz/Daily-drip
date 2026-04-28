import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let errorDetails: any = null;

        // Handle NestJS HttpExceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const responseObj = exceptionResponse as Record<string, any>;
                message = responseObj.message || exception.message;
                errorDetails = responseObj.error || null;
            }
        }
        // Handle Zod Validation Exceptions specifically
        else if (exception instanceof ZodValidationException) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Validation Error';
            errorDetails = ((exception as ZodValidationException).getZodError() as ZodError).issues;
        }
        // Handle generic errors
        else if (exception instanceof Error) {
            this.logger.error(`Generic Error: ${exception.message}`, exception.stack);
            message = exception.message; // In production, you might want to hide this for 500s
        }

        const errorResponse = {
            success: false,
            statusCode: status,
            message,
            error: errorDetails,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(errorResponse);
    }
}
