ALTER TABLE "User" ADD COLUMN "telegramAccessHash" TEXT;
ALTER TABLE "PvpParticipant" ADD COLUMN "cashStakeGram" DECIMAL(20,9) NOT NULL DEFAULT 0;
UPDATE "PvpParticipant" SET "cashStakeGram" = "stakeGram";
ALTER TABLE "Gift" ADD COLUMN "imageUrl" TEXT,
  ADD COLUMN "telegramOwnedGiftId" TEXT,
  ADD COLUMN "telegramGiftNumber" TEXT,
  ADD COLUMN "telegramGiftData" JSONB;
CREATE UNIQUE INDEX "Gift_telegramOwnedGiftId_key" ON "Gift"("telegramOwnedGiftId");
CREATE TABLE "GiftDepositIntent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "giftId" TEXT,
  "confirmedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GiftDepositIntent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GiftDepositIntent_code_key" ON "GiftDepositIntent"("code");
CREATE UNIQUE INDEX "GiftDepositIntent_giftId_key" ON "GiftDepositIntent"("giftId");
CREATE INDEX "GiftDepositIntent_userId_status_createdAt_idx" ON "GiftDepositIntent"("userId", "status", "createdAt");
CREATE TABLE "GiftWithdrawalRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "giftId" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "confirmedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GiftWithdrawalRequest_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "GiftWithdrawalRequest_code_key" ON "GiftWithdrawalRequest"("code");
CREATE INDEX "GiftWithdrawalRequest_userId_status_createdAt_idx" ON "GiftWithdrawalRequest"("userId", "status", "createdAt");
ALTER TABLE "GiftDepositIntent" ADD CONSTRAINT "GiftDepositIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GiftDepositIntent" ADD CONSTRAINT "GiftDepositIntent_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GiftWithdrawalRequest" ADD CONSTRAINT "GiftWithdrawalRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GiftWithdrawalRequest" ADD CONSTRAINT "GiftWithdrawalRequest_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "PvpParticipantGift" (
  "id" TEXT NOT NULL,
  "participantId" TEXT NOT NULL,
  "giftId" TEXT NOT NULL,
  "valueGram" DECIMAL(20,9) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PvpParticipantGift_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "PvpParticipantGift_giftId_key" ON "PvpParticipantGift"("giftId");
CREATE INDEX "PvpParticipantGift_participantId_createdAt_idx" ON "PvpParticipantGift"("participantId", "createdAt");
ALTER TABLE "PvpParticipantGift" ADD CONSTRAINT "PvpParticipantGift_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "PvpParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpParticipantGift" ADD CONSTRAINT "PvpParticipantGift_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "TelegramRelayState" (
  "id" TEXT NOT NULL DEFAULT 'orbit-relay',
  "initialSyncAt" TIMESTAMP(3) NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TelegramRelayState_pkey" PRIMARY KEY ("id")
);
