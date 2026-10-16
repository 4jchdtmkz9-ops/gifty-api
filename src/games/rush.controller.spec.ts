import {
  floor2,
  generateCrashMultiplier,
  lowStakeCapFor,
  multiplierAt,
  payoutGramFor,
  payoutStarsFor,
  stakeStarsEquivalent,
} from './rush.controller.js';

describe('RUSH round math', () => {
  describe('generateCrashMultiplier', () => {
    it('always produces a playable multiplier within bounds', () => {
      for (let i = 0; i < 5_000; i += 1) {
        const crash = generateCrashMultiplier();
        expect(crash).toBeGreaterThanOrEqual(1);
        expect(crash).toBeLessThanOrEqual(500);
        expect(Number.isInteger(Math.round(crash * 100))).toBe(true);
      }
    });

    it("matches the owner's curve: ~40% of rounds pass 2x, 60% die below", () => {
      const samples = Array.from({ length: 60_000 }, () => generateCrashMultiplier());
      const shareAbove = (m: number) => samples.filter((value) => value > m).length / samples.length;
      // P(crash > m) = 0.4 * (2 / m)^1.5 for m >= 2 — a fixed 2x cash-out pays EV 0.8.
      expect(shareAbove(2)).toBeGreaterThan(0.36);
      expect(shareAbove(2)).toBeLessThan(0.44);
      // Steep tail: x10+ only ~3.6%, x100+ only ~0.1% of rounds.
      expect(shareAbove(5)).toBeGreaterThan(0.075);
      expect(shareAbove(5)).toBeLessThan(0.13);
      expect(shareAbove(10)).toBeGreaterThan(0.02);
      expect(shareAbove(10)).toBeLessThan(0.055);
      expect(shareAbove(100)).toBeGreaterThan(0.0004);
      expect(shareAbove(100)).toBeLessThan(0.003);
      // Below 2x the sub-2 branch dominates: most rounds die quickly.
      expect(shareAbove(1.5)).toBeLessThan(0.62);
      expect(shareAbove(1.5)).toBeGreaterThan(0.5);
    });
  });

  describe('lowStakeCapFor', () => {
    it('caps sub-10-Star stakes at 1.2 about 70% of the time', () => {
      let capped = 0;
      const samples = 20_000;
      for (let i = 0; i < samples; i += 1) {
        if (lowStakeCapFor(1) === 1.2) capped += 1;
      }
      const share = capped / samples;
      expect(share).toBeGreaterThan(0.67);
      expect(share).toBeLessThan(0.73);
    });

    it('never caps stakes of 10 Stars or more', () => {
      for (let i = 0; i < 2_000; i += 1) {
        expect(lowStakeCapFor(10)).toBeNull();
        expect(lowStakeCapFor(1_000)).toBeNull();
      }
    });

    it('converts GRAM stakes to Stars at the configured rate', () => {
      // Default rate: 1 Star = 0.01 GRAM
      expect(stakeStarsEquivalent('GRAM', 0, '0.09')).toBe(9);
      expect(stakeStarsEquivalent('GRAM', 0, '0.1')).toBe(10);
      expect(stakeStarsEquivalent('STARS', 7, '0')).toBe(7);
    });
  });

  describe('multiplierAt', () => {
    it('starts at 1.00 and roughly doubles every 8 seconds', () => {
      const start = new Date('2026-10-16T12:00:00Z');
      expect(multiplierAt(start, start)).toBeCloseTo(1, 5);
      expect(multiplierAt(start, new Date(start.getTime() + 8_000))).toBeCloseTo(2, 2);
      expect(multiplierAt(start, new Date(start.getTime() + 16_000))).toBeCloseTo(4, 1);
    });

    it('never goes backwards before the flight starts', () => {
      const start = new Date('2026-10-16T12:00:00Z');
      const before = new Date(start.getTime() - 5_000);
      expect(multiplierAt(start, before)).toBe(1);
    });

    it('reaches a x10 crash point in about 26.6 seconds', () => {
      const start = new Date('2026-10-16T12:00:00Z');
      const atCrash = new Date(start.getTime() + 26_600);
      expect(floor2(multiplierAt(start, atCrash))).toBeGreaterThanOrEqual(9.9);
    });
  });

  describe('payouts', () => {
    it('computes exact whole-Star payouts', () => {
      const x2 = 2_000n;
      expect(payoutStarsFor(1, x2)).toBe(2);
      expect(payoutStarsFor(7, x2)).toBe(14);
      // x1.75 of 8 stars: 8 * 1750 / 1000 = 14
      expect(payoutStarsFor(8, 1_750n)).toBe(14);
      // fractional results floor, never round up
      expect(payoutStarsFor(1, 1_234n)).toBe(1);
    });

    it('computes exact GRAM payouts without float drift', () => {
      // fromNano keeps one decimal place ("2.0") like the arena payouts; Prisma Decimal accepts it.
      expect(payoutGramFor('1', 2_000n)).toBe('2.0');
      expect(payoutGramFor('0.05', 1_100n)).toBe('0.055');
      // 0.1 * 1.333 floors at nano precision instead of 0.13330000000000002
      expect(payoutGramFor('0.1', 1_333n)).toBe('0.1333');
      expect(payoutGramFor('1000', 500n)).toBe('500.0');
    });

    it('keeps payout below stake when the multiplier floors to 1.00x', () => {
      // Cash-out at exactly 1.00x returns the stake itself, nothing more.
      expect(payoutStarsFor(5, 1_000n)).toBe(5);
      expect(payoutGramFor('2.5', 1_000n)).toBe('2.5');
    });
  });

  describe('floor2', () => {
    it('truncates toward zero at cents', () => {
      expect(floor2(1.999)).toBe(1.99);
      expect(floor2(2)).toBe(2);
      expect(floor2(2.001)).toBe(2);
    });
  });
});
