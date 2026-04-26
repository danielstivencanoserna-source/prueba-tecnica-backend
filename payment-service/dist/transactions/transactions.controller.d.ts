import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(dto: CreateTransactionDto): Promise<{
        id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: import(".prisma/client").$Enums.Currency;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        reference: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        merchantId: string;
    }>;
    findAll(query: QueryTransactionsDto): Promise<{
        data: {
            id: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            currency: import(".prisma/client").$Enums.Currency;
            type: import(".prisma/client").$Enums.TransactionType;
            status: import(".prisma/client").$Enums.TransactionStatus;
            reference: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            merchantId: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: import(".prisma/client").$Enums.Currency;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        reference: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        merchantId: string;
    }>;
}
