-- CreateTable
CREATE TABLE "RushRound" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "phase" TEXT NOT NULL DEFAULT 'BETTING',
    "crashMultiplier" DECIMAL(10,2) NOT NULL,
    "bettingEndsAt" TIMESTAMP(3) NOT NULL,
    "flyingStartedAt" TIMESTAMP(3),
    "crashedAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RushRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RushBet" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'STARS',
    "stakeStars" INTEGER NOT NULL DEFAULT 0,
    "stakeGram" DECIMAL(20,9) NOT NULL DEFAULT 0,
    "autoCashoutAt" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "cashoutMultiplier" DECIMAL(10,2),
    "payoutStars" INTEGER NOT NULL DEFAULT 0,
    "payoutGram" DECIMAL(20,9) NOT NULL DEFAULT 0,
    "cashedOutAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RushBet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RushRound_number_key" ON "RushRound"("number");

-- CreateIndex
CREATE INDEX "RushRound_phase_bettingEndsAt_idx" ON "RushRound"("phase", "bettingEndsAt");

-- CreateIndex
CREATE UNIQUE INDEX "RushBet_roundId_userId_key" ON "RushBet"("roundId", "userId");

-- CreateIndex
CREATE INDEX "RushBet_roundId_idx" ON "RushBet"("roundId");

-- CreateIndex
CREATE INDEX "RushBet_userId_createdAt_idx" ON "RushBet"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "RushBet" ADD CONSTRAINT "RushBet_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "RushRound"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RushBet" ADD CONSTRAINT "RushBet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
