import * as mongoose from 'mongoose';

import { OperationType, OperationCurrency, OperationDocument } from '../types';

const OperationSchema = new mongoose.Schema<OperationDocument>({
  target: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(OperationType),
    required: [true, 'Operation type required'],
  },
  currency: {
    type: String,
    enum: Object.values(OperationCurrency),
    required: [true, 'Operation currency required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Operation quantity required'],
  },
  price: {
    type: Number,
    required: [true, 'Operation price required'],
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
  fee: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
}, {
  toJSON: {
    virtuals: true,
  },
});

OperationSchema.virtual('totalPrice')
  .get(function (this: OperationDocument): number {
    return (this.price + this.quantity) + this.fee;
  });

export { OperationSchema };
