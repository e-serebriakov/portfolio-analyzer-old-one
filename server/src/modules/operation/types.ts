import { Document } from 'mongoose';
import { Portfolio } from '../portfolio/types';

export enum OperationType {
  CashDeposit = 'CASH_DEPOSIT',
  CashWithdrawal = 'CASH_WITHDRAWAL',
  SecurityBuying = 'SECURITY_BUYING',
  SecuritySelling = 'SECURITY_SELLING',
}

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
  portfolio?: Portfolio;
}

export type OperationDocument = Document & Operation;