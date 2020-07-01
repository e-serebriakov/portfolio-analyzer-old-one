import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getUnixTime } from 'date-fns';

import { Price } from '../dto/create-quote.dto';

@Schema()
export class Quote extends Document {
  @Prop({ required: true })
  symbol!: string;

  @Prop({ required: true })
  currency!: string;

  @Prop({ required: true })
  timestamp!: number;

  @Prop(raw({
    low: { type: Number },
    high: { type: Number },
    open: { type: Number },
    close: { type: Number },
  }))
  price!: Price;
  
  @Prop({ default: getUnixTime(new Date()) })
  createdAt!: number;
}

export const QuoteSchema = SchemaFactory
  .createForClass(Quote)
  .index({ symbol: 1, timestamp: 1 }, { unique: true })
