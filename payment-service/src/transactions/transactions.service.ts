import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: dto.merchantId },
    });

    if (!merchant) {
      throw new BadRequestException('Merchant not found');
    }

    const reference = await this.generateUniqueReference();

    return this.prisma.transaction.create({
      data: {
        merchantId: dto.merchantId,
        amount: dto.amount,
        currency: dto.currency,
        type: dto.type,
        metadata: dto.metadata,
        reference,
      },
    });
  }

  private async generateUniqueReference(): Promise<string> {
    for (let i = 0; i < 5; i++) {
      const ref = this.buildReference();

      const exists = await this.prisma.transaction.findUnique({
        where: { reference: ref },
      });

      if (!exists) return ref;
    }

    throw new Error('Could not generate unique reference');
  }

  private buildReference(): string {
    const now = new Date();

    const date =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let random = '';

    for (let i = 0; i < 6; i++) {
      random += chars.charAt(
        Math.floor(Math.random() * chars.length),
      );
    }

    return `TXN-${date}-${random}`;
  }
}
