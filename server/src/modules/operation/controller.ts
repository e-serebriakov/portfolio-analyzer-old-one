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

import { CreateOperationDto, UpdateOperationDto } from './dto';
import { OperationService } from './service';
import { Operation } from './types';

export type Fields = Array<keyof Operation>;
export type Filters = Record<string, unknown>;

@Controller('Operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Put()
  async create(@Body() createPortfolioDto: CreateOperationDto): Promise<Operation> {
    return this.operationService.create(createPortfolioDto);
  }

  @Get()
  async findAll(
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe) fields: Fields,
      @Query('filter') filter: Filters = {},
  ): Promise<Operation[]> {
    return this.operationService.findAll({
      filter,
      fields,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Operation | null> {
    return this.operationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
      @Body() updateOperationDto: UpdateOperationDto,
  ): Promise<Operation | null> {
    return this.operationService.update(id, updateOperationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Operation | null> {
    return this.operationService.delete(id);
  }
}
