CREATE TABLE "GiveawayReferralVisit" (
    "giveaway" TEXT NOT NULL,
    "inviteeUserId" TEXT NOT NULL,
    "referrerUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiveawayReferralVisit_pkey" PRIMARY KEY ("giveaway", "inviteeUserId"),
    CONSTRAINT "GiveawayReferralVisit_inviteeUserId_fkey" FOREIGN KEY ("inviteeUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GiveawayReferralVisit_referrerUserId_fkey" FOREIGN KEY ("referrerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "GiveawayReferralVisit_giveaway_referrerUserId_idx"
ON "GiveawayReferralVisit"("giveaway", "referrerUserId");
