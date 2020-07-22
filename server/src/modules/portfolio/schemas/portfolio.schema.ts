import * as mongoose from 'mongoose';

import { OperationSchema } from './operation.schema';

const PortfolioSchema = new mongoose.Schema({
  name: String,
  operations: [OperationSchema],
}, {
  toJSON: {
    virtuals: true
  }
});

export { PortfolioSchema };
