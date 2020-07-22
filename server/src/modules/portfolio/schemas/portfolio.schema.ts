import * as mongoose from 'mongoose';

export const PortfolioSchema = new mongoose.Schema({
  name: String,
  operations: [{
    name: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    }
  }],
});
