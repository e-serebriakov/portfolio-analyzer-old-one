import { Body, Controller, Get, Post } from '@nestjs/common';

import { SecuritiesService } from './service';
import { CreateSecurityDto } from './dto/create-security.dto';
import { Security } from './schemas/security.schema';

@Controller('securities')
export class SecuritiesController {
  constructor(private readonly securitiesService: SecuritiesService) {}

  @Post()
  async create(@Body() createCatDto: CreateSecurityDto) {
    await this.securitiesService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Security[]> {
    return this.securitiesService.findAll();
  }
}