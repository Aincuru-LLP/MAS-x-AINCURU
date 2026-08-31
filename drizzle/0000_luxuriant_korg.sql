CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "quoteRequests" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" varchar(32) NOT NULL,
	"name" varchar(160) NOT NULL,
	"phone" varchar(80) NOT NULL,
	"email" varchar(320) NOT NULL,
	"company" varchar(240),
	"notes" text,
	"itemsJson" json NOT NULL,
	"attachmentsJson" json,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quoteRequests_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
