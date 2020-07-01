import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getUnixTime } from 'date-fns';

export enum SecurityTypeEnum {
  Stock = 'stock',
  Fund = 'fund',
  Bond = 'bond',
  Currency = 'currency'
}

@Schema()
export class Security extends Document {
  @Prop({ required: true, unique: true })
  symbol!: string;

  @Prop({ required: true })
  currency!: string;

  @Prop({ required: true })
  type!: SecurityTypeEnum

  @Prop({ required: true })
  createdAt!: number;
}

export const SecuritySchema = SchemaFactory.createForClass(Security);