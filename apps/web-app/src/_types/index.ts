import type { Ticker } from '~/data/mock-tickers';

export type LiveTicker = Ticker & { lastUpdated: number };

export type TickerChange = {
  delta: number;
  deltaPct: number;
};
