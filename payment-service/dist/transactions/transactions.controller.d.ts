import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
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
}
