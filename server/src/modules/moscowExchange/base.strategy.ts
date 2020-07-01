import axios from 'axios';
import { pipe, identity } from 'fp-ts/lib/function';

import { Price } from 'src/modules/quotes/dto/create-quote.dto';
import { fromUnixTime, getUnixTime, format, parseISO } from 'date-fns/fp';

export enum BoardIdEnum {
  Funds = 'TQTF',
  Bonds = 'TQOB'
}

export enum TypeEnum {
  Funds = 'shares',
  Bonds = 'bonds'
}

type UrlParams = {
  to: number,
  from: number,
  symbol: string,
  boardId: BoardIdEnum,
  type: TypeEnum,
};

type MoscowExchangeResponse = {
  history: {
    columns: string[],
    data: Array<string | number>[]
  }
};

export type QuoteRecord = {
  symbol: string;
  currency: string;
  timestamp: number;
  price: Price
}

export class MoscowExchangeBaseStrategy {
  static URL = 'http://iss.moex.com/iss/history/engines/stock/markets';

  static toFormat(timestamp: number): string {
    return pipe(
      timestamp,
      fromUnixTime,
      format('yyyy-MM-dd'),
    )
  }

  protected async getQuotesData(url: string): Promise<QuoteRecord[]> {
    let result: QuoteRecord[] = [];

    try { 
      const res = await axios.get<MoscowExchangeResponse>(url);

      result = this.processResponse(res?.data);
      
    } catch (e) {
      console.error('e', e);
    }

    return result;
  }

  protected processResponse(response: MoscowExchangeResponse): QuoteRecord[] {
    const data = response.history.data;
  
    const currency  = 'RUB';
  
    const records = data.map((quoteData, index) => {
      const timestamp = pipe(
        quoteData[1] as string,
        parseISO,
        getUnixTime,
      );
  
      return {
        symbol: quoteData[3] as string,
        currency,
        timestamp,
        price: {
          close: quoteData[8] as number,
          open: quoteData[13] as number,
          high: quoteData[7] as number,
          low: quoteData[6] as number,
        },
      };
    })
  
    return records;
  }

  protected buildUrl({ type, boardId, symbol, from, to }: UrlParams): string {
    const fromDate = MoscowExchangeBaseStrategy.toFormat(from);
    const toDate = MoscowExchangeBaseStrategy.toFormat(to);

    return `${MoscowExchangeBaseStrategy.URL}/${type}/boards/${boardId}/securities/${symbol}/candles.json?from=${fromDate}&till=${toDate}&interval=24&start=0`
  }
}

