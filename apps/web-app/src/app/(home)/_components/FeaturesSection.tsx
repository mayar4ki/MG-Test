import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acme/ui/card';
import { featuresSection } from '@acme/white-label/web-app';

export const FeaturesSection = () => {
  return (
    <section id="features" className="border-t py-16 lg:py-24">
      <div className="container space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Capabilities</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{featuresSection.title}</h2>
          <p className="text-muted-foreground">
            Each building block is modular, audited, and ready for your stack—so you can assemble the right experience without waiting
            on bespoke builds.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuresSection.features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="h-full border-2 border-transparent bg-gradient-to-b from-background via-background/80 to-primary/5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
