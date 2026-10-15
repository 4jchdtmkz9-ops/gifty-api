-- CreateTable
CREATE TABLE "StarDeposit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "starAmount" INTEGER NOT NULL,
    "gramAmount" DECIMAL(20,9) NOT NULL,
    "payload" TEXT NOT NULL,
    "chargeId" TEXT,
    "providerChargeId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StarDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarDeposit_payload_key" ON "StarDeposit"("payload");

-- CreateIndex
CREATE UNIQUE INDEX "StarDeposit_chargeId_key" ON "StarDeposit"("chargeId");

-- CreateIndex
CREATE INDEX "StarDeposit_status_expiresAt_idx" ON "StarDeposit"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "StarDeposit_userId_createdAt_idx" ON "StarDeposit"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "StarDeposit" ADD CONSTRAINT "StarDeposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
