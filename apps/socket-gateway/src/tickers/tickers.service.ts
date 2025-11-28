import { Injectable } from '@nestjs/common';
import { mockTickers, type Ticker } from './mock-tickers';

export type LiveTicker = Ticker & { lastUpdated: number };

const formatClockLabel = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

@Injectable()
export class TickersService {
  private tickers: LiveTicker[] = mockTickers.map((ticker) => ({
    ...ticker,
    history: ticker.history.map((point) => ({ ...point })),
    lastUpdated: Date.now(),
  }));

  getSnapshot() {
    return this.tickers;
  }

  updateTickers(): LiveTicker[] {
    this.tickers = this.tickers.map((ticker) => {
      const baseVolatility = 0.012 + Math.random() * 0.01; // 1.2% - 2.2% swings
      const directionBias = Math.random() - 0.5;
      const movement = directionBias * ticker.price * baseVolatility;

      const shockProbability = 0.1;
      const shock =
        Math.random() < shockProbability ? (Math.random() - 0.5) * ticker.price * 0.035 /* up to ~3.5% */ : 0;

      const nextPrice = Number(Math.max(ticker.week52Range[0] * 0.85, ticker.price + movement + shock).toFixed(2));
      const history = [...ticker.history.slice(-23), { time: formatClockLabel(), price: nextPrice }];
      const dayHigh = Math.max(ticker.dayRange[1], nextPrice);
      const dayLow = Math.min(ticker.dayRange[0], nextPrice);

      const volumeDrift = Math.round(ticker.volume * (1 + (Math.random() - 0.5) * 0.04));

      return {
        ...ticker,
        price: nextPrice,
        dayRange: [dayLow, dayHigh],
        history,
        volume: Math.max(volumeDrift, 0),
        lastUpdated: Date.now(),
      };
    });

    return this.tickers;
  }
}
