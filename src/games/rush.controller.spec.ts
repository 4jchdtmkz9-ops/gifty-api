import {
  floor2,
  generateCrashMultiplier,
  multiplierAt,
  payoutGramFor,
  payoutStarsFor,
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

    it('respects the 3% house edge: P(crash > m) ≈ 0.97 / m', () => {
      const samples = Array.from({ length: 60_000 }, () => generateCrashMultiplier());
      const shareAbove = (m: number) => samples.filter((value) => value > m).length / samples.length;
      // A player cashing out at xm wins with probability 0.97/m → EV = 0.97.
      expect(shareAbove(2)).toBeGreaterThan(0.44);
      expect(shareAbove(2)).toBeLessThan(0.53);
      expect(shareAbove(10)).toBeGreaterThan(0.07);
      expect(shareAbove(10)).toBeLessThan(0.13);
      expect(shareAbove(100)).toBeGreaterThan(0.005);
      expect(shareAbove(100)).toBeLessThan(0.015);
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
