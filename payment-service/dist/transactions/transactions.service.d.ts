import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTransactionDto): Promise<{
        merchantId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: import(".prisma/client").$Enums.Currency;
        type: import(".prisma/client").$Enums.TransactionType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        reference: string;
    }>;
    private generateUniqueReference;
    private buildReference;
}
