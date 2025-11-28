import {
  BarChart3,
  Clock,
  Globe,
  LineChart,
  Shield,
  Zap,
} from "lucide-react";

export const badge = "📈 Trade with Confidence";
export const heading = "Your Gateway to Global Markets";
export const description =
  "Execute trades with lightning-fast speed, competitive spreads, and institutional-grade tools. Access stocks, forex, commodities, and crypto—all in one platform.";
export const buttons = {
  primary: {
    text: "Start Trading Now",
    url: "/dashboard",
  },
};

export type FeaturesSection = {
  title: string;
  features: {
    icon: any;
    title: string;
    description: string;
  }[];
};
export const featuresSection: FeaturesSection = {
  title: "Built for Serious Traders",
  features: [
    {
      icon: Zap,
      title: "Ultra-Fast Execution",
      description:
        "Execute orders in milliseconds with our cutting-edge infrastructure and direct market access.",
    },
    {
      icon: LineChart,
      title: "Advanced Charting",
      description:
        "Analyze markets with 100+ technical indicators, drawing tools, and real-time price alerts.",
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description:
        "Trade 10,000+ instruments across stocks, forex, indices, commodities, and cryptocurrencies.",
    },
    {
      icon: Shield,
      title: "Secure & Regulated",
      description:
        "Your funds are protected with segregated accounts and top-tier regulatory oversight.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description:
        "Make informed decisions with live market data, news feeds, and AI-powered insights.",
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description:
        "Never miss an opportunity. Trade around the clock on crypto and global forex markets.",
    },
  ],
};

export const compliantWithSection = {
  title: "Trusted by Traders Worldwide",
  subtitle: "Regulated and compliant with leading financial authorities",
  logos: [
    {
      name: "SEC",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      name: "FCA",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "FINRA",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-6 w-auto",
    },
    {
      name: "CySEC",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "ASIC",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-6 w-auto",
    },
  ],
};

export const statsSection = {
  heading: "Trading Performance That Speaks",
  description: "Industry-leading metrics trusted by professional traders",
  link: {
    text: "View our full transparency report",
    url: "https://www.shadcnblocks.com",
  },
  stats: [
    {
      id: "stat-1",
      value: "0.1ms",
      label: "average order execution speed",
    },
    {
      id: "stat-2",
      value: "$4.2B+",
      label: "daily trading volume processed",
    },
    {
      id: "stat-3",
      value: "10,000+",
      label: "tradable instruments worldwide",
    },
    {
      id: "stat-4",
      value: "2M+",
      label: "active traders across 150 countries",
    },
  ],
};
