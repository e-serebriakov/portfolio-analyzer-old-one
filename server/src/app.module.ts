import { Module } from '@nestjs/common';

import { PortfolioModule } from './modules/portfolio/module';
import { OperationModule } from './modules/operation/module';

@Module({
  imports: [PortfolioModule, OperationModule],
})
export class AppModule {}
