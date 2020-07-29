import { Document } from 'mongoose';

export type Portfolio = {
  name: string;
};

export type PortfolioDocument = Document & Portfolio;
