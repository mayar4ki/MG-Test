import { Button } from '@acme/ui/button';
import { buttons, siteName, tagline } from '@acme/white-label/web-app';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CTASection = () => {
  return (
    <section id="cta" className="py-16 lg:py-20">
      <div className="container">
        <div className="overflow-hidden rounded-3xl border bg-gradient-to-r from-primary/10 via-background to-emerald-100/40 p-10 shadow-lg shadow-primary/10 dark:from-primary/15 dark:to-emerald-400/5 md:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.4fr,auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{siteName}</p>
              <h3 className="text-3xl font-semibold sm:text-4xl">Ready to build with confidence?</h3>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {tagline}. Drop into the dashboard, wire up a sandbox, and ship regulated experiences without slowing down.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Launch dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-background/80">
                <Link href={buttons.primary.url}>
                  {buttons.primary.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
