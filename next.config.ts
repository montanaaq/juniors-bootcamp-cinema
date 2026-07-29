import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://juniorsbootcamp.ru/api/**')]
  },
  reactCompiler: true,
  reactStrictMode: false,
  turbopack: {
    root: process.cwd()
  }
}

export default nextConfig
