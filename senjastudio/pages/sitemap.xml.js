import { LOCATION_SLUGS } from './[slug]'
import { POST_SLUGS } from './blog/[slug]'

// The apex is the primary host. Every <loc> must agree with the canonical tags
// in Layout.js, or Google gets a sitemap pointing at URLs whose canonical
// points somewhere else — which is the problem this sitemap exists to fix.
const ORIGIN = 'https://senjastudio.co.uk'

// Hand-maintained because these are the only paths with no generated list.
// Deliberately absent: /404 and /api/* — neither should ever be indexed.
const STATIC_PATHS = [
  ['/', 1.0],
  ['/examples', 0.8],
  ['/ai-add-ons', 0.8],
  ['/website-score', 0.8],
  ['/blog', 0.7],
  ['/contact', 0.7],
  ['/glossary', 0.6],
  ['/referral', 0.5],
  ['/privacy-policy', 0.3],
  ['/terms', 0.3],
]

// No <lastmod>: the only dates in this codebase are display strings like
// "July 2025" that don't track edits. Google discounts a lastmod it finds
// unreliable, so omitting it is worth more than inventing one. No <changefreq>
// either — Google ignores that element outright.
function urlEntry(path, priority) {
  return `  <url>
    <loc>${ORIGIN}${path}</loc>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
}

function buildSitemap() {
  const entries = [
    ...STATIC_PATHS.map(([path, priority]) => urlEntry(path, priority)),
    ...LOCATION_SLUGS.map(slug => urlEntry(`/${slug}`, 0.8)),
    ...POST_SLUGS.map(slug => urlEntry(`/blog/${slug}`, 0.6)),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  // Cheap to regenerate, but there's no reason to rebuild it per crawl hit.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400')
  res.write(buildSitemap())
  res.end()
  return { props: {} }
}

// Never rendered — getServerSideProps ends the response itself.
export default function Sitemap() {
  return null
}
