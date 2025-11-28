import { Badge } from '@acme/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acme/ui/card';
import type { LiveTicker, TickerChange } from '~/_types';
import { formatClockLabel, formatNumber } from '~/_utils';

export type TickerHeroCardProps = {
  selectedTicker: LiveTicker;
  selectedChange: TickerChange;
};

export const TickerHeroCard = ({ selectedTicker, selectedChange }: TickerHeroCardProps) => {
  return (
    <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-none">
      <CardHeader className="gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <CardDescription className="text-[11px] uppercase tracking-[0.3em] text-primary">Market Pulse</CardDescription>
            <CardTitle className="text-3xl font-semibold">Live tickers with immediate context</CardTitle>
            <p className="text-muted-foreground max-w-3xl">
              Watch prices drift in real time, preview the charting experience, and switch symbols without waiting on the production
              feed.
            </p>
          </div>
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-200 border-emerald-500/20">
            <span className="relative mr-2 flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live mock data
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="rounded-xl border bg-background/60">
            <CardContent >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Selected</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-lg font-semibold">{selectedTicker.symbol}</p>
                  <p className="text-sm text-muted-foreground">{selectedTicker.name}</p>
                </div>
                <div className={`text-sm font-semibold ${selectedChange.delta >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {selectedChange.delta >= 0 ? '+' : ''}
                  {selectedChange.delta} ({selectedChange.deltaPct}%)
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border bg-background/60">
            <CardContent >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Last refresh</p>
              <p className="text-lg font-semibold">{formatClockLabel(selectedTicker.lastUpdated)}</p>
              <p className="text-sm text-muted-foreground">Auto-updates every ~3s</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border bg-background/60">
            <CardContent >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Volume spotlight</p>
              <p className="text-lg font-semibold">{formatNumber(selectedTicker.volume)} traded</p>
              <p className="text-sm text-muted-foreground">Based on mocked turnover</p>
            </CardContent>
          </Card>
        </div>
      </CardHeader>
    </Card>
  );
};
