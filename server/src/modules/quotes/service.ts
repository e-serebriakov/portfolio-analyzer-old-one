import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Quote } from './schemas/quote.schema';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const createdSecurity = new this.quoteModel(createQuoteDto);
    return createdSecurity.save();
  }

  async findAll(options: FilterQuery<Quote>): Promise<Quote[]> {
    return this.quoteModel.find(options).exec();
  }

  async findLatestUniqQuotes(): Promise<Quote[]> {
    const groupedDocs = await this.quoteModel.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$symbol',
          doc: { $first: '$$ROOT' }
        }
      }
    ]);

    return groupedDocs.map(({ doc }) => doc);
  }
}