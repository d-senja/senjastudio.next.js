import Layout from '../components/Layout'
import Image from 'next/image'

export default function Examples() {
  return (
    <Layout
      title="Mortgage Broker Website Examples"
      description="See mortgage broker websites we have actually built — the layout decisions, the segmented enquiry paths and the compliance work behind each one."
      canonical="/examples"
    >
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px 72px', textAlign: 'center' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>Live client sites</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Mortgage broker websites<br />built to <em style={{ color: 'var(--gold-light)' }}>win clients.</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
          Every site built by Senja Studio is conversion-first, FCA-compliant, and delivered in 7 days. See the standard we hold ourselves to.
        </p>
      </div>

      {/* Live example */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', marginBottom: '48px', overflow: 'hidden' }}>
          <div style={{ aspectRatio: '16/9', background: 'var(--navy)', overflow: 'hidden', position: 'relative' }}>
            <Image
              src="/images/whitfield-preview.jpg"
              alt="Homepage of the Whitfield Mortgage Advisory website built by Senja Studio, showing the hero headline, segmented call-to-action buttons and a Google review"
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '6px' }}>
                Whitfield Mortgage Advisory
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '600px' }}>
                A full conversion-first homepage built for an independent mortgage adviser. Segmented CTAs for self-employed, first-time buyer, and complex case clients. Google reviews in the hero. FCA authorisation statement, WhatsApp integration, and live rate display built in from day one.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                {['Conversion-first layout', 'Segmented CTAs', 'FCA compliant', 'Mobile-first', 'WhatsApp integration'].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <a
              href="https://indexhtml-flax-zeta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flexShrink: 0, alignSelf: 'center' }}
            >
              View Live Site →
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '40px' }}>
          <a
            href="https://indexhtml-flax-zeta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.85rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.7'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            See a site we've built — Whitfield Mortgages →
          </a>
        </div>

        {/* Coming soon */}
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '32px' }}>
          More sites being added
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {[
            { label: 'Client site — launching soon', desc: 'Independent mortgage broker · Self-employed specialist · South East UK' },
            { label: 'Client site — in build', desc: 'Whole of market adviser · First-time buyer focus · Northern England' },
          ].map((card, i) => (
            <div key={i} style={{ background: 'var(--cream2)', padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.3 }}>🔒</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>{card.label}</strong>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          You could be next.<br /><em style={{ color: 'var(--gold-light)' }}>Seriously.</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Every build starts with a call. 30 minutes, no commitment. By the end you&apos;ll know exactly what your site needs — and whether we&apos;re the right fit to build it.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>
          Book Your Free Call
        </button>
      </div>
    </Layout>
  )
}
