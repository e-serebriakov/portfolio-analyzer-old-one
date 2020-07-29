import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';

import { PortfolioController } from './controller';
import { PortfolioService } from './service';
import { portfolioProviders } from './providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    ...portfolioProviders,
  ],
})
export class PortfolioModule {}
