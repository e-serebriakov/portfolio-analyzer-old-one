import { Injectable } from '@nestjs/common';

import { QuoteRecord } from './base.strategy';
import { StrategyInterface, Params } from '../quotes/provider/context';

@Injectable()
export class MoscowExchangeContext {
  async fetch(fetchStrategy: StrategyInterface, params: Params): Promise<QuoteRecord[]> {
    return fetchStrategy.fetch(params);
  }
}