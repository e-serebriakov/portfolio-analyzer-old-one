import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { PORTFOLIO_MODEL } from './constants';
import { Portfolio } from './types';

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

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioModel.find();
  }

  async findOne(id: string): Promise<Portfolio> {
    return this.portfolioModel.findById(id);
  }
}
