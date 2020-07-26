import { OperationType, OperationCurrency } from '../types';

export class CreateOperationDto {
  readonly target!: string;
  readonly type!: OperationType;
  readonly currency!: OperationCurrency;
  readonly quantity!: number;
  readonly price!: number;
  readonly portfolioId!: string;
  readonly fee?: number;
}