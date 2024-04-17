DROP INDEX IF EXISTS "pasteIndex";--> statement-breakpoint
ALTER TABLE "pastes" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "pastes" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "pastes" DROP COLUMN IF EXISTS "paste";