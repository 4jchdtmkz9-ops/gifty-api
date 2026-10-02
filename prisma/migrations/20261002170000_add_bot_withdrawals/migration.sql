CREATE TABLE "BotWithdrawal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amountTon" DECIMAL(20,9) NOT NULL,
    "destination" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "walletSeqno" INTEGER,
    "externalHash" TEXT,
    "txHash" TEXT,
    "failureReason" TEXT,
    "submittedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotWithdrawal_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "BotWithdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "BotWithdrawal_comment_key" ON "BotWithdrawal"("comment");
CREATE UNIQUE INDEX "BotWithdrawal_externalHash_key" ON "BotWithdrawal"("externalHash");
CREATE UNIQUE INDEX "BotWithdrawal_txHash_key" ON "BotWithdrawal"("txHash");
CREATE INDEX "BotWithdrawal_status_createdAt_idx" ON "BotWithdrawal"("status", "createdAt");
CREATE INDEX "BotWithdrawal_userId_createdAt_idx" ON "BotWithdrawal"("userId", "createdAt");
CREATE UNIQUE INDEX "BotWithdrawal_one_active_per_user_key" ON "BotWithdrawal"("userId") WHERE "status" IN ('PENDING', 'PROCESSING', 'BROADCASTING', 'SUBMITTED');
