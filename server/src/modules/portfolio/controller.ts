import {
  Body, Controller, Get, Param, Patch, Put, Delete,
} from '@nestjs/common';

import { CreatePortfolioDto, AddOperationDto, UpdatePortfolioDto } from './dto';
import { PortfolioService } from './service';
import { Portfolio } from './types';

@Controller('Portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Put()
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Put(':id/operations')
  async addOperation(
    @Param('id') id: string,  
    @Body() addOperationDto: AddOperationDto,
  ) {
    return this.portfolioService.addOperation(id, addOperationDto);
  }

  @Get()
  async findAll(): Promise<Portfolio[]> {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Portfolio> {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
      @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Portfolio> {
    return this.portfolioService.delete(id);
  }
}
