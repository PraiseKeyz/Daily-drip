CREATE TYPE "public"."period" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('deposit', 'withdrawal', 'drip_release');--> statement-breakpoint
CREATE TABLE "envelopes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"total_amount" numeric(12, 2) NOT NULL,
	"daily_release_amount" numeric(12, 2) NOT NULL,
	"period" "period" NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_drip_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"type" "transaction_type" NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"available_balance" numeric(12, 2) DEFAULT '0' NOT NULL,
	"locked_balance" numeric(12, 2) DEFAULT '0' NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "envelopes" ADD CONSTRAINT "envelopes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;