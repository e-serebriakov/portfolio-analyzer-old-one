import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { TasksModule } from './modules/tasks/module';
import { SecuritiesModule } from './modules/securities/module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }),
    TasksModule,
    SecuritiesModule,
  ],
})
export class AppModule {}
