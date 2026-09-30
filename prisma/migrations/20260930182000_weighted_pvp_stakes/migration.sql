ALTER TABLE "PvpParticipant"
ADD COLUMN "stakeGram" DECIMAL(20,9) NOT NULL DEFAULT 0;

UPDATE "PvpParticipant" AS participant
SET "stakeGram" = room."stakeGram"
FROM "PvpRoom" AS room
WHERE participant."roomId" = room."id";

UPDATE "PvpRoom" AS room
SET "stakeGram" = totals.total
FROM (
  SELECT "roomId", SUM("stakeGram") AS total
  FROM "PvpParticipant"
  GROUP BY "roomId"
) AS totals
WHERE room."id" = totals."roomId"
  AND room."isPublic" = true;

-- Retire old demo queues that were separated by stake amount before the weighted single-square rules.
UPDATE "PvpRoom"
SET "status" = 'CANCELLED', "completedAt" = CURRENT_TIMESTAMP
WHERE "isPublic" = true AND "status" IN ('WAITING', 'COUNTDOWN');
