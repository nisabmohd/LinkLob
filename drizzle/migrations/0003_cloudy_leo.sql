ALTER TABLE "pastes" ADD COLUMN "paste" varchar NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pasteIndex" ON "pastes" ("paste");