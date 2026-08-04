const isDev = process.env.NODE_ENV !== 'production'

// Content Security Policy.
//
// script-src and style-src both carry 'unsafe-inline', and that is not an
// oversight. Every component on this site is styled with React's style={{}},
// which emits inline style attributes, and the GA, Crisp and Clarity loaders in
// Layout.js are inline <Script> blocks. Removing it needs either per-request
// nonces — which would force dynamic rendering and give up SSG on 42 static
// pages — or content hashes, which silently kill analytics the moment someone
// edits a loader. So the XSS protection here is partial.
//
// What it does buy, and what the previous header set did not: nothing can pull
// a script from an origin not listed below, object/embed is dead, <base> can't
// be hijacked, and forms can't post anywhere but this origin — which is the
// difference between an injected tag exfiltrating enquiry data and it failing.
// frame-ancestors backs up the existing X-Frame-Options for modern browsers.
const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is the Next dev-server bundler only; it is never sent in prod.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://client.crisp.chat https://www.clarity.ms https://*.clarity.ms`,
  "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.clarity.ms https://client.crisp.chat https://image.crisp.chat https://storage.crisp.chat",
  "font-src 'self' data: https://client.crisp.chat",
  // Sentry, GA, Clarity, Crisp (including its websocket) and Speed Insights.
  "connect-src 'self' https://*.ingest.de.sentry.io https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://*.clarity.ms https://client.crisp.chat https://storage.crisp.chat wss://client.relay.crisp.chat https://vitals.vercel-insights.com",
  "frame-src 'self' https://calendly.com https://client.crisp.chat",
  "media-src 'self' https://client.crisp.chat",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Don't advertise the framework version to anyone scanning the site.
  poweredByHeader: false,

  images: {
    // Serve AVIF/WebP where the browser accepts it. The source photos are
    // ~1MB PNGs; through next/image they come down by well over 90%.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Nothing on this site needs these, so switch them off explicitly.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        // Note: don't add a rule for /_next/static — Next already sets
        // immutable caching there and overriding it breaks dev behaviour.
        source: '/downloads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

module.exports = nextConfig
