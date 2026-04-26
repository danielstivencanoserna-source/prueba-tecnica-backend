import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MerchantsModule } from './merchants/merchants.module';

@Module({
  imports: [
    PrismaModule,
    TransactionsModule,
    MerchantsModule,
  ],
})
export class AppModule {}
