DROP INDEX IF EXISTS "PvpParticipantGift_giftId_key";
CREATE INDEX IF NOT EXISTS "PvpParticipantGift_giftId_idx" ON "PvpParticipantGift"("giftId");
