-- Low stakes (<10 Stars-equivalent) fly a capped x1.20 round on 70% of bets.
ALTER TABLE "RushBet" ADD COLUMN "capMultiplier" DECIMAL(10,2);
