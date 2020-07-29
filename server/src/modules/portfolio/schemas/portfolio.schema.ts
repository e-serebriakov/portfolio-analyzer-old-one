import * as mongoose from 'mongoose';

import { PortfolioDocument } from '../types';

const PortfolioSchema = new mongoose.Schema<PortfolioDocument>({
  name: String,
  operations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operation',
  }],
});

export { PortfolioSchema };
