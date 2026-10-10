CREATE TABLE "GiveawayEntry" (
    "id" TEXT NOT NULL,
    "giveaway" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiveawayEntry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GiveawayEntry_giveaway_userId_key" ON "GiveawayEntry"("giveaway", "userId");
CREATE UNIQUE INDEX "GiveawayEntry_one_winner_per_giveaway_key" ON "GiveawayEntry"("giveaway") WHERE "winner" = true;
CREATE INDEX "GiveawayEntry_giveaway_createdAt_idx" ON "GiveawayEntry"("giveaway", "createdAt");

ALTER TABLE "GiveawayEntry" ADD CONSTRAINT "GiveawayEntry_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
