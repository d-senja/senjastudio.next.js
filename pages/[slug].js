import Layout from '../components/Layout'

// ── ALL LOCATION DATA IN ONE PLACE ───────────────────────────
// To add a new city: add an entry below and add the slug to getStaticPaths
const LOCATIONS = {
  'mortgage-broker-website-design-london': {
    city: 'London',
    country: 'United Kingdom',
    regionDesc: "London has more independent mortgage brokers per square mile than anywhere in the UK — and the most competitive mortgage market in the country",
    clientTypes: ['Self-Employed London Professionals', 'First-Time Buyers & Remortgagers'],
    localDetail: [
      'The London mortgage market is dominated by self-employed clients — contractors, directors, and freelancers who need a broker that clearly understands complex income. Your site needs to speak directly to them within 5 seconds of landing.',
      'With London house prices averaging over £500k, first-time buyers face unique challenges. Your site should speak to their specific fears and make booking a call feel easy and obvious.',
    ],
    faqs: [
      { q: 'Do you work with mortgage brokers in London specifically?', a: 'Yes — we work with independent mortgage brokers worldwide, including across London and the South East. Every site is built to convert your specific client base, whether that\'s self-employed London professionals, first-time buyers, or complex cases.' },
      { q: 'How much does a mortgage broker website cost in London?', a: 'Our pricing is the same regardless of location. Homepage Build from £1,500, Full Website from £2,500, Bespoke from £3,500. Compare this to a London agency charging £5,000–£8,000 for a site with no specialist mortgage knowledge built in.' },
    ],
  },
  'mortgage-broker-website-design-manchester': {
    city: 'Manchester',
    country: 'United Kingdom',
    regionDesc: "Manchester's mortgage market is booming — driven by a growing tech sector, rising property values, and an influx of young professionals and first-time buyers",
    clientTypes: ['First-Time Buyers', 'Self-Employed Professionals'],
    localDetail: [
      "Manchester's property market skews young. First-time buyers in Ancoats, Salford, and Didsbury are searching for brokers who understand their situation — government schemes, shared ownership, and the buying process from scratch.",
      "Manchester's growing tech and creative sector means a large pool of self-employed mortgage clients — developers, designers, and contractors who earn well but have complex income structures.",
    ],
    faqs: [
      { q: 'Do you work with mortgage brokers in Manchester?', a: 'Yes — we work with independent mortgage brokers across the UK including Manchester and the North West. Your site will be built to convert your specific Manchester client base.' },
      { q: 'How much does a mortgage broker website cost in Manchester?', a: 'Our pricing is consistent: Homepage Build from £1,500, Full Website from £2,500, Bespoke from £3,500. Significantly less than a Manchester agency — and built by someone who actually understands the mortgage industry.' },
    ],
  },
  'mortgage-broker-website-design-birmingham': {
    city: 'Birmingham',
    country: 'United Kingdom',
    regionDesc: "Birmingham is one of the UK's fastest-growing property markets — with significant demand from first-time buyers, young families, and a large self-employed professional community",
    clientTypes: ['Young Families & First-Time Buyers', 'Complex Case Specialists'],
    localDetail: [
      'Birmingham attracts a high proportion of first-time buyers and young families looking to step onto the property ladder. Your site needs clear, reassuring messaging about the process.',
      'Birmingham has a large community of business owners, contractors, and self-employed professionals who are consistently underserved by high street lenders. Brokers who position themselves as complex case specialists win some of the most valuable clients available.',
    ],
    faqs: [
      { q: 'Do you work with mortgage brokers in Birmingham?', a: 'Yes — we work with independent mortgage brokers across the Midlands and UK-wide. Every site is built specifically for your client base.' },
      { q: 'How much does a mortgage broker website cost in Birmingham?', a: 'Homepage Build from £1,500, Full Website from £2,500, Bespoke from £3,500. A fraction of what a Birmingham agency would charge — and built with actual mortgage broker expertise.' },
    ],
  },
  'mortgage-broker-website-design-usa': {
    city: 'the USA',
    country: 'the United States',
    regionDesc: "The US mortgage market is vast — with over 100,000 independent mortgage brokers competing for clients across 50 states. A high-converting website is your single biggest competitive advantage",
    clientTypes: ['Self-Employed Borrowers', 'Jumbo Loan & Complex Case Clients'],
    localDetail: [
      'Self-employed Americans face consistent challenges with conventional lenders — W2 vs 1099 income, business write-offs affecting qualifying income, and bank statement loan requirements. Brokers who clearly signal expertise in this area win the most valuable clients.',
      'The jumbo loan and complex case market in the US is underserved by most broker websites. If you work with high-net-worth clients, investment properties, or non-QM loans, your site needs to signal this immediately.',
    ],
    faqs: [
      { q: 'Do you build websites for US mortgage brokers?', a: 'Yes — we work with independent mortgage brokers worldwide, including across the United States. We understand the US regulatory environment and build compliance-ready sites for your market.' },
      { q: 'How much does a US mortgage broker website cost?', a: 'Homepage Build from £1,500 (~$1,900 USD), Full Website from £2,500 (~$3,200 USD), Bespoke from £3,500. Delivered in 7 days. We handle everything remotely — same quality, same timeline, wherever you are.' },
    ],
  },
  'mortgage-broker-website-design-australia': {
    city: 'Australia',
    country: 'Australia',
    regionDesc: "The Australian mortgage broking industry is one of the most competitive in the world — with over 19,000 accredited brokers fighting for market share in a tight property market",
    clientTypes: ['Self-Employed & Business Owner Clients', 'First Home Buyers'],
    localDetail: [
      'Self-employed Australians face significant scrutiny from lenders — particularly around the two-year ABN requirement and addback calculations. Brokers who clearly demonstrate expertise in self-employed lending attract the clients other brokers can\'t place.',
      'The First Home Guarantee and regional home buyer schemes mean first home buyers in Australia have more options than ever — but more confusion too. Brokers whose websites clearly explain these schemes convert this audience at a significantly higher rate.',
    ],
    faqs: [
      { q: 'Do you build websites for Australian mortgage brokers?', a: 'Yes — we work with mortgage brokers across Australia. We understand ASIC requirements and build compliance-ready sites that convert Australian clients.' },
      { q: 'How much does an Australian mortgage broker website cost?', a: 'Homepage Build from £1,500 (~$2,900 AUD), Full Website from £2,500 (~$4,800 AUD). Delivered in 7 days, fully remote. Same quality as our UK builds, built for the Australian market.' },
    ],
  },
  'mortgage-broker-website-design-dubai': {
    city: 'Dubai',
    country: 'UAE',
    regionDesc: "Dubai's mortgage market is unique — expat-heavy, cash-rich, and moving fast. Independent mortgage brokers in Dubai compete for clients who have high expectations and move quickly when they find someone they trust",
    clientTypes: ['UAE Resident Expats', 'International Property Investors'],
    localDetail: [
      "The majority of Dubai's mortgage market is expats — professionals from the UK, India, Europe, and beyond who are buying property in the UAE for the first time. They need a broker who understands the UAE mortgage process, expat eligibility rules, and which lenders work with non-UAE nationals.",
      'Dubai attracts significant investment property demand — from both UAE residents and international buyers. Investors want to see a broker who understands DLD fees, LTV limits for non-residents, and the financing options available on off-plan and completed properties.',
    ],
    faqs: [
      { q: 'Do you build websites for Dubai mortgage brokers?', a: 'Yes — we work with mortgage brokers across the UAE and internationally. We understand the Dubai property market and build sites that convert both expat and investor audiences.' },
      { q: 'How much does a Dubai mortgage broker website cost?', a: 'Homepage Build from £1,500 (~7,200 AED), Full Website from £2,500 (~12,000 AED). Delivered in 7 days, fully remote. We handle everything — you just approve the result.' },
    ],
  },
}

