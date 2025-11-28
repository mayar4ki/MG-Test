export type TickerHistoryPoint = {
  time: string;
  price: number;
};

export type Ticker = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  previousClose: number;
  volume: number;
  dayRange: [number, number];
  week52Range: [number, number];
  history: TickerHistoryPoint[];
};

export type LiveTicker = Ticker & { lastUpdated: number };

export type TickerChange = {
  delta: number;
  deltaPct: number;
};
