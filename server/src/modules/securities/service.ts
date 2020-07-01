import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Security } from './schemas/security.schema';
import { CreateSecurityDto } from './dto/create-security.dto';

@Injectable()
export class SecuritiesService {
  constructor(@InjectModel(Security.name) private securityModel: Model<Security>) {}

  async create(createSecurityDto: CreateSecurityDto): Promise<Security> {
    const createdSecurity = new this.securityModel(createSecurityDto);
    return createdSecurity.save();
  }

  async findAll(): Promise<Security[]> {
    return this.securityModel.find().exec();
  }
}