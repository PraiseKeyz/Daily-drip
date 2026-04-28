import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export class LoginDto extends createZodDto(LoginSchema) { }

export const SignupSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export class SignupDto extends createZodDto(SignupSchema) { }

export const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) { }

export const ResetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export class ResetPasswordDto extends createZodDto(ResetPasswordSchema) { }

export const VerifyEmailSchema = z.object({
    token: z.string().min(1),
});

export class VerifyEmailDto extends createZodDto(VerifyEmailSchema) { }
