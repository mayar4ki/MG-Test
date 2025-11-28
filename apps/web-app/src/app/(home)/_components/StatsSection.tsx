import { Button } from '@acme/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acme/ui/card';
import { statsSection } from '@acme/white-label/web-app';
import { Activity, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const StatsSection = () => {
  return (
    <section id="stats" className="border-t py-16 lg:py-24">
      <div className="container space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Proof points</span>
            </div>
            <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">{statsSection.heading}</h3>
            <p className="max-w-2xl text-muted-foreground">{statsSection.description}</p>
          </div>
          <Button asChild variant="ghost" className="w-full justify-between gap-2 text-primary md:w-auto">
            <Link href={statsSection.link.url}>
              {statsSection.link.text}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsSection.stats.map((stat) => (
            <Card key={stat.id} className="border-2 border-transparent bg-gradient-to-b from-background via-background/70 to-primary/5">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-3xl font-semibold">{stat.value}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{stat.label}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1 w-full rounded-full bg-primary/10">
                  <div className="h-1 rounded-full bg-primary" style={{ width: '72%' }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
