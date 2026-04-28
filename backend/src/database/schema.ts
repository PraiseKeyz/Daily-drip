
import { pgTable, text, boolean, timestamp, uuid, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// How long the envelope budget period runs
export const periodEnum = pgEnum('period', ['daily', 'weekly', 'monthly']);

// What triggered a transaction in the ledger
export const transactionTypeEnum = pgEnum('transaction_type', [
    'deposit',
    'withdrawal',
    'envelope_lock',
    'envelope_unlock',
    'drip_release',
]);

export const walletTierEnum = pgEnum('wallet_tier', ['unverified', 'verified']);

// Where the daily drip gets released to
export const payoutModeEnum = pgEnum('payout_mode', [
    'wallet',
    'bank',
]);

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash').notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    isEmailVerified: boolean('is_email_verified').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const wallets = pgTable('wallets', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    availableBalance: decimal('available_balance', { precision: 15, scale: 2 }).default('0.00').notNull(),
    lockedBalance: decimal('locked_balance', { precision: 15, scale: 2 }).default('0.00').notNull(),
    currency: text('currency').default('NGN').notNull(),
    tier: walletTierEnum('tier').default('unverified').notNull(),
    dvaAccountNumber: text('dva_account_number'),
    dvaBankName: text('dva_bank_name'),
    dvaProvider: text('dva_provider'),
    dvaDedicatedAt: timestamp('dva_dedicated_at'),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// KYC PROFILES TABLE
// Separate from users table — keeps identity concerns isolated.
// Created when user submits their BVN for verification.
// ─────────────────────────────────────────────────────────────
export const kycProfiles = pgTable('kyc_profiles', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),

    bvn: text('bvn').notNull(),                         // Stored encrypted ideally in production
    bvnVerified: boolean('bvn_verified').default(false).notNull(),
    bvnVerifiedAt: timestamp('bvn_verified_at'),

    // Fields populated after BVN verification (from provider response)
    fullName: text('full_name'),                        // From BVN record
    dateOfBirth: text('date_of_birth'),                 // From BVN record
    phoneNumber: text('phone_number'),                  // From BVN record

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// ENVELOPES TABLE
//
// Money Flow for Envelopes:
//   1. User creates envelope → money moves wallet.available → wallet.locked
//   2. Cron runs daily      → envelope.remaining decreases, wallet.locked decreases
//                             wallet.available increases (if payoutMode = 'wallet')
//                             OR money sent to bank (if payoutMode = 'bank')
//   3. Envelope expires     → any remainingAmount is unlocked back to wallet.available
//
// Critical: remainingAmount starts equal to totalAmount.
// It is the source of truth for "how much is still locked in this envelope".
// ─────────────────────────────────────────────────────────────
export const envelopes = pgTable('envelopes', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),

    name: text('name').notNull(),           // e.g. "Transport", "Feeding"
    category: text('category').notNull(),   // e.g. "Transport", "Food", "Utilities"

    // Money amounts — all stored as precise decimals
    totalAmount: decimal('total_amount', { precision: 15, scale: 2 }).notNull(),
    remainingAmount: decimal('remaining_amount', { precision: 15, scale: 2 }).notNull(), // Decreases with each drip
    dailyReleaseAmount: decimal('daily_release_amount', { precision: 15, scale: 2 }).notNull(),

    period: periodEnum('period').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),

    // Where does the daily drip go?
    payoutMode: payoutModeEnum('payout_mode').default('wallet').notNull(),

    isActive: boolean('is_active').default(true).notNull(),
    lastDripDate: timestamp('last_drip_date'), // Null means no drip has run yet for this envelope

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// TRANSACTIONS TABLE
// Immutable ledger. Every time money moves, we record it here.
// This is the audit trail — never delete or update rows in this table.
// ─────────────────────────────────────────────────────────────
export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    walletId: uuid('wallet_id').references(() => wallets.id).notNull(),

    // Optional: which envelope triggered this transaction (for drip_release, envelope_lock)
    envelopeId: uuid('envelope_id').references(() => envelopes.id),

    amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
    type: transactionTypeEnum('type').notNull(),
    description: text('description'),

    // External reference (e.g. Paystack transfer reference for withdrawals)
    externalReference: text('external_reference'),

    createdAt: timestamp('created_at').defaultNow(),
});

export const emailVerificationTokens = pgTable('email_verification_tokens', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    used: boolean('used').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// DRIZZLE RELATIONS
// These don't create DB columns — they just tell Drizzle how to
// join tables when using db.query.users.findMany({ with: { wallet: true } })
// ─────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ one, many }) => ({
    wallet: one(wallets, { fields: [users.id], references: [wallets.userId] }),
    kycProfile: one(kycProfiles, { fields: [users.id], references: [kycProfiles.userId] }),
    envelopes: many(envelopes),
}));

export const walletsRelations = relations(wallets, ({ one, many }) => ({
    user: one(users, { fields: [wallets.userId], references: [users.id] }),
    transactions: many(transactions),
}));

export const kycProfilesRelations = relations(kycProfiles, ({ one }) => ({
    user: one(users, { fields: [kycProfiles.userId], references: [users.id] }),
}));

export const envelopesRelations = relations(envelopes, ({ one, many }) => ({
    user: one(users, { fields: [envelopes.userId], references: [users.id] }),
    transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    wallet: one(wallets, { fields: [transactions.walletId], references: [wallets.id] }),
    envelope: one(envelopes, { fields: [transactions.envelopeId], references: [envelopes.id] }),
}));
