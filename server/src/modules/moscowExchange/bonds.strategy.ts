import { Injectable } from '@nestjs/common';

import { MoscowExchangeBaseStrategy, BoardIdEnum, TypeEnum, QuoteRecord } from './base.strategy';
import { StrategyInterface, Params } from '../quotes/provider/context';

@Injectable()
export class MoscowExchangeBondsStrategy extends MoscowExchangeBaseStrategy implements StrategyInterface {
  async fetch({ symbol, from, to }: Params): Promise<QuoteRecord[]> {
    const url = this.buildUrl({
      to,
      from,
      symbol,
      boardId: BoardIdEnum.Bonds,
      type: TypeEnum.Bonds
    });

    return this.getQuotesData(url);
  }
}