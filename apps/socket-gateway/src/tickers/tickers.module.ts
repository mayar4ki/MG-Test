import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TickersGateway } from './tickers.gateway';
import { TickersService } from './tickers.service';

@Module({
  imports: [AuthModule],
  providers: [TickersGateway, TickersService],
})
export class TickersModule {}
