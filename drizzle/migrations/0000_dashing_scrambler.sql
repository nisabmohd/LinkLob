CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"password" varchar,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
