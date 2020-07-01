import { Injectable } from '@nestjs/common';

import { YahooProvider, IntervalEnum, QuoteRecord } from 'src/modules/yahoo/provider';
import { StrategyInterface, Params } from './context';

@Injectable()
export class YahooStrategy implements StrategyInterface {
  constructor(
    private readonly yahooProvider: YahooProvider,
  ) {}

  async fetch({ symbol, from, to }: Params): Promise<QuoteRecord[]> {
    return this.yahooProvider.fetchStockData({
      to,
      from,
      symbol,
      interval: IntervalEnum.ONE_DAY,
    });
  }
}