import {
  Get,
  Put,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  Controller,
  ParseArrayPipe,
  DefaultValuePipe,
} from '@nestjs/common';

import { CreatePortfolioDto, AddOperationDto, UpdatePortfolioDto } from './dto';
import { PortfolioService } from './service';
import { Portfolio } from './types';

export type Fields = 'id' | 'name' | 'operations';

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
  async findAll(
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe) fields: Fields[],
    @Query('filter') filter: object = {}
  ): Promise<Portfolio[]> {
    return this.portfolioService.findAll({
      filter,
      fields,
    });
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
