import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SettlementsModule } from './settlements/settlements.module';

@Module({
  imports: [
    PrismaModule,
    MerchantsModule,
    TransactionsModule,
    SettlementsModule,
  ],
})
export class AppModule {}
