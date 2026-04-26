import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MerchantsService {
  constructor(private prisma: PrismaService) {}

  create(body: any) {
    return this.prisma.merchant.create({
      data: body,
    });
  }

  findAll() {
    return this.prisma.merchant.findMany();
  }
}