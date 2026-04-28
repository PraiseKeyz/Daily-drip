import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';

type Tx = Parameters<Parameters<NodePgDatabase<typeof schema>['transaction']>[0]>[0];

@Injectable()
export class UsersRepository {
    constructor(
        @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    ) { }

    async findByEmail(email: string) {
        const result = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email));
        return result[0] || null;
    }

    async findById(id: string) {
        const result = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, id));
        return result[0] || null;
    }

    async create(user: { email: string; passwordHash: string; firstName: string; lastName?: string }) {
        const [newUser] = await this.db.insert(schema.users).values(user).returning();
        return newUser;
    }

    async createWithTransaction(tx: Tx, user: { email: string; passwordHash: string; firstName: string; lastName?: string }) {
        const [newUser] = await tx.insert(schema.users).values(user).returning();
        return newUser;
    }

    async markEmailVerified(userId: string) {
        await this.db
            .update(schema.users)
            .set({ isEmailVerified: true, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
    }

    async updatePassword(userId: string, passwordHash: string) {
        await this.db
            .update(schema.users)
            .set({ passwordHash, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
    }

    // ── Email Verification Tokens ──────────────────────────────────

    async createEmailVerificationToken(userId: string, token: string, expiresAt: Date) {
        await this.db.insert(schema.emailVerificationTokens).values({ userId, token, expiresAt });
    }

    async findEmailVerificationToken(token: string) {
        const result = await this.db
            .select()
            .from(schema.emailVerificationTokens)
            .where(eq(schema.emailVerificationTokens.token, token));
        return result[0] || null;
    }

    async deleteEmailVerificationToken(token: string) {
        await this.db
            .delete(schema.emailVerificationTokens)
            .where(eq(schema.emailVerificationTokens.token, token));
    }

    async deleteEmailVerificationTokenByUserId(userId: string) {
        await this.db
            .delete(schema.emailVerificationTokens)
            .where(eq(schema.emailVerificationTokens.userId, userId));
    }

    // ── Password Reset Tokens ──────────────────────────────────────

    async createPasswordResetToken(userId: string, token: string, expiresAt: Date) {
        await this.db.insert(schema.passwordResetTokens).values({ userId, token, expiresAt });
    }

    async findPasswordResetToken(token: string) {
        const result = await this.db
            .select()
            .from(schema.passwordResetTokens)
            .where(eq(schema.passwordResetTokens.token, token));
        return result[0] || null;
    }

    async markPasswordResetTokenUsed(token: string) {
        await this.db
            .update(schema.passwordResetTokens)
            .set({ used: true })
            .where(eq(schema.passwordResetTokens.token, token));
    }

    async deletePasswordResetTokenByUserId(userId: string) {
        await this.db
            .delete(schema.passwordResetTokens)
            .where(eq(schema.passwordResetTokens.userId, userId));
    }

    transaction<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
        return this.db.transaction(callback);
    }
}
