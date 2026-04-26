import { SettlementsService } from './settlements.service';
export declare class SettlementsController {
    private readonly settlementsService;
    constructor(settlementsService: SettlementsService);
    generate(merchantId: string): Promise<{
        settlementTransactions: {
            transactionId: string;
            settlementId: string;
        }[];
    } & {
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        transactionCount: number;
        status: import(".prisma/client").$Enums.SettlementStatus;
        periodStart: Date;
        periodEnd: Date;
        createdAt: Date;
        merchantId: string;
    }>;
    findOne(id: string): Promise<{
        settlementTransactions: ({
            transaction: {
                id: string;
                status: import(".prisma/client").$Enums.TransactionStatus;
                createdAt: Date;
                merchantId: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                currency: import(".prisma/client").$Enums.Currency;
                type: import(".prisma/client").$Enums.TransactionType;
                reference: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                updatedAt: Date;
            };
        } & {
            transactionId: string;
            settlementId: string;
        })[];
    } & {
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        transactionCount: number;
        status: import(".prisma/client").$Enums.SettlementStatus;
        periodStart: Date;
        periodEnd: Date;
        createdAt: Date;
        merchantId: string;
    }>;
}
