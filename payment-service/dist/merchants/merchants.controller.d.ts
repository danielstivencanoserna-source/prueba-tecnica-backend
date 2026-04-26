import { MerchantsService } from './merchants.service';
export declare class MerchantsController {
    private readonly merchantsService;
    constructor(merchantsService: MerchantsService);
    create(body: any): import(".prisma/client").Prisma.Prisma__MerchantClient<{
        status: import(".prisma/client").$Enums.MerchantStatus;
        id: string;
        email: string;
        apiKey: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        status: import(".prisma/client").$Enums.MerchantStatus;
        id: string;
        email: string;
        apiKey: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
