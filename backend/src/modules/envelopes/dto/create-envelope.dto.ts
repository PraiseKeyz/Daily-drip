
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { periodEnum } from '../../../database/schema';

// We import the specific enum values or redefine the Zod enum to match
const PeriodEnumSchema = z.enum(['daily', 'weekly', 'monthly']);

export const CreateEnvelopeSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
    category: z.string().min(1, 'Category is required'),
    measurementPeriod: PeriodEnumSchema, // 'period' in DB, limiting mapped name
    totalAmount: z.number().positive('Total amount must be positive'),
    startDate: z.coerce.date(), // Automatically coerce strings to Date objects
    endDate: z.coerce.date(),
});

export class CreateEnvelopeDto extends createZodDto(CreateEnvelopeSchema) { }
