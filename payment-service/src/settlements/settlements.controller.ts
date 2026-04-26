import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { SettlementsService } from './settlements.service';

@Controller('settlements')
export class SettlementsController {
  constructor(
    private readonly settlementsService: SettlementsService,
  ) {}

  @Post('generate/:merchantId')
  generate(
    @Param('merchantId') merchantId: string,
  ) {
    return this.settlementsService.generate(
      merchantId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settlementsService.findOne(id);
  }
}