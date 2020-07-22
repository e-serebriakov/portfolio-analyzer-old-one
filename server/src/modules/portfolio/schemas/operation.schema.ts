import * as mongoose from 'mongoose';

import { OperationType, OperationCurrency } from '../types';

const OperationSchema = new mongoose.Schema({
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
  },
  price: {
    type: Number,
  },
  fee: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  }
}, {
  toJSON: {
    virtuals: true
  }
});

OperationSchema.virtual('totalPrice')
  .get(function() {
    return (this.price + this.quantity) + this.fee;
  })

export { OperationSchema };
