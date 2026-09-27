import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TonService {
  async getBalance(address: string) {
    if (!address) {
      throw new BadRequestException('Wallet address is required');
    }

    const url = new URL(
      'https://toncenter.com/api/v3/accountStates',
    );

    url.searchParams.set('address', address);
    url.searchParams.set('include_boc', 'false');

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch TON balance');
    }

    const data = await response.json();

    const account = data.accounts?.[0];

    if (!account) {
      return {
        address,
        balance: '0',
        balanceTon: '0',
      };
    }

    const balanceNano = BigInt(account.balance ?? '0');

    return {
      address,
      balance: balanceNano.toString(),
      balanceTon: (Number(balanceNano) / 1_000_000_000).toString(),
    };
  }
}