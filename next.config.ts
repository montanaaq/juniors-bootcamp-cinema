import type { NextConfig } from 'next'

import withRspack from 'next-rspack'
import { PHASE_PRODUCTION_SERVER, type PHASE_TYPE } from 'next/constants'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://juniorsbootcamp.ru/api/**')]
  },
  reactCompiler: true,
  reactStrictMode: false
}

export default (phase: PHASE_TYPE): NextConfig =>
  phase === PHASE_PRODUCTION_SERVER ? nextConfig : withRspack(nextConfig)
