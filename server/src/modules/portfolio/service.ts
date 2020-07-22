import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { PORTFOLIO_MODEL } from './constants';
import { Portfolio } from './types';
import { Fields } from './controller';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(PORTFOLIO_MODEL)
    private portfolioModel: Model<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    // eslint-disable-next-line new-cap
    const createdPortfolio = new this.portfolioModel({ ...createPortfolioDto, operations: [] });

    return createdPortfolio.save();
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto): Promise<Portfolio> {
    return this.portfolioModel.findByIdAndUpdate(id, updatePortfolioDto, { new: true });
  }

  async delete(id: string): Promise<Portfolio> {
    return this.portfolioModel.findByIdAndDelete(id);
  }

  async findAll({
    filter,
    fields,
  }: { filter: object, fields: Fields[] }): Promise<Portfolio[]> {
    console.log('filter', filter);
    const selectOptions = fields.reduce((acc, field) => ({
      ...acc,
      [field]: 1
    }), {});

    return this.portfolioModel.find().select(selectOptions);
  }

  async findOne(id: string): Promise<Portfolio> {
    return this.portfolioModel.findById(id);
  }
}
