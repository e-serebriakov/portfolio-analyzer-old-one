import { Document } from 'mongoose';

export type Portfolio = {
  name: string;
}

<<<<<<< HEAD
export enum OperationCurrency {
  Rub = 'RUB',
  Usd = 'UDS',
}

export type Operation = {
  target: string;
  type: OperationType;
  currency: OperationCurrency;
  quantity: number;
  price: number;
  fee: number;
  date: Date;
  totalPrice: number;
};

export interface Portfolio extends Document {
  readonly name: string;
  readonly operations: Operation[];
}
=======
export type PortfolioDocument = Document & Portfolio;
>>>>>>> 2317037... [WIP]
