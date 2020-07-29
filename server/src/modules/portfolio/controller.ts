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

import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { PortfolioService } from './service';
import { Portfolio } from './types';

export type Fields = Array<keyof Portfolio>;
export type Filters = Record<string, unknown>;

@Controller('Portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Put()
  async create(@Body() createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  async findAll(
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe) fields: Fields,
      @Query('filter') filter: Filters = {},
  ): Promise<Portfolio[]> {
    return this.portfolioService.findAll({
      filter,
      fields,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Portfolio | null> {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
      @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio | null> {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Portfolio| null> {
    return this.portfolioService.delete(id);
  }
}
