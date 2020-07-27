import { Module } from '@nestjs/common';

import { PortfolioModule } from './modules/portfolio/module';

@Module({
  imports: [PortfolioModule],
})
export class AppModule {}
