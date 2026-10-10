ALTER TABLE "GiveawayEntry"
ADD COLUMN "reviewStatus" TEXT NOT NULL DEFAULT 'APPROVED';

CREATE INDEX "GiveawayEntry_giveaway_reviewStatus_idx"
ON "GiveawayEntry"("giveaway", "reviewStatus");
