import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SecuritiesController } from './controller';
import { SecuritiesService } from './service';
import { Security, SecuritySchema } from './schemas/security.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Security.name, schema: SecuritySchema }])],
  controllers: [SecuritiesController],
  providers: [SecuritiesService],
  exports: [SecuritiesService]
})
export class SecuritiesModule {}