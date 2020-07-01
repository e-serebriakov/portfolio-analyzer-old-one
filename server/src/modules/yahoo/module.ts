import { Module } from '@nestjs/common';

import { YahooProvider } from './provider';

@Module({
  providers: [YahooProvider],
  exports: [YahooProvider],
})
export class YahooModule {}