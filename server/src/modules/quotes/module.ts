import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoscowExchangeModule } from '../moscowExchange/module';
import { YahooModule } from '../yahoo/module';
import { QuotesProvider } from './provider/provider';
import { QuotesProviderContext } from './provider/context';
import { MoscowExchangeStrategy } from './provider/moscowExchange.strategy';
import { Quote, QuoteSchema } from './schemas/quote.schema';
import { YahooStrategy } from './provider/yahoo.srategy';
import { QuotesService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    MoscowExchangeModule,
    YahooModule,
  ],
  providers: [QuotesService, QuotesProvider, QuotesProviderContext, MoscowExchangeStrategy, YahooStrategy],
  exports: [QuotesService, QuotesProvider],
})
export class QuotesModule {}