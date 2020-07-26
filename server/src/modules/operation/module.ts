import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/module';
import { OperationController } from './controller';
import { OperationService } from './service';
import { operationProviders } from './providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OperationController],
  providers: [
    OperationService,
    ...operationProviders,
  ],
})
export class OperationModule {}