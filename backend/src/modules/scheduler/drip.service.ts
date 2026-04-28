
import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DRIZZLE } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { envelopes, wallets, transactions } from '../../database/schema';
import { eq, and, lte, gte, sql } from 'drizzle-orm';

@Injectable()
export class DripSchedulerService {
    private readonly logger = new Logger(DripSchedulerService.name);

    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    ) { }

    // Run at midnight every day
    // For MVP testing, you can change this to CronExpression.EVERY_MINUTE
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleDailyDrip() {
        this.logger.log('Starting daily drip process...');

        // 1. Get current date (start of day)
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // 2. Find envelopes that need dripping
        // Criteria: Active, StartDate <= Now <= EndDate
        // AND (LastDripDate IS NULL OR LastDripDate < TodayStart)
        const activeEnvelopes = await this.db.query.envelopes.findMany({
            where: and(
                eq(envelopes.isActive, true),
                lte(envelopes.startDate, now),
                gte(envelopes.endDate, now),
            ),
        });

        let processedCount = 0;

        for (const envelope of activeEnvelopes) {
            // Check if already dripped today
            if (envelope.lastDripDate && envelope.lastDripDate >= todayStart) {
                continue;
            }

            await this.processDripForEnvelope(envelope);
            processedCount++;
        }

        this.logger.log(`Daily drip completed. Processed ${processedCount} envelopes.`);
    }

    private async processDripForEnvelope(envelope: typeof schema.envelopes.$inferSelect) {
        // Use a transaction for atomicity
        await this.db.transaction(async (tx) => {
            // 1. Get the wallet
            const wallet = await tx.query.wallets.findFirst({
                where: eq(wallets.userId, envelope.userId),
            });

            if (!wallet) {
                this.logger.warn(`Wallet not found for user ${envelope.userId}, skipping envelope ${envelope.id}`);
                return;
            }

            const releaseAmount = envelope.dailyReleaseAmount;

            // 2. Update wallet balances
            // availableBalance += releaseAmount
            // lockedBalance -= releaseAmount (if we locked it upfront, but for now we assume totalAmount is just a tracking number, 
            // OR if we are strictly managing a pot, we should decrement. 
            // Assumption: In this MVP, 'Locked Balance' is effectively 'Remaining Envelope Balance').

            // Let's implement the logic: "Money becomes illiquid by design".
            // Meaning: When envelope is created, money should have been moved to 'Locked'. 
            // For this step, we move from Locked -> Available.

            await tx.update(wallets)
                .set({
                    availableBalance: sql`${wallets.availableBalance} + ${releaseAmount}`,
                    lockedBalance: sql`${wallets.lockedBalance} - ${releaseAmount}`,
                    updatedAt: new Date(),
                })
                .where(eq(wallets.id, wallet.id));

            // 3. Create Transaction Record
            await tx.insert(transactions).values({
                walletId: wallet.id,
                amount: releaseAmount,
                type: 'drip_release',
                description: `Daily release from ${envelope.name}`,
            });

            // 4. Update Envelope Last Drip Date
            await tx.update(envelopes)
                .set({
                    lastDripDate: new Date(),
                    updatedAt: new Date(),
                })
                .where(eq(envelopes.id, envelope.id));
        });
    }
}
