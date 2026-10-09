import { randomInt } from 'node:crypto';

export const ORBIT_NFT_COLLECTION = 'ORBIT_NFT';

export const ORBIT_NFT_PALETTE: Record<string, string> = {
  'Celtic Blue': '#2877bb', Cappuccino: '#b28a6b', 'Pine Green': '#27634a', Raspberry: '#d82f68',
  Persimmon: '#e8783f', 'Mystic Pearl': '#b05670', Platinum: '#d5d9df', Rosewood: '#70404e',
  'Pure Gold': '#e5b83e', Black: '#17191d', 'Onyx Black': '#202329', 'Midnight Blue': '#172c55',
};

export function orbitNftResaleValue(backdropName: string, packId: string) {
  if (backdropName === 'Black') return '1';
  if (backdropName === 'Onyx Black') return '0.5';
  if (backdropName === 'Midnight Blue') return packId === 'orbit-dog' ? '0.4' : '0.3';
  return '0.15';
}

export function chooseOrbitNftBackdrop() {
  const random = randomInt(10_000);
  const rareName = random < 200 ? 'Black' : random < 500 ? 'Onyx Black' : random < 1_000 ? 'Midnight Blue' : null;
  const defaults = Object.keys(ORBIT_NFT_PALETTE).filter((name) => !['Black', 'Onyx Black', 'Midnight Blue'].includes(name));
  const name = rareName ?? defaults[randomInt(defaults.length)];
  return [name, ORBIT_NFT_PALETTE[name]] as const;
}
