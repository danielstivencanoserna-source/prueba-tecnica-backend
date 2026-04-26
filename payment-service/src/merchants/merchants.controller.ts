import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(
    private readonly merchantsService: MerchantsService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.merchantsService.create(body);
  }

  @Get()
  findAll() {
    return this.merchantsService.findAll();
  }
}