import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  turbopack: {
    root: process.cwd()
  }
}

export default nextConfig
