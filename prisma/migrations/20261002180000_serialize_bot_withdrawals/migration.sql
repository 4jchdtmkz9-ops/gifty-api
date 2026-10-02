-- One TON wallet has one seqno stream; never allow two workers to broadcast concurrently.
CREATE UNIQUE INDEX "BotWithdrawal_single_broadcast_lock_key"
ON "BotWithdrawal" ((true))
WHERE "status" IN ('PROCESSING', 'BROADCASTING');
