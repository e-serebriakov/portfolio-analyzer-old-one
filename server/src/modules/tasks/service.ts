import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getUnixTime, fromUnixTime, isSameDay, isWeekend, addDays, format } from 'date-fns/fp';
import { pipe } from 'fp-ts/lib/function';

import { QuoteRecord } from 'src/modules/yahoo/provider';
import { QuotesService } from '../quotes/service';
import { SecuritiesService } from '../securities/service';
import { Security, SecurityTypeEnum } from '../securities/schemas/security.schema';
import { Quote } from '../quotes/schemas/quote.schema';
import { QuotesProvider } from '../quotes/provider/provider';

@Injectable()
export class TasksService {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly securitiesService: SecuritiesService,
    private readonly quotesProvider: QuotesProvider,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 45');
  // }

  // EVERY_DAY_AT_9AM, EVERY_DAY_AT_7PM, EVERY_MINUTE

  @Cron(CronExpression.EVERY_MINUTE)
  async handleInterval() {
    this.logger.debug('Called every minute');

    const [securities, quotes]: [Security[], Quote[]] = await Promise.all([
      this.securitiesService.findAll(),
      this.quotesService.findLatestUniqQuotes(),
    ]);
    const symbolQuotesMap = quotes.reduce((acc, { symbol, timestamp }) => (
      acc.set(symbol, timestamp)
    ), new Map<string, number>());

    const quotesToLoad = securities
      .map(({ createdAt, symbol, type }) => {
        const timestamp = symbolQuotesMap.has(symbol) ? symbolQuotesMap.get(symbol) : createdAt;

        return {
          type,
          symbol,
          timestamp: timestamp!,
        }
      })
      .filter(({ timestamp }) =>  {
        const now = Date.now();
        const isSameDate = isSameDay(now, fromUnixTime(timestamp));

        return !(isSameDate || isWeekend(now));
      })
      .map(({ timestamp, ...rest }) => {
        const fromTimestamp = pipe(
          timestamp,
          fromUnixTime,
          addDays(1),
          getUnixTime,
        );

        return ({
          ...rest,
          fromTimestamp,
        })
      });

    const fetchedQuotes = await this.fetchQuotes(quotesToLoad);

    console.log('fetchedQuotes', fetchedQuotes.map(({ timestamp, symbol }) => {
      return {
        symbol,
        date: pipe(
          timestamp,
          fromUnixTime,
          format('yyyy-MM-dd'),
        )
      }
    }));

    // const createdRecords = await Promise.all(
    //   fetchedQuotes.map((quotesItem) => (
    //     this.quotesService.create(quotesItem)
    //   ))
    // )

    // console.log('createdRecords', createdRecords)
  }

  private async fetchQuotes(quotesToLoad: { symbol: string, fromTimestamp: number, type: SecurityTypeEnum }[]): Promise<QuoteRecord[]> {
    const loadedQuotes = await Promise.all(quotesToLoad.map(({ symbol, fromTimestamp, type }) => {
      return this.quotesProvider.fetchQuotes({
        type,
        symbol,
        from: fromTimestamp,
        to: getUnixTime(new Date()),
      });
    }));

    return loadedQuotes.reduce<QuoteRecord[]>((acc, quotes) => [...acc, ...quotes], []);;
  }
}
