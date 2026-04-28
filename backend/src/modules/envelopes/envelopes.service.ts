
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { envelopes } from '../../database/schema';
import { CreateEnvelopeDto } from './dto/create-envelope.dto';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class EnvelopesService {
    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    ) { }

    async create(userId: string, dto: CreateEnvelopeDto) {
        // 1. Calculate Daily Release Amount
        // Simplified logic: Total / Days in period
        const diffTime = Math.abs(dto.endDate.getTime() - dto.startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Avoid division by zero
        const days = diffDays > 0 ? diffDays : 1;

        // We store money as strings/decimals in DB but calculations often easier with numbers then converted back
        // Or keep as strings if using a precise library like currency.js. For MVP, we use JS numbers carefully.
        const dailyAmount = (dto.totalAmount / days).toFixed(2);

        const [newEnvelope] = await this.db.insert(envelopes).values({
            userId: userId,
            name: dto.name,
            category: dto.category,
            totalAmount: dto.totalAmount.toString(),
            remainingAmount: dto.totalAmount.toString(),
            dailyReleaseAmount: dailyAmount,
            period: dto.measurementPeriod, // Mapped from DTO to DB Enum
            startDate: dto.startDate,
            endDate: dto.endDate,
            isActive: true, // Default to active
        }).returning();

        return newEnvelope;
    }

    async findAll(userId: string) {
        return this.db.query.envelopes.findMany({
            where: eq(envelopes.userId, userId),
            orderBy: (envelopes, { desc }) => [desc(envelopes.createdAt)],
        });
    }

    async findOne(id: string, userId: string) {
        const envelope = await this.db.query.envelopes.findFirst({
            where: and(eq(envelopes.id, id), eq(envelopes.userId, userId)),
        })

        if (!envelope) {
            throw new NotFoundException(`Envelope with ID ${id} not found`);
        }
        return envelope;
    }
}
