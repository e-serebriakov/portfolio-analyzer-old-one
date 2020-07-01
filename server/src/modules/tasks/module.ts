import { Module } from '@nestjs/common';

import { YahooModule } from 'src/modules/yahoo/module';
import { QuotesModule } from '../quotes/module';
import { TasksService } from './service';
import { SecuritiesModule } from '../securities/module';
import { MoscowExchangeModule } from 'src/modules/moscowExchange/module';

@Module({
  imports: [YahooModule, QuotesModule, SecuritiesModule, MoscowExchangeModule],
  providers: [TasksService],
})
export class TasksModule {}