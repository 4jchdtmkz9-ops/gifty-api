CREATE TABLE "PvpRoom" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "stakeGram" DECIMAL(20,9) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "PvpRoom_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PvpParticipant" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PvpParticipant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PvpInvitation" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PvpInvitation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PvpRoom_code_key" ON "PvpRoom"("code");
CREATE UNIQUE INDEX "PvpParticipant_roomId_userId_key" ON "PvpParticipant"("roomId", "userId");
CREATE INDEX "PvpParticipant_userId_joinedAt_idx" ON "PvpParticipant"("userId", "joinedAt");
CREATE UNIQUE INDEX "PvpInvitation_roomId_recipientId_key" ON "PvpInvitation"("roomId", "recipientId");
CREATE INDEX "PvpInvitation_recipientId_status_createdAt_idx" ON "PvpInvitation"("recipientId", "status", "createdAt");

ALTER TABLE "PvpRoom" ADD CONSTRAINT "PvpRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpRoom" ADD CONSTRAINT "PvpRoom_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PvpParticipant" ADD CONSTRAINT "PvpParticipant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "PvpRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpParticipant" ADD CONSTRAINT "PvpParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpInvitation" ADD CONSTRAINT "PvpInvitation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "PvpRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpInvitation" ADD CONSTRAINT "PvpInvitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PvpInvitation" ADD CONSTRAINT "PvpInvitation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
