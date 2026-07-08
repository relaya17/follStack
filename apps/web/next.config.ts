import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@follstack/ui', '@follstack/shared'],
  typedRoutes: true,
  turbopack: {
    root,
  },
  outputFileTracingRoot: root,
}

export default nextConfig
