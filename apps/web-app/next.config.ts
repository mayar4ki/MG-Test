import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Needed so Next output traces workspace packages from the repo root
  outputFileTracingRoot: path.join(__dirname, '../..'),
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@acme/ui', '@acme/white-label'],
};

export default nextConfig;
