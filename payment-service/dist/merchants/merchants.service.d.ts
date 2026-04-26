import { PrismaService } from '../prisma/prisma.service';
export declare class MerchantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(body: any): import(".prisma/client").Prisma.Prisma__MerchantClient<{
        id: string;
        email: string;
        apiKey: string;
        name: string;
        status: import(".prisma/client").$Enums.MerchantStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        apiKey: string;
        name: string;
        status: import(".prisma/client").$Enums.MerchantStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
