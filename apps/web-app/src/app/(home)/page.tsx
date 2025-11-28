'use client';

import { CTASection } from './_components/CTASection';
import { FeaturesSection } from './_components/FeaturesSection';
import { HeroSection } from './_components/HeroSection';
import { StatsSection } from './_components/StatsSection';

export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
