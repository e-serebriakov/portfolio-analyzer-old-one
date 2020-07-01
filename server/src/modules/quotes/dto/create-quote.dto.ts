export type Price = {
  low: number;
  high: number;
  open: number;
  close: number;
}

export class CreateQuoteDto {
  readonly symbol!: string;
  readonly currency!: string;
  readonly timestamp!: number;
  readonly price!: Price;
}
