import { Injectable } from '@nestjs/common';

import { QuoteRecord } from 'src/modules/yahoo/provider';
import { StrategyInterface, Params } from './context';
import { MoscowExchangeProvider, SupportedSecurityType } from 'src/modules/moscowExchange/provider';

@Injectable()
export class MoscowExchangeStrategy implements StrategyInterface {
  constructor(
    private readonly moscowExchangeProvider: MoscowExchangeProvider,
  ) {}

  async fetch({ symbol, from, to, type }: Params): Promise<QuoteRecord[]> {
    return this.moscowExchangeProvider.fetch({
      to,
      from,
      symbol,
      type: type as SupportedSecurityType,
    });
  }
}