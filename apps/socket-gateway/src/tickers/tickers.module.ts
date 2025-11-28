import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../config/env-validation.schema';
import { TickersGateway } from './tickers.gateway';
import { TickersService } from './tickers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
    }),
  ],
  providers: [TickersGateway, TickersService],
})
export class TickersModule {}
