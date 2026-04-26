import { Currency, TransactionType } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  merchantId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(Currency)
  currency: Currency;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
