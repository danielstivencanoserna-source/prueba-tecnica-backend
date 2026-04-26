import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettlementsService {
  constructor(private prisma: PrismaService) {}

  async generate(merchantId: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const transactions =
      await this.prisma.transaction.findMany({
        where: {
          merchantId,
          status: 'approved',
        },
      });

    if (!transactions.length) {
      throw new BadRequestException(
        'No approved transactions found',
      );
    }

    const totalAmount = transactions.reduce(
      (sum, tx) => sum + Number(tx.amount),
      0,
    );

    const now = new Date();

    const settlement =
      await this.prisma.settlement.create({
        data: {
          merchantId,
          totalAmount,
          transactionCount: transactions.length,
          status: 'pending',
          periodStart: transactions[0].createdAt,
          periodEnd:
            transactions[
              transactions.length - 1
            ].createdAt,

          settlementTransactions: {
            create: transactions.map((tx) => ({
              transactionId: tx.id,
            })),
          },
        },
        include: {
          settlementTransactions: true,
        },
      });

    return settlement;
  }

  async findOne(id: string) {
    const settlement =
      await this.prisma.settlement.findUnique({
        where: { id },
        include: {
          settlementTransactions: {
            include: {
              transaction: true,
            },
          },
        },
      });

    if (!settlement) {
      throw new NotFoundException(
        'Settlement not found',
      );
    }

    return settlement;
  }
}