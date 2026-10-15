-- AlterTable
ALTER TABLE "User" ADD COLUMN "balanceStars" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PvpRoom" ADD COLUMN "stakeStars" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PvpParticipant" ADD COLUMN "cashStakeStars" INTEGER NOT NULL DEFAULT 0;
