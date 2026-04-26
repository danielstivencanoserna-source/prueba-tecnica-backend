import { Currency, TransactionType } from '@prisma/client';
export declare class CreateTransactionDto {
    merchantId: string;
    amount: number;
    currency: Currency;
    type: TransactionType;
    metadata?: Record<string, any>;
}
