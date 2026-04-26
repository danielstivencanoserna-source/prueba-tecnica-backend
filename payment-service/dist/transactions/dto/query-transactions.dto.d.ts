import { TransactionStatus, TransactionType } from '@prisma/client';
export declare class QueryTransactionsDto {
    status?: TransactionStatus;
    type?: TransactionType;
    merchantId?: string;
    page: number;
    limit: number;
}
