import { Module } from '@nestjs/common';

import { MoscowExchangeProvider } from './provider';
import { MoscowExchangeContext } from './context';
import { MoscowExchangeBondsStrategy } from './bonds.strategy';
import { MoscowExchangeFundsStrategy } from './funds.strategy';

@Module({
  providers: [MoscowExchangeProvider, MoscowExchangeContext, MoscowExchangeBondsStrategy, MoscowExchangeFundsStrategy],
  exports: [MoscowExchangeProvider],
})
export class MoscowExchangeModule {}