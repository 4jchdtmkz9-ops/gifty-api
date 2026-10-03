CREATE TABLE "GameTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amountGram" DECIMAL(20,9) NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameTransaction_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "PvpRoom" ADD COLUMN "settledAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "GameTransaction_reference_key" ON "GameTransaction"("reference");
CREATE INDEX "GameTransaction_userId_createdAt_idx" ON "GameTransaction"("userId", "createdAt");
CREATE INDEX "GameTransaction_game_type_createdAt_idx" ON "GameTransaction"("game", "type", "createdAt");
ALTER TABLE "GameTransaction" ADD CONSTRAINT "GameTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
