'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { computeChange, formatClockLabel } from '~/_utils';
import { TickerDetailCard } from '~/app/_components/ticker/TickerDetailCard';
import { TickerHeroCard } from '~/app/_components/ticker/TickerHeroCard';
import { TickerListCard } from '~/app/_components/ticker/TickerListCard';

import type { LiveTicker } from '~/_types';
import { mockTickers } from '~/data/mock-tickers';

export default function Page() {
  const [tickers, setTickers] = useState<LiveTicker[]>(() =>
    mockTickers.map((ticker) => ({
      ...ticker,
      history: ticker.history.map((point) => ({ ...point })),
      lastUpdated: Date.now(),
    }))
  );
  const [selectedSymbol, setSelectedSymbol] = useState(() => mockTickers[0]?.symbol ?? '');
  const chartGradientId = useId();

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((previousTickers) =>
        previousTickers.map((ticker) => {
          const movement = (Math.random() - 0.45) * ticker.price * 0.0035;
          const nextPrice = Number(Math.max(ticker.week52Range[0] * 0.9, ticker.price + movement).toFixed(2));
          const history = [...ticker.history.slice(-23), { time: formatClockLabel(), price: nextPrice }];
          const dayHigh = Math.max(ticker.dayRange[1], nextPrice);
          const dayLow = Math.min(ticker.dayRange[0], nextPrice);

          return {
            ...ticker,
            price: nextPrice,
            dayRange: [dayLow, dayHigh],
            history,
            lastUpdated: Date.now(),
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const selectedTicker = useMemo(
    () => tickers.find((ticker) => ticker.symbol === selectedSymbol) ?? tickers[0],
    [selectedSymbol, tickers]
  );

  const selectedChange = selectedTicker ? computeChange(selectedTicker.price, selectedTicker.previousClose) : undefined;

  if (!selectedTicker || !selectedChange) return null;

  return (
    <div className="p-4 md:p-6 flex-1">
      <div className="space-y-6">
        <TickerHeroCard selectedTicker={selectedTicker} selectedChange={selectedChange} />
        <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
          <TickerListCard
            tickers={tickers}
            selectedTicker={selectedTicker}
            onSelect={setSelectedSymbol}
            chartGradientId={chartGradientId}
          />
          <TickerDetailCard selectedTicker={selectedTicker} selectedChange={selectedChange} chartGradientId={chartGradientId} />
        </div>
      </div>
    </div>
  );
}
