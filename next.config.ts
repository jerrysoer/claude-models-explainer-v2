import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/claude-models-explainer-v2' : '',
  images: { unoptimized: true },
};

export default nextConfig;
