import { OperationType, OperationCurrency } from "../types";

export class AddOperationDto {
  readonly target: string;
  readonly type: OperationType;
  readonly currency: OperationCurrency;
  readonly quantity: number;
  readonly price: number;
  readonly fee?: number;
}