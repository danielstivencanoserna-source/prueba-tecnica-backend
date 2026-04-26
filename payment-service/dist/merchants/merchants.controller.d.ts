import { MerchantsService } from './merchants.service';
export declare class MerchantsController {
    private readonly merchantsService;
    constructor(merchantsService: MerchantsService);
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
