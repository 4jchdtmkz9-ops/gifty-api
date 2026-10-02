ALTER TABLE "PvpRoom"
ADD COLUMN "arenaMode" TEXT NOT NULL DEFAULT 'CLASSIC';

CREATE INDEX "PvpRoom_isPublic_arenaMode_status_createdAt_idx"
ON "PvpRoom"("isPublic", "arenaMode", "status", "createdAt");
