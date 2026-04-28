import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';

@Injectable()
export class WalletsRepository {
    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    ) { }

    /**
     * Find a wallet by the owner's user ID.
     * This is the most common query — almost every feature needs the wallet.
     */
    async findByUserId(userId: string) {
        const result = await this.db
            .select()
            .from(schema.wallets)
            .where(eq(schema.wallets.userId, userId));

        return result[0] || null;
    }

    /**
     * Create a new wallet for a user.
     * Called atomically inside a DB transaction during signup.
     * The 'tx' parameter is the transaction object from Drizzle.
     */
    async createWithTransaction(
        tx: NodePgDatabase<typeof schema>,
        userId: string,
    ) {
        const [wallet] = await tx
            .insert(schema.wallets)
            .values({
                userId,
                availableBalance: '0.00',
                lockedBalance: '0.00',
                currency: 'NGN',
                tier: 'unverified',
            })
            .returning();

        return wallet;
    }

    /**
     * Move money from availableBalance INTO lockedBalance.
     * Called when user funds an envelope.
     * Uses SQL arithmetic to avoid race conditions (not: read → add → write).
     */
    async lockFunds(walletId: string, amount: string) {
        const [updated] = await this.db
            .update(schema.wallets)
            .set({
                availableBalance: sql`${schema.wallets.availableBalance} - ${amount}::decimal`,
                lockedBalance: sql`${schema.wallets.lockedBalance} + ${amount}::decimal`,
                updatedAt: new Date(),
            })
            .where(eq(schema.wallets.id, walletId))
            .returning();

        return updated;
    }

    /**
     * Move money from lockedBalance BACK INTO availableBalance.
     * Called when the drip cron runs (payout mode = 'wallet').
     */
    async releaseFunds(walletId: string, amount: string) {
        const [updated] = await this.db
            .update(schema.wallets)
            .set({
                availableBalance: sql`${schema.wallets.availableBalance} + ${amount}::decimal`,
                lockedBalance: sql`${schema.wallets.lockedBalance} - ${amount}::decimal`,
                updatedAt: new Date(),
            })
            .where(eq(schema.wallets.id, walletId))
            .returning();

        return updated;
    }

    /**
     * Get the consolidated balance view.
     * totalBalance = availableBalance + lockedBalance
     * (lockedBalance already equals the sum of all active envelope remainingAmounts)
     */
    async getBalanceSummary(userId: string) {
        const wallet = await this.findByUserId(userId);
        if (!wallet) return null;

        const available = parseFloat(wallet.availableBalance);
        const locked = parseFloat(wallet.lockedBalance);

        return {
            availableBalance: wallet.availableBalance,
            lockedBalance: wallet.lockedBalance,
            totalBalance: (available + locked).toFixed(2),
            currency: wallet.currency,
            tier: wallet.tier,
        };
    }
}
