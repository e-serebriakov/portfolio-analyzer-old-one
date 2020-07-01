import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { pipe, identity } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option'

import { Price } from 'src/modules/quotes/dto/create-quote.dto';

export enum IntervalEnum {
  ONE_MINUTE = '1m',
  ONE_DAY = '1d',
  ONE_WEEK = '1wk',
  ONE_MONTH = '1mo',
  THREE_MONTHS = '3mo'
}

type Params = {
  symbol: string,
  from: number,
  to: number,
  interval: IntervalEnum,
};

type YahooResponse = {
  chart: {
    result: {
      meta: {
        currency: string,
        symbol: string,
      },
      timestamp: number[],
      indicators: {
        quote: {
          high: number[],
          low: number[],
          close: number[],
          open: number[],
          volume: number[],
        }[],
        adjclose: {
          adjclose: number[]
        }[]
      }
    }[],
    error: object | null,
  }
};

export type QuoteRecord = {
  symbol: string;
  currency: string;
  timestamp: number;
  price: Price
}

@Injectable()
export class YahooProvider {
  static URL = 'https://query1.finance.yahoo.com/v8/finance';

  async fetchStockData({ symbol, from, to, interval }: Params): Promise<QuoteRecord[]> {
    let result: QuoteRecord[] = [];

    try { 
      const res = await axios.get<YahooResponse>(`${YahooProvider.URL}/chart/${symbol}?symbol=${symbol}&period1=${from}&period2=${to}&interval=${interval}`);

      if (res?.data.chart.error) {
        throw new Error(JSON.stringify(res.data.chart.error));
      }

      result = this.processResponse(res.data);
      
    } catch (e) {
      console.error('e', e);
    }

    return result;
  }

  private processResponse(response: YahooResponse): QuoteRecord[] {
    const result = response.chart.result[0];
    const symbol = result.meta.symbol;
    const currency  = result.meta.currency;
    const quotes = result.indicators.quote[0];
    const timestamp = pipe(
      O.fromNullable(result.timestamp),
      O.fold(
        () => [],
        identity
      ),
    );

    const records = timestamp.map((time, index) => ({
      symbol,
      currency,
      timestamp: time,
      price: {
        close: quotes.close[index],
        open: quotes.open[index],
        high: quotes.high[index],
        low: quotes.low[index],
      }
    }))

    return records;
  }
}