ALTER TABLE "User"
ADD COLUMN "balanceGram" DECIMAL(20,9) NOT NULL DEFAULT 0;

CREATE TABLE "BotDeposit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestedTon" DECIMAL(20,9) NOT NULL,
    "receivedTon" DECIMAL(20,9),
    "depositAddress" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "txHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotDeposit_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "BotDeposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "BotDeposit_comment_key" ON "BotDeposit"("comment");
CREATE UNIQUE INDEX "BotDeposit_txHash_key" ON "BotDeposit"("txHash");
CREATE INDEX "BotDeposit_status_expiresAt_idx" ON "BotDeposit"("status", "expiresAt");
CREATE INDEX "BotDeposit_userId_createdAt_idx" ON "BotDeposit"("userId", "createdAt");
