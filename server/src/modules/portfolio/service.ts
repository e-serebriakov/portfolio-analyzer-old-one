import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { PORTFOLIO_MODEL } from './constants';
import { Portfolio, PortfolioDocument } from './types';
import { Fields, Filters } from './controller';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(PORTFOLIO_MODEL)
    private portfolioModel: Model<PortfolioDocument>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    // eslint-disable-next-line new-cap
    const createdPortfolio = new this.portfolioModel({ ...createPortfolioDto, operations: [] });

    return createdPortfolio.save();
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto): Promise<Portfolio | null> {
    return this.portfolioModel.findByIdAndUpdate(id, updatePortfolioDto, { new: true });
  }
  
  async delete(id: string): Promise<Portfolio | null> {
    return this.portfolioModel.findByIdAndDelete(id);
  }

  async findAll({
    filter,
    fields,
  }: { filter: Filters, fields: Fields }): Promise<Portfolio[]> {
    const selectOptions = fields.length > 0 ? fields.reduce((acc, field) => ({
      ...acc,
      [field]: 1,
    }), {}) : {};

    return this.portfolioModel.find(filter).select(selectOptions);
  }

  async findOne(id: string): Promise<Portfolio | null> {
    return this.portfolioModel.findById(id);
  }
}
