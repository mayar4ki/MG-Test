import { Button } from '@acme/ui/button';
import { badge, buttons, description, heading } from '@acme/white-label/web-app';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-background to-background py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </span>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          <Button asChild size="lg" className="gap-2">
            <Link href={buttons.primary.url}>
              {buttons.primary.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
