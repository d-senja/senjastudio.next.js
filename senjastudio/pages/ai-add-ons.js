import Layout from '../components/Layout'
import Link from 'next/link'

// The six add-ons and the bundled stack. These used to sit in the middle of the
// homepage, ~115 lines between the pricing table and the process section. They
// are a separate business line from "we build mortgage broker websites", and
// putting them here lets the homepage make one argument properly.
const ADDONS = [
  { tag: 'Most Popular', title: 'AI Lead Capture Chatbot', body: "An AI assistant that qualifies mortgage leads 24/7 — asking the right questions, capturing contact details, and booking calls while you sleep.", price: '\u00a3800', monthly: 'Included in Care Plan' },
  { tag: 'Add-on', title: 'AI Customer Support Agent', body: "An AI that handles common mortgage questions from existing and prospective clients around the clock.", price: '\u00a31,200', monthly: '+ \u00a3100/month' },
  { tag: 'Add-on', title: 'AI Appointment Setting Agent', body: "An AI that follows up with leads who didn't book, reactivates cold contacts, and fills your calendar.", price: '\u00a31,000', monthly: '+ \u00a3100/month' },
  { tag: 'Add-on', title: 'Automated AI Outreach System', body: "A fully automated outreach pipeline that scrapes leads, generates personalised emails, and sends them on autopilot.", price: '\u00a31,500', monthly: '+ \u00a3150/month' },
  { tag: 'Add-on', title: 'AI Inbound Phone Caller', body: "An AI voice agent that answers your business calls when you're unavailable — qualifying the enquiry, capturing details, and booking a callback.", price: '\u00a31,500', monthly: '+ \u00a3120/month' },
  { tag: 'Add-on', title: 'AI Outbound Phone Caller', body: "An AI voice agent that proactively calls leads from your pipeline — following up on enquiries and booking appointments.", price: '\u00a32,000', monthly: '+ \u00a3150/month' },
]

export default function AiAddOns() {
  return (
    <Layout
      title="AI Add-Ons for Broker Websites"
      description="AI lead capture, support, appointment setting and voice agents built into your broker website. Six add-ons from £800, or the full stack. Scoped separately."
      canonical="/ai-add-ons"
    >
      <div className="location-hero" style={{ padding: '80px 48px 64px', textAlign: 'center' }}>
        <p className="section-label">AI-powered add-ons</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Supercharge your site with<br /><em style={{ color: '#E2C46A' }}>AI automation.</em>
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.85 }}>
          Every add-on below is built into a site we&apos;ve delivered. Add one, add several, or take the full stack. Scoped and timed separately from the 7-day website build.
        </p>
      </div>

    {/* ── AI ADD-ONS ───────────────────────────────── */}
    {/* The page hero already carries the label and heading — this section
        would otherwise repeat both immediately below it. */}
    <section className="section upsells" id="addons">
      <div className="grid-3col" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {ADDONS.map((addon, i) => (
          <div key={i} className="upsell-card">
            <div className="upsell-icon css-diamond"></div>
            <div className="upsell-tag">{addon.tag}</div>
            <div className="upsell-title">{addon.title}</div>
            <div className="upsell-sub">{addon.body}</div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--ink)' }}>
                {addon.price} <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--sans)' }}>setup</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>{addon.monthly}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button className="btn-primary" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>Discuss Add-ons on a Free Call</button>
      </div>
    </section>

    {/* ── FULL AI STACK ────────────────────────────── */}
    <section id="full-ai-stack" style={{ background: 'var(--royal)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '0', right: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '0', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>Premium Package</span>
          </div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 600, color: 'var(--white)', marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            The Full AI Stack
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto' }}>
            Every AI agent working together — lead capture, customer support, appointment setting, outreach automation, inbound and outbound calling. <strong style={{ color: 'rgba(255,255,255,0.85)' }}>The complete mortgage broker AI system.</strong>
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '56px 48px', position: 'relative', boxShadow: '0 30px 90px rgba(0,0,0,0.4), 0 0 1px rgba(212,175,55,0.5) inset' }}>
          {/* Top accent line */}
          <div style={{ position: 'absolute', top: '0', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '56px', alignItems: 'center', marginBottom: '48px' }}>
            {/* Left: What's included */}
            <div>
              <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '24px', fontWeight: 500 }}>Includes All 6 AI Agents:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'AI Lead Capture Chatbot',
                  'AI Customer Support Agent',
                  'AI Appointment Setting Agent',
                  'Automated AI Outreach System',
                  'AI Inbound Phone Caller',
                  'AI Outbound Phone Caller'
                ].map((name, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%)' }} />

            {/* Right: Pricing */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>Setup Fee</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '3.5rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1, marginBottom: '8px' }}>£4,999</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 500 }}>Save £3,000 vs buying separately</div>
              </div>

              <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>Monthly</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '3.5rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1, marginBottom: '8px' }}>£499<span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)' }}>/mo</span></div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 500 }}>Save £120/month vs buying separately</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              className="btn-gold"
              onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}
              style={{
                fontSize: '0.85rem',
                padding: '18px 48px',
                boxShadow: '0 8px 24px rgba(212,175,55,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.boxShadow = '0 12px 32px rgba(212,175,55,0.4)'}
              onMouseOut={(e) => e.target.style.boxShadow = '0 8px 24px rgba(212,175,55,0.3)'}
            >
              Book a Call to Discuss the Full Stack →
            </button>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '16px', lineHeight: 1.7 }}>
              Not every broker needs all six agents. We'll help you choose the right stack for your business on the call.
            </p>
          </div>

          {/* Bottom accent line */}
          <div style={{ position: 'absolute', bottom: '0', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)' }} />
        </div>
      </div>
    </section>

      <div style={{ background: 'var(--cream2)', padding: '56px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px' }}>
          Not sure which add-ons make sense for your business?
        </p>
        <Link href="/#pricing" className="btn-primary" style={{ textDecoration: 'none' }}>
          See website pricing
        </Link>
      </div>
    </Layout>
  )
}
