import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import {
  CreateOperationDto,
  UpdateOperationDto,
} from './dto';
import { OPERATION_MODEL } from './constants';
import { Operation, OperationDocument } from './types';
import { Fields, Filters } from './controller';

@Injectable()
export class OperationService {
  constructor(
    @Inject(OPERATION_MODEL)
    private operationModel: Model<OperationDocument>,
  ) {}

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const { portfolioId, ...restFields } = createOperationDto;

    // eslint-disable-next-line new-cap
    const createdOperation = new this.operationModel({
      ...restFields,
      portfolio: Types.ObjectId(portfolioId),
    });
    const saved = await createdOperation.save();

    return saved.populate('portfolio').execPopulate();
  }

  async update(id: string, updateOperationDto: UpdateOperationDto): Promise<Operation | null> {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto, { new: true });
  }

  async delete(id: string): Promise<Operation | null> {
    return this.operationModel.findByIdAndDelete(id);
  }

  async findAll({
    filter,
    fields,
  }: { filter: Filters, fields: Fields }): Promise<Operation[]> {
    const selectOptions = fields.length > 0 ? fields.reduce((acc, field) => ({
      ...acc,
      [field]: 1,
    }), {}) : {};

    return this.operationModel
      .find(filter)
      .populate('portfolio')
      .select(selectOptions);
  }

  async findOne(id: string): Promise<Operation | null> {
    return this.operationModel.findById(id).populate('portfolio');
  }
}
