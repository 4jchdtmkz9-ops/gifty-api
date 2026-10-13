// Shared identifiers for the 24-hour FREE case collectibles.
export const FREE_CASE_COLLECTION = 'FREE CASE';
export const FREE_CASE_NFT_ID = 'candycane-nft';
export const FREE_CASE_BEAR_ID = 'bear';
export const FREE_CASE_COLLECTIBLE_IDS = [FREE_CASE_NFT_ID, FREE_CASE_BEAR_ID] as const;
export const FREE_CASE_COLLECTIBLES = {
  [FREE_CASE_NFT_ID]: { name: 'Candy Cane', emoji: '🍬' },
  [FREE_CASE_BEAR_ID]: { name: 'Telegram Bear', emoji: '🧸' },
} as const;
export function isFreeCaseCollectible(id: string): id is (typeof FREE_CASE_COLLECTIBLE_IDS)[number] {
  return (FREE_CASE_COLLECTIBLE_IDS as readonly string[]).includes(id);
}