export default function LocationPage({ location, slug }) {
  if (!location) return null
  const { city, country, regionDesc, clientTypes, localDetail, faqs } = location

  return (
    <Layout
      title={`Mortgage Broker Website Design ${city}`}
      description={`Specialist mortgage broker website design for independent advisers in ${city}. Conversion-first, FCA-compliant, delivered in 7 days from £2,500.`}
      canonical={`/${slug}`}
    >
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px', textAlign: 'center' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>
          Mortgage broker website design {city}
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          The mortgage broker website<br /><em style={{ color: 'var(--gold-light)' }}>{city} independents trust.</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.85 }}>
          {regionDesc}. Senja Studio builds conversion-first, FCA-compliant mortgage broker websites exclusively for independent advisers — worldwide. Delivered in 7 days from £2,500.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>
          Book a Free Call — It's Free
        </button>
      </div>

      {/* Why section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
        <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>
          Why brokers in {city} choose Senja Studio
        </span>
        <h2 className="section-heading">
          Built for the way {city}<br />mortgage clients <em>actually search.</em>
        </h2>
        <div className="grid-2col" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { title: `Segmented for ${clientTypes[0]}`, body: localDetail[0] },
            { title: `Segmented for ${clientTypes[1]}`, body: localDetail[1] },
            { title: 'FCA Compliance Built In', body: `Every site we deliver includes a compliant authorisation statement, regulatory disclosure, and cookie consent — built correctly from day one. Not bolted on as an afterthought.` },
            { title: `Live in 7 Working Days`, body: `From brief to live site in 7 days. While a generic agency in ${city} takes 6–10 weeks and charges £5,000+, we deliver a higher-converting site at a fraction of the cost.` },
          ].map((card, i) => (
            <div key={i} className="card" style={{ background: 'var(--white)', padding: '36px 28px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '10px' }}>{card.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.85 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stat-row" style={{ background: 'var(--navy)', padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', textAlign: 'center' }}>
        {[['7', 'Day delivery'], ['£2,500', 'Full website from'], ['100%', 'Mortgage broker niche']].map(([num, label]) => (
          <div key={label} style={{ padding: '20px' }}>
            <div className="stat-num" style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px' }}>{num}</div>
            <div className="stat-label" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '72px 48px' }}>
        <h2 className="section-heading">Questions from {city}<br />mortgage brokers</h2>
        <div style={{ border: '1px solid var(--border)' }}>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{faq.q}<span className="faq-icon">+</span></summary>
              <div className="faq-a">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Ready to build the best<br />broker site in <em style={{ color: 'var(--gold-light)' }}>{city}?</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.85 }}>
          Book a free 30-minute call. We'll review your current site, show you a live example, and tell you exactly what your next site should look like. No commitment required.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>
          Book Your Free Call
        </button>
        <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
          Typically responds within 2 hours · dan@senjastudio.co.uk
        </p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(LOCATIONS).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const location = LOCATIONS[params.slug] || null
  return { props: { location, slug: params.slug } }
}
