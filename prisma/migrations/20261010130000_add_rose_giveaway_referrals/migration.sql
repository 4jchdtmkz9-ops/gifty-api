ALTER TABLE "GiveawayEntry"
ADD COLUMN "referredByUserId" TEXT;

CREATE TABLE "GiveawayReferralLink" (
    "id" TEXT NOT NULL,
    "giveaway" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiveawayReferralLink_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GiveawayReferralLink_code_key" ON "GiveawayReferralLink"("code");
CREATE UNIQUE INDEX "GiveawayReferralLink_giveaway_userId_key" ON "GiveawayReferralLink"("giveaway", "userId");
CREATE INDEX "GiveawayReferralLink_giveaway_idx" ON "GiveawayReferralLink"("giveaway");
CREATE INDEX "GiveawayEntry_giveaway_referredByUserId_idx" ON "GiveawayEntry"("giveaway", "referredByUserId");

ALTER TABLE "GiveawayEntry"
ADD CONSTRAINT "GiveawayEntry_referredByUserId_fkey"
FOREIGN KEY ("referredByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "GiveawayReferralLink"
ADD CONSTRAINT "GiveawayReferralLink_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
