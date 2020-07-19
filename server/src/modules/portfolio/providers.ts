import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from 'src/constants';
import { PortfolioSchema } from './schemas/portfolio.schema';
import { PORTFOLIO_MODEL } from './constants';

export const portfolioProviders = [
  {
    provide: PORTFOLIO_MODEL,
    useFactory: (connection: Connection) => connection.model('Portfolio', PortfolioSchema),
    inject: [DATABASE_CONNECTION],
  },
];
