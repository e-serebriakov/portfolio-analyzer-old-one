import { Injectable } from '@nestjs/common';

import { SecurityTypeEnum } from 'src/modules/securities/schemas/security.schema';
import { QuoteRecord } from './base.strategy';
import { MoscowExchangeFundsStrategy } from './funds.strategy';
import { MoscowExchangeBondsStrategy } from './bonds.strategy';
import { MoscowExchangeContext } from './context';
import { Params, StrategyInterface } from '../quotes/provider/context';

export type SupportedSecurityType = SecurityTypeEnum.Bond | SecurityTypeEnum.Fund;

type FetchOptions = Params & { type: SupportedSecurityType }


@Injectable()
export class MoscowExchangeProvider {
  securityTypeStrategyMap: { [key in SupportedSecurityType ]: StrategyInterface }

  constructor(
    private readonly moscowExchange: MoscowExchangeContext,
    private readonly moscowExchangeFundStrategy: MoscowExchangeFundsStrategy,
    private readonly moscowExchangeBondStrategy: MoscowExchangeBondsStrategy,
  ) {
    this.securityTypeStrategyMap = {
      [SecurityTypeEnum.Bond]: this.moscowExchangeBondStrategy,
      [SecurityTypeEnum.Fund]: this.moscowExchangeFundStrategy,
    }
  }

  async fetch(options: FetchOptions): Promise<QuoteRecord[]> {
    const strategy = this.getStrategyBySecurityType(options.type)

    return this.moscowExchange.fetch(strategy, options);
  }

  private getStrategyBySecurityType(type: SupportedSecurityType): StrategyInterface {
    if (!this.securityTypeStrategyMap.hasOwnProperty(type)) {
      throw Error(`Unsupported security type ${type}`);
    }

    return this.securityTypeStrategyMap[type];
  }
}