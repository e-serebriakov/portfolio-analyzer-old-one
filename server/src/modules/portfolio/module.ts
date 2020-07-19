import { Module } from '@nestjs/common';

import { PortfolioController } from './controller';
import { PortfolioService } from './service';
import { portfolioProviders } from './providers';
import { DatabaseModule } from 'src/database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    ...portfolioProviders,
  ],
})
export class PortfolioModule {}