import { Injectable } from '@nestjs/common';

import { SecurityTypeEnum } from 'src/modules/securities/schemas/security.schema';
import { QuoteRecord } from 'src/modules/yahoo/provider';
import { QuotesProviderContext, StrategyInterface, Params } from './context';
import { YahooStrategy } from './yahoo.srategy';
import { MoscowExchangeStrategy } from './moscowExchange.strategy';

@Injectable()
export class QuotesProvider {
  securityTypeStrategyMap: { [key in SecurityTypeEnum ]: StrategyInterface }

  constructor(
    private readonly quotesContext: QuotesProviderContext,
    private readonly yahooStrategy: YahooStrategy,
    private readonly moscowExchangeStrategy: MoscowExchangeStrategy,
  ) {
    this.securityTypeStrategyMap = {
      [SecurityTypeEnum.Stock]: this.yahooStrategy,
      [SecurityTypeEnum.Bond]: this.moscowExchangeStrategy,
      [SecurityTypeEnum.Fund]: this.moscowExchangeStrategy,
    }
  }

  async fetchQuotes(options: Params): Promise<QuoteRecord[]> {
    const strategy = this.getStrategyBySecurityType(options.type)

    return this.quotesContext.fetchQuotes(strategy, options);
  }

  private getStrategyBySecurityType(type: SecurityTypeEnum): StrategyInterface {
    if (!this.securityTypeStrategyMap.hasOwnProperty(type)) {
      throw Error(`Unsupported security type ${type}`);
    }

    return this.securityTypeStrategyMap[type];
  }
}