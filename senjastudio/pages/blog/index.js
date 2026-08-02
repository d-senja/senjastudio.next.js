import Layout from '../../components/Layout'
import Link from 'next/link'

const posts = [
  {
    slug: 'why-mortgage-broker-websites-fail-to-convert',
    title: 'Why Most Mortgage Broker Websites Fail to Convert Visitors into Enquiries',
    excerpt: 'Most broker sites have the same three problems. Here\'s what they are — and exactly how to fix them.',
    tag: 'Conversion',
    date: 'July 2025',
    emoji: '📉',
  },
  {
    slug: 'fca-compliant-mortgage-broker-website',
    title: 'FCA Compliant Mortgage Broker Website: What You Actually Need in 2025',
    excerpt: 'The FCA rules that apply to your website — and the simple ways most broker sites get them wrong.',
    tag: 'FCA Compliance',
    date: 'July 2025',
    emoji: '🏛️',
  },
  {
    slug: 'how-much-does-a-mortgage-broker-website-cost',
    title: 'How Much Does a Mortgage Broker Website Cost UK?',
    excerpt: 'Agencies quote £3k–£8k. Freelancers quote £500. Here\'s what you actually get at each price point.',
    tag: 'Pricing',
    date: 'July 2025',
    emoji: '💷',
  },
  {
    slug: 'mortgage-broker-website-agency-vs-specialist',
    title: 'Mortgage Broker Website: Agency vs Specialist — Which Is Right For You?',
    excerpt: 'A generic agency has never thought about self-employed income, FCA promotion rules, or segmented CTAs. We have.',
    tag: 'Strategy',
    date: 'July 2025',
    emoji: '⚖️',
  },
  {
    slug: '8-things-your-mortgage-broker-website-is-missing',
    title: '8 Things Your Mortgage Broker Website Is Missing (And How to Fix Them)',
    excerpt: 'Most broker sites are missing at least five of these. Each one costs you enquiries every single week.',
    tag: 'Conversion',
    date: 'July 2025',
    emoji: '🔍',
  },
]

export default function Blog() {
  return (
    <Layout
      title="Mortgage Broker Website Design Blog"
      description="Mortgage broker website design guides, FCA compliance tips, and conversion strategies from Senja Studio."
      canonical="/blog"
    >
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '72px 48px', textAlign: 'center' }}>
        <p className="section-label" style={{ marginBottom: '12px' }}>Senja Studio — The Journal</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Mortgage broker website design.<br /><em style={{ color: 'var(--gold-light)' }}>The honest guide.</em>
        </h1>
      </div>

      {/* Posts Grid */}
      <div style={{ background: 'var(--cream)', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 48px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {posts.map(post => (
            <article key={post.slug} className="blog-card">
              <div className="blog-card-image" style={{ background: 'var(--navy)', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                {post.emoji}
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="blog-tag">{post.tag}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                  {post.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-read-more">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
