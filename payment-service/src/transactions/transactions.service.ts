import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

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

  async findAll(query: QueryTransactionsDto) {
    const { page, limit, status, type, merchantId } = query;

    const where: any = {};

    if (status) where.status = status;
    if (type) where.type = type;
    if (merchantId) where.merchantId = merchantId;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const transaction = await this.findOne(id);

    const current = transaction.status;
    const next = dto.status;

    const allowedTransitions: Record<
      TransactionStatus,
      TransactionStatus[]
    > = {
      pending: ['approved', 'rejected'],
      approved: ['completed'],
      rejected: [],
      failed: [],
      completed: [],
    };

    const allowed = allowedTransitions[current];

    if (!allowed.includes(next)) {
      throw new BadRequestException(
        `Invalid transition: ${current} -> ${next}`,
      );
    }

    return this.prisma.transaction.update({
      where: { id },
      data: { status: next },
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