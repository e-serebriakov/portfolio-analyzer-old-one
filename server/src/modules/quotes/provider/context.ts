import { Injectable } from '@nestjs/common';

import { QuoteRecord } from 'src/modules/moscowExchange/base.strategy';
import { SecurityTypeEnum } from 'src/modules/securities/schemas/security.schema';

export type Params = {
  symbol: string,
  from: number,
  to: number,
  type: SecurityTypeEnum,
};

export interface StrategyInterface {
  fetch({ symbol, from, to }: Params): Promise<QuoteRecord[]>;
}

@Injectable()
export class QuotesProviderContext {
  async fetchQuotes(fetchStrategy: StrategyInterface, params: Params): Promise<QuoteRecord[]> {
    return fetchStrategy.fetch(params);
  }
}