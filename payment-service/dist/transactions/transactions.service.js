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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { id: dto.merchantId },
        });
        if (!merchant) {
            throw new common_1.BadRequestException('Merchant not found');
        }
        const reference = await this.generateUniqueReference();
        return this.prisma.transaction.create({
            data: {
                merchantId: dto.merchantId,
                amount: dto.amount,
                currency: dto.currency,
                type: dto.type,
                metadata: dto.metadata,
                reference,
            },
        });
    }
    async generateUniqueReference() {
        for (let i = 0; i < 5; i++) {
            const ref = this.buildReference();
            const exists = await this.prisma.transaction.findUnique({
                where: { reference: ref },
            });
            if (!exists)
                return ref;
        }
        throw new Error('Could not generate unique reference');
    }
    buildReference() {
        const now = new Date();
        const date = now.getFullYear().toString() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let random = '';
        for (let i = 0; i < 6; i++) {
            random += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `TXN-${date}-${random}`;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map