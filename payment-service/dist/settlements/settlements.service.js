"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SettlementsService = class SettlementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(merchantId) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { id: merchantId },
        });
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const transactions = await this.prisma.transaction.findMany({
            where: {
                merchantId,
                status: 'approved',
            },
        });
        if (!transactions.length) {
            throw new common_1.BadRequestException('No approved transactions found');
        }
        const totalAmount = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
        const now = new Date();
        const settlement = await this.prisma.settlement.create({
            data: {
                merchantId,
                totalAmount,
                transactionCount: transactions.length,
                status: 'pending',
                periodStart: transactions[0].createdAt,
                periodEnd: transactions[transactions.length - 1].createdAt,
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
    async findOne(id) {
        const settlement = await this.prisma.settlement.findUnique({
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
            throw new common_1.NotFoundException('Settlement not found');
        }
        return settlement;
    }
};
exports.SettlementsService = SettlementsService;
exports.SettlementsService = SettlementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettlementsService);
//# sourceMappingURL=settlements.service.js.map