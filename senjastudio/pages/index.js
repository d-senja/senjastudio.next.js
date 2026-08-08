import fs from 'fs'
import path from 'path'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import CardStackCarousel from '../components/CardStackCarousel'
import HeroTeardown from '../components/HeroTeardown'
import SnapToSection from '../components/SnapToSection'

// ── DATA ──────────────────────────────────────────────────────
// Homepage for Senja Studio - mortgage broker website design
const NICHE_CARDS = [
  { title: 'We know how mortgage clients think', body: 'Self-employed clients, complex cases, first-time buyers — we know what each one needs to see before they book a call. That knowledge is built into every layout, every CTA, every line of copy.' },
  { title: 'FCA compliance built in from the start', body: 'Regulatory compliance built in from day one — authorisation statements, GDPR/privacy-compliant forms, cookie consent, financial promotion-safe copy. A generic agency hands you a site and leaves you to figure it out.' },
  { title: "We've studied what actually converts", body: "We've analysed conversion patterns across mortgage broker sites specifically — not restaurant sites, not e-commerce. We know what makes a broker's phone ring and what makes visitors bounce." },
  { title: 'No briefing from scratch', body: "A generic agency needs weeks to understand your industry before they can even begin. We already understand it. That's why we deliver in 7 days and a generic agency takes 3 months." },
  { title: 'Segmented pathways for each client type', body: 'The biggest leak in most broker sites is one generic CTA for every type of client. We build segmented pathways — self-employed, complex cases, first-time buyers — so each visitor feels directly spoken to.' },
  { title: 'Specialists outperform generalists', body: "You wouldn't use a general solicitor for a complex mortgage dispute. You wouldn't use a general web agency for a mortgage broker website. Specialism matters." },
]

const WHO_CARDS = [
  { title: 'Brokers Just Starting Out', body: "Your first impression is everything. Starting with a professional, FCA-compliant site from day one means you look established immediately — and clients choose you over brokers who've been going for years but haven't invested online." },
  { title: 'Established Brokers Leaking Leads', body: "You're getting traffic but not enough enquiries. Your current site looks dated, loads slowly, and doesn't speak to the client types you actually want. A conversion-first rebuild pays for itself within weeks." },
  { title: 'Complex Case Specialists', body: "Self-employed clients, adverse credit, unusual income — these are your best clients and the hardest to reach. We build separate entry points for each, so the right client recognises themselves and makes contact instead of bouncing." },
  { title: 'Brokers Running Ads', body: "Running Google or Facebook ads to a generic site is burning money. Every £1 you spend on traffic needs a site that converts it. If the page you send that traffic to doesn't speak to the client you're targeting, you pay for the click and lose the enquiry." },
]

const OFFER_ITEMS = [
  { num: '01', title: 'Conversion-First Layout', body: 'Every element positioned to move visitors toward a booking. Not aesthetic — functional. Built around how mortgage clients actually behave on mobile.' },
  { num: '02', title: 'Segmented CTAs for Every Client Type', body: 'Self-employed, first-time buyer, adverse credit — separate pathways for each so every visitor feels directly spoken to. The single biggest lever for more enquiries.' },
  { num: '03', title: 'Google Reviews Positioned to Close', body: 'Your star rating and best client quote in the hero — before anyone scrolls. Social proof at the exact moment visitors decide whether to trust you.' },
  { num: '04', title: 'FCA Compliance Throughout', body: 'Authorisation statement, regulatory badges, compliant copy. We check every financial promotion claim before the site goes live. You deal with us directly — not a junior following a checklist.' },
  { num: '05', title: 'WhatsApp, Calendly & Booking Integration', body: 'Direct WhatsApp widget, Calendly booking flow, and click-to-call — every possible way a motivated lead can reach you, built in and working from day one.' },
  { num: '06', title: 'Mobile-First & Fast', body: 'Most mortgage research now happens on a phone. Your site loads fast, looks sharp, and converts on every device — phone, tablet, desktop.' },
  { num: '07', title: 'Lender Panel Credibility Block', body: "A \"whole of market access to 90+ lenders\" trust signal — because the breadth of your panel is one of the biggest reasons clients choose an independent broker over a bank." },
  { num: '08', title: '48-Hour DIP Promise Display', body: 'Decision in Principle timelines matter to buyers who are under pressure. If you offer a fast DIP, we make that a visible selling point.' },
  // Folded in from the old "Broker-Specific Features" section. The other three
  // items there — lender panel, DIP promise and Google reviews — already
  // appeared above, so the homepage was making the same points twice.
  { num: '09', title: 'Live Mortgage Rate Display', body: 'A rate ticker showing 2-year fixed, 5-year fixed and Bank Rate, pulled from Bank of England data. Visitors see real numbers immediately, not a static page. A generic agency would never think to include this.' },
  { num: '10', title: 'Complex Case Positioning', body: 'Most brokers want more self-employed and complex case clients, but their websites speak only to first-time buyers. We segment the copy and CTAs so complex case clients see themselves addressed and feel confident enough to book.' },
  { num: '11', title: '£0 Broker Fee Prominence', body: "If you charge no broker fee, that's one of your biggest conversion advantages — and most broker sites bury it. We put it in your stats grid, your hero and your CTA copy so visitors see it before they think about going elsewhere." },
]

const PROCESS_STEPS = [
  { num: '01', day: 'Day 0', title: 'Free 30-min call', body: "I pull up your site and tell you exactly what's costing you leads — specific problems, specific fixes. No pitch deck, no generic advice. If I can't show you something useful in 30 minutes, you've lost nothing." },
  { num: '02', day: 'Day 0', title: 'Invoice & brief', body: "50% invoice sent. Once paid, you receive a short project brief — your brand, your clients, your positioning. Takes around 30 minutes to fill in properly. That's all we need to get started." },
  { num: '03', day: 'Days 1–5', title: 'The build', body: "I build your site from scratch — the layout, the separate paths for each client type, your reviews placed where they do the most work, and the compliance detail. You send me the brief. I handle everything else." },
  { num: '04', day: 'Day 5–6', title: 'Review & revisions', body: "You get a preview link. Two rounds of revisions — anything you want changed, we change it. Once you're happy, we move to launch." },
  { num: '05', day: 'Day 7', title: 'Live & launched', body: "Final 50% invoice. Site goes live on your domain. I handle all the deployment — you don't need to touch GitHub, Vercel, or DNS. It just appears." },
  { num: '06', day: 'Ongoing', title: 'Care Plan kicks in', body: "Your first month is free. After that, £150/month covers up to 2 hours of changes — new reviews added, copy refreshed, tweaks and updates whenever you need them." },
]

const TESTIMONIALS = [
  { quote: "I was paying £200/month for a site that got me maybe one enquiry a fortnight. The Senja Studio site went live and I had three calls booked in the first week. The self-employed CTA specifically — that was the change.", name: 'James W.', role: 'Independent Mortgage Adviser · Manchester', stars: 5 },
  { quote: "Dan built the whole thing from scratch, got everything compliant, integrated my Calendly, and launched in under a week. I've worked with two agencies before — this was faster, cheaper, and genuinely better.", name: 'Sarah C.', role: 'Whole of Market Broker · London', stars: 5 },
  { quote: "The before/after is ridiculous. My old site looked like it was built in 2014 because it was. The new one looks like I've been doing this for 20 years. Clients comment on it constantly.", name: 'Mark T.', role: 'Protection & Mortgage Specialist · Birmingham', stars: 5 },
]

const FAQS = [
  { q: 'Do you handle regulatory compliance on the site?', a: "We build regulatory compliance into every site as standard — not as an afterthought. This includes an authorisation statement, compliant disclaimer copy, GDPR-compliant lead forms with explicit consent language, and cookie consent built correctly. We review all copy for FCA financial promotion compliance before anything goes live." },
  { q: 'How much does a mortgage broker website cost?', a: "We offer three tiers. Homepage only: £1,500, delivered in 5 days. Full website (homepage + about + services + contact): £2,500, delivered in 7 days. Bespoke multi-page builds from £3,500 with timeline agreed per project. All builds include the first month of the Care Plan free." },
  { q: 'Do you build websites for brokers just starting out?', a: "Absolutely. Starting with a professional, FCA-compliant, conversion-focused site means you look established from day one — and clients choose you over brokers who've been around for years but never invested in their online presence." },
  { q: 'Are your websites FCA compliant?', a: "Yes. Every build includes FCA authorisation badge placement, compliant disclaimer copy, and layouts structured to meet financial promotion requirements. We review all claims and copy before launch." },
  { q: "What do you actually build — is it just a homepage?", a: "We offer three tiers. The Homepage Build is one high-converting page — which is where most visitors decide whether to contact you. The Full Website adds About, Services, and Contact pages. The Bespoke tier covers custom multi-page architectures." },
  { q: "What if I don't like the design?", a: "Every build includes 2 rounds of revisions. Before we start, we send you a project brief covering your brand colours, positioning, and preferences. Revisions are included — additional rounds beyond the two are billed at £75/hour." },
  { q: "Do I need to provide content, copy, or photos?", a: "No. We write all the copy, structure the page, and work with whatever brand assets you have. If you have a headshot, great. If not, we work with what's available. Everything you need to provide is covered in the project brief." },
  { q: "What's the Care Plan and what does it include?", a: "The Care Plan at £150/month comes with every build — your first month is free. It covers up to 2 hours of changes per month — adding new Google reviews, updating rates, refreshing copy, small design tweaks. Work beyond 2 hours is billed at £75/hour, agreed in advance." },
  { q: 'Will I own the website?', a: "Yes. You own everything — the code, the content, the files. There's no platform lock-in. If you ever want to move the site elsewhere, take it. Everything is yours." },
  { q: 'How is this different from using Wix or Squarespace?', a: "Wix and Squarespace are generic tools built for every business. Senja Studio builds for one industry. That shows up in the layout decisions, the compliance detail, and copy written for the clients you actually want. The result converts at a fundamentally different rate." },
]

const TRUST_STRIP = [
  'Compliance-Ready — every build',
  '50/50 Payment — no lock-in',
  'Free 30-Min Audit — no commitment',
  'Mortgage Brokers Only — worldwide',
  '7-Day Delivery — standard build',
  'From £1,500 — fraction of agency cost',
]

const BLOG_POSTS = [
  { slug: 'why-mortgage-broker-websites-fail-to-convert', title: 'Why Most Mortgage Broker Websites Fail to Convert', excerpt: "Most broker sites have the same three problems. Here's what they are — and exactly how to fix them.", tag: 'Conversion', date: 'July 2025', emoji: '📉' },
  { slug: 'fca-compliant-mortgage-broker-website', title: 'FCA Compliant Mortgage Broker Website: What You Actually Need', excerpt: "The FCA rules that apply to your website — and the simple ways most broker sites get them wrong.", tag: 'FCA Compliance', date: 'July 2025', emoji: '🏛️' },
  { slug: 'how-much-does-a-mortgage-broker-website-cost', title: 'How Much Does a Mortgage Broker Website Cost UK?', excerpt: "Agencies quote £3k–£8k. Freelancers quote £500. Here's what you get at each price point.", tag: 'Pricing', date: 'July 2025', emoji: '💷' },
]

// ── COMPONENTS ────────────────────────────────────────────────

// Literal hex, applied inline on a section wrapper. Sections that read as dark
// panels by design must not follow the theme, and an inline background cannot
// be repainted by a theme rule.
const DARK_PANEL = { background: '#0F0B1E', backgroundColor: '#0F0B1E' }


// Starts the file download without navigating away, so the success state
// stays on screen. Assigning to window.location.href replaced the page.
function triggerDownload(url) {
  if (!url) return
  const link = document.createElement('a')
  link.href = url
  link.download = ''
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

// Module scope, not component scope: a new array on every render made it a new
// useEffect dependency every render, so the effect tore down and re-ran
// continuously — that was the flashing.
const TYPEWRITER_PHRASES = ['booked calls.', 'qualified leads.', 'paying clients.', 'your best work.']
const TYPE_MS = 80
const DELETE_MS = 45
const HOLD_MS = 1800

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[idx]

    // Finished typing — hold the complete phrase, then start deleting.
    if (!isDeleting && text === phrase) {
      const t = setTimeout(() => setIsDeleting(true), HOLD_MS)
      return () => clearTimeout(t)
    }

    // Finished deleting — advance to the next phrase.
    if (isDeleting && text === '') {
      setIsDeleting(false)
      setIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length)
      return
    }

    const t = setTimeout(
      () => setText(isDeleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1)),
      isDeleting ? DELETE_MS : TYPE_MS
    )
    return () => clearTimeout(t)
  }, [text, isDeleting, idx])

  return (
    <em className="typewriter" style={{ color: 'var(--gold)' }}>
      {/* Screen readers get the full sentence once rather than every keystroke. */}
      <span aria-hidden="true">{text}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      <span className="sr-only">booked calls</span>
    </em>
  )
}

// Real rates from the Bank of England, via /api/rates. These were previously
// hardcoded numbers with a random jitter applied every 8 seconds and labelled
// "Live". The bar now renders nothing at all until real data arrives, so it can
// never show an invented figure.
function LiveRates() {
  const [rates, setRates] = useState(null)
  const month = useTimeBasedValue(getMonth, '')
  const slots = useTimeBasedValue(getSlots, 0)

  useEffect(() => {
    let cancelled = false
    fetch('/api/rates')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!cancelled && d && d.twoYearFixed) setRates(d) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  if (!rates) return null

  // The fixed-rate series are monthly averages published in arrears, so say so
  // rather than implying a live feed.
  const asOf = new Date(rates.twoYearFixed.asOf)
  const asOfLabel = Number.isNaN(asOf.getTime())
    ? rates.twoYearFixed.asOf
    : asOf.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <div className="live-bar">
      <div className="live-bar-inner">
        <div className="live-rates">
          <span className="live-label">UK average mortgage rates</span>
          <span className="live-rate-item">2yr fixed <strong>{rates.twoYearFixed.rate.toFixed(2)}%</strong></span>
          <span className="live-rate-item">5yr fixed <strong>{rates.fiveYearFixed.rate.toFixed(2)}%</strong></span>
          {rates.bankRate && (
            <span className="live-rate-item">Bank Rate <strong>{rates.bankRate.rate.toFixed(2)}%</strong></span>
          )}
          <a
            className="live-updated"
            href={rates.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Bank of England · {asOfLabel}
          </a>
        </div>
        {month && (
          <div className="live-availability">
            <span>Currently booking builds for <strong style={{ color: 'var(--burgundy)' }}>{month}</strong></span>
            <span className="live-slots">— <strong style={{ color: 'var(--burgundy)' }}>{slots} slot{slots === 1 ? '' : 's'}</strong> remaining</span>
          </div>
        )}
      </div>
    </div>
  )
}

function getMonth() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const d = new Date()
  return d.getDate() > 22 ? months[(d.getMonth() + 1) % 12] : months[d.getMonth()]
}

function getSlots() {
  return Math.max(1, 4 - Math.floor(new Date().getDate() / 9))
}

const ACTIVITIES = [
  { icon: '▪', text: 'Currently building a broker site for a new client' },
  { icon: '▸', text: 'Writing conversion copy for a homepage build' },
  { icon: '◆', text: 'Following up with brokers who booked calls this week' },
  { icon: '▴', text: 'Designing a segmented CTA layout for a broker' },
  { icon: '▸', text: 'Preparing a finished site for launch' },
  { icon: '◆', text: 'Setting up an AI lead capture chatbot for a client' },
  { icon: '▴', text: 'Reviewing analytics for a recently launched site' },
  { icon: '▸', text: 'Optimising mobile speed on a live broker site' },
]

// These pages are statically generated, so anything derived from the clock is
// frozen at build time in the server HTML and recomputed on the client —
// a guaranteed hydration mismatch. Render the first value on the server, then
// swap to the live one after mount.
function useTimeBasedValue(compute, initial) {
  const [value, setValue] = useState(initial)
  useEffect(() => { setValue(compute()) }, [compute])
  return value
}

const currentActivity = () => {
  const d = new Date()
  return ACTIVITIES[Math.floor((d.getHours() * 60 + d.getMinutes()) / 180) % ACTIVITIES.length]
}

function ActivityFeed() {
  const activity = useTimeBasedValue(currentActivity, ACTIVITIES[0])

  return (
    <div className="activity-feed-wrap">
      <div className="activity-live-dot" />
      <div className="activity-feed">
        <span className="activity-icon" aria-hidden="true">{activity.icon}</span>
        <span className="activity-text">{activity.text}</span>
      </div>
    </div>
  )
}

function StickyCompare({ openModal }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const pricing = document.getElementById('pricing')

    const checkVisibility = () => {
      const heroRect = hero?.getBoundingClientRect()
      const pricingRect = pricing?.getBoundingClientRect()

      // Hide if hero is in viewport
      if (heroRect && heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
        setVisible(false)
        return
      }

      // Hide if pricing section is in viewport
      if (pricingRect && pricingRect.top < window.innerHeight && pricingRect.bottom > 0) {
        setVisible(false)
        return
      }

      // Show if scrolled past hero but pricing not in viewport
      if (heroRect && heroRect.bottom < 0) {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    checkVisibility()

    return () => window.removeEventListener('scroll', checkVisibility)
  }, [])

  return (
    <div className={`sticky-compare${visible ? ' visible' : ''}`}>
      {[['Homepage', '£1,500'], ['Full Site', '£2,500'], ['Site + Leads', '£3,500/mo']].map(([label, price]) => (
        <div key={label} className="sticky-compare-item">
          <span className="sticky-compare-label">{label}</span>
          <span className="sticky-compare-price">{price}</span>
        </div>
      ))}
      <button className="sticky-compare-btn" onClick={openModal}>Book a Free Call →</button>
    </div>
  )
}

// ── AI AUDIT SECTION ──────────────────────────────────────────
function AuditSection() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      // The API returns { result }. Reading data.audit here meant the audit
      // never rendered, no matter how well the request went.
      if (res.ok && data.result) {
        setResult(data.result)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section" id="audit" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🤖</div>
          <p className="section-label">Free AI Website Audit</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 500, color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
            See what your site looks like<br />to a <em style={{ color: 'var(--gold)' }}>mortgage client</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}>
            Paste your URL. We read your actual homepage and come back with the five specific things costing you enquiries — CTA clarity, trust signals, compliance display and mobile experience. <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>2 free audits per day.</strong>
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <input
                type="url"
                placeholder="https://yourmortgagebrokersite.co.uk"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={loading}
                style={{
                  flex: '1',
                  minWidth: '280px',
                  padding: '16px 20px',
                  fontSize: '0.9rem',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--ink)',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="btn-primary"
                style={{
                  opacity: loading || !url ? 0.5 : 1,
                  cursor: loading || !url ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {loading ? 'Analyzing...' : 'Audit My Site →'}
              </button>
            </div>

            {error && (
              <div style={{
                padding: '16px 20px',
                background: '#fff5f5',
                border: '1px solid #feb2b2',
                borderRadius: '4px',
                fontSize: '0.85rem',
                color: '#c53030',
                lineHeight: 1.6
              }}>
                {error}
              </div>
            )}

            <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.6, textAlign: 'center' }}>
              Rate limit: 2 audits per IP per 24 hours. For unlimited audits and a personal review, <button onClick={(e) => { e.preventDefault(); document.dispatchEvent(new Event('openModal')) }} style={{ background: 'none', border: 'none', color: 'var(--gold)', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>book a free call</button>.
            </p>
          </form>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '8px' }}>✓ Audit Complete</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '4px' }}>Your Website Audit Results</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{url}</p>
              </div>
              <button
                onClick={() => { setResult(null); setUrl(''); setError('') }}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  background: 'none',
                  border: '1px solid var(--border)',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
                onMouseOut={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--navy)' }}
              >
                ← New Audit
              </button>
            </div>

            <div style={{
              fontSize: '0.88rem',
              color: 'var(--ink)',
              lineHeight: 1.85,
              whiteSpace: 'pre-wrap',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {result}
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '16px' }}>
                Want a deeper, personalized review of your site with specific recommendations?
              </p>
              <button
                className="btn-gold"
                onClick={() => document.dispatchEvent(new Event('openModal'))}
              >
                Book a free 30-minute review
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── ROI CALCULATOR ────────────────────────────────────────────
function ROICalculator() {
  const [fee, setFee] = useState(850)
  const [cases, setCases] = useState(2)
  const [convRate, setConvRate] = useState(35)

  const month1 = fee * cases
  const year1 = month1 * 12
  const payback = Math.ceil(2500 / fee)
  const enquiries = Math.ceil(1 / (convRate / 100))

  return (
    <section className="section" id="roi" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, var(--royal), transparent)', opacity: 0.03, pointerEvents: 'none' }} />
      <p className="section-label">Your return on investment</p>
      <h2 className="section-heading">
        What does one extra case<br />a month <em>actually mean?</em>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.8 }}>
        Adjust the sliders to match your business — and see what consistent online lead generation could add to your revenue.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '940px', margin: '0 auto' }}>
        {/* SLIDERS */}
        <div style={{ background: 'var(--surface)', padding: '40px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--gold)' }}>☆</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink)' }}>Your Numbers</span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Average proc fee per case</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--ink)' }}>£{fee}</span>
            </div>
            <input type="range" min="300" max="2000" step="50" value={fee} onChange={(e) => setFee(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Extra cases this site generates / month</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--ink)' }}>{cases}</span>
            </div>
            <input type="range" min="1" max="10" step="1" value={cases} onChange={(e) => setCases(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Website enquiry → case conversion rate</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--ink)' }}>{convRate}%</span>
            </div>
            <input type="range" min="10" max="80" step="5" value={convRate} onChange={(e) => setConvRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>
        </div>

        {/* RESULTS */}
        <div style={{ background: 'var(--cream)', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: 'var(--surface)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Extra revenue — Month 1</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--ink)', lineHeight: 1 }}>£{month1.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>From cases that wouldn't have found you without this site</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Extra revenue — Year 1</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--ink)', lineHeight: 1 }}>£{year1.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>Compounding as your Google visibility grows over time</div>
          </div>
          <div style={{ background: 'var(--surface)', borderLeft: '3px solid var(--gold)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Cases needed to cover the site cost</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{payback}{payback === 3 ? '–4' : payback === 2 ? '–3' : ''}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>At your proc fee — typically achieved in the first few weeks</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Enquiries needed to get your first case</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--ink)', lineHeight: 1 }}>{enquiries}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>At your current conversion rate</div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA BAR */}
      <div style={{ maxWidth: '940px', margin: '1px auto 0', background: 'var(--navy)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: 'var(--white)' }}>Your site is live in seven days.</strong> On these numbers, the build pays for itself in a handful of cases.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new Event('openModal'))} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          Book a free review →
        </button>
      </div>
      <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.7rem', color: 'var(--muted)' }}>
        Conservative estimate — excludes referral uplift, repeat clients, and Google ranking gains over time.
      </p>
    </section>
  )
}

// ── LEAD MAGNET SECTION ───────────────────────────────────────
function LeadMagnetSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [emailed, setEmailed] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setEmailed(data.emailed !== false)
        triggerDownload(data.downloadUrl)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="section lead-magnet-success" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gold)', fontWeight: 300 }}>◆</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.3 }}>
            {emailed ? 'Check your inbox' : 'Your download has started'}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
            {emailed
              ? "Your free guide is downloading now, and a copy is on its way to your inbox. If you don't see it in the next few minutes, check your spam folder."
              : "Your free guide is downloading now."}{' '}
            <a href="/downloads/5-things-broker-site-guide.pdf" download style={{ color: 'var(--gold-light)' }}>
              Download it again
            </a>{' '}
            if it didn&apos;t start.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="lead-magnet" style={{ background: 'var(--navy)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📋</div>
        <p className="section-label" style={{ color: 'var(--gold-light)' }}>Free Guide</p>
        <h2 className="lead-magnet-heading" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
          5 Things Your Broker Site<br />Is Costing You <em style={{ color: 'var(--gold-light)' }}>Right Now</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
          The most common mistakes that cost mortgage brokers enquiries every single week — and the exact fix for each one.
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: '460px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--white)',
                borderRadius: '4px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--white)',
                borderRadius: '4px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
            <div>
              <input
                type="tel"
                placeholder="Mobile number (optional) — get a text when your guide lands"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                style={{
                  padding: '16px 20px',
                  fontSize: '0.9rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--white)',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.78)', marginTop: '6px', lineHeight: 1.4 }}>
                UK numbers only. One text, no spam.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="btn-gold"
            style={{
              width: '100%',
              opacity: loading || !email ? 0.5 : 1,
              cursor: loading || !email ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Sending...' : 'Get the Free Guide →'}
          </button>

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#ff6b6b', marginTop: '12px' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.78)', marginTop: '12px', lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime. Read our <Link href="/privacy-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>privacy policy</Link>.
          </p>
        </form>
      </div>
    </section>
  )
}

// ── FCA CHECKLIST LEAD MAGNET ─────────────────────────────────
// Renders inline inside the FCA compliance section rather than as a standalone
// section, so the ask sits next to the argument that earns it.
function FCAChecklistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [emailed, setEmailed] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The API resolves the file from `source`; it never trusts a caller-supplied path.
        body: JSON.stringify({ email, name, source: 'fca-checklist' })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setEmailed(data.emailed !== false)
        triggerDownload(data.downloadUrl)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, margin: 0 }}>
          <strong style={{ color: 'var(--gold-light)' }}>
            {emailed ? 'Check your inbox.' : 'Your download has started.'}
          </strong>{' '}
          {emailed
            ? "The checklist is downloading now, and a copy is on its way to you. If you don't see it in a few minutes, check your spam folder."
            : 'The checklist is downloading now.'}{' '}
          <a href="/downloads/fca-compliance-checklist.pdf" download style={{ color: 'var(--gold-light)' }}>
            Download it again
          </a>{' '}
          if it didn&apos;t start.
        </p>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 500, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.3 }}>
          Get the <em style={{ color: 'var(--gold-light)' }}>compliance checklist</em> we work from
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
          Every requirement above, as a checklist you can run against your current site in about ten minutes.
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: '460px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--white)',
                borderRadius: '4px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--white)',
                borderRadius: '4px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="btn-gold"
            style={{
              width: '100%',
              opacity: loading || !email ? 0.5 : 1,
              cursor: loading || !email ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Sending...' : 'Get the Free Checklist →'}
          </button>

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#ff6b6b', marginTop: '12px' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.78)', marginTop: '12px', lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime. Read our <Link href="/privacy-policy" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>privacy policy</Link>.
          </p>
        </form>
      </div>
    </div>
  )
}

// ── FOUNDER VIDEO ─────────────────────────────────────────────
// The video file is dropped into /public/videos by hand, not committed by a
// code change, so this whole section is conditional: getStaticProps below looks
// for the file at build time and passes null when it isn't there. No file, no
// section — the page never renders a broken player while the video is still
// being filmed. Drop the file in, deploy, and the section appears.
function FounderVideo({ video, openModal }) {
  // The real dimensions come from the file itself at build time, so the frame
  // reserves the exact box on first paint. Reading them in the browser instead
  // meant the section resized under the reader once the metadata arrived — this
  // video is 3:2, so that was a ~90px jump mid-page. 16:9 is only the fallback
  // for a file we couldn't measure.
  const ratio = video.width && video.height ? video.width / video.height : null
  const isPortrait = ratio !== null && ratio < 1

  return (
    <section className="section founder-video" id="founder-video">
      <p className="section-label">In his own words</p>
      <h2 className="section-heading">
        Most broker sites are<br />brochures. <em>Yours won&apos;t be.</em>
      </h2>
      <p className="founder-video-sub">
        Just over a minute, straight from Dan. Almost every mortgage broker website is a brochure — a tidy list of who you are and what you do, sitting there waiting to be read. Here&apos;s what changes when the whole page is built to turn a visitor into a booked call instead.
      </p>

      <div className="founder-video-grid">
        <div
          className="founder-video-frame"
          style={{
            aspectRatio: ratio ? String(ratio) : '16 / 9',
            // A vertical video would otherwise run to well over a thousand
            // pixels tall in a 660px column. Held to a reel width instead.
            maxWidth: isPortrait ? '420px' : undefined,
            marginInline: isPortrait ? 'auto' : undefined,
          }}
        >
          <video
            className="founder-video-player"
            controls
            playsInline
            // The poster carries the first impression, so there is no reason to
            // spend a visitor's bandwidth on the video until they ask for it.
            preload={video.poster ? 'none' : 'metadata'}
            poster={video.poster || undefined}
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            {video.mp4 && <source src={video.mp4} type="video/mp4" />}
            {video.captions && (
              <track kind="captions" src={video.captions} srcLang="en" label="English" default />
            )}
            <p>
              Your browser can&apos;t play this video.{' '}
              <a href={video.mp4 || video.webm} download>Download it instead</a>.
            </p>
          </video>
          <div className="founder-video-tag">Dan Senja · Founder</div>
        </div>

        <div className="founder-video-notes">
          <h3>What I cover</h3>
          <ul>
            <li>What a brochure site actually is — and the good chance yours is one without you realising.</li>
            <li>The difference between a site that describes your service and one built to convert.</li>
            <li>What we do differently on every build, and where it shows up in your enquiries.</li>
          </ul>
          <p>
            No script, no crew, no agency voiceover. If you&apos;d rather ask the questions yourself, that&apos;s a thirty-minute call — I pull up your current site and tell you exactly what it&apos;s costing you.
          </p>
          <button className="btn-primary" onClick={openModal}>Book a free 30-minute review</button>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────

// FAQPage schema belongs only on the page that actually shows the FAQ.
// It previously shipped inside Layout, so every page on the site — blog posts,
// contact, privacy policy — claimed the same FAQ, which Google treats as
// mismatched structured data. Questions are generated from the rendered FAQS
// so the two can never drift apart.
const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

export default function Home({ founderVideo }) {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = (e) => { if (e) e.preventDefault(); setModalOpen(true) }

  return (
    <Layout
      title={null}
      description="We build websites for independent mortgage brokers and nobody else. Segmented enquiry paths, FCA compliance handled, live in 7 days. From £1,500."
      canonical="/"
      schema={HOME_SCHEMA}
      modalOpen={modalOpen}
      onModalClose={() => setModalOpen(false)}
    >
      <StickyCompare openModal={openModal} />

      {/* ── TEARDOWN ─────────────────────────────────── */}
      {/* Autoplays on load. Sits above the hero and leaves it untouched.
          Deliberately carries no <h1> — the hero below still owns that. */}
      <HeroTeardown onBookClick={openModal} />

      {/* Catches the overshoot between the teardown and the hero below. Renders
          nothing; desktop and no-reduced-motion only. */}
      <SnapToSection targetId="home" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-section" id="home">
        <div className="hero-left">
          <div className="hero-tag">Mortgage Broker Website Design</div>

          <ActivityFeed />

          {/* The typewriter sits on its own line. Inline, a longer phrase
              pushed the headline from three lines to four and back on every
              cycle, shifting everything below it — the page visibly shook. */}
          <h1 className="hero-headline" id="hero-heading">
            The mortgage broker website<br />that turns visitors into<br />
            <Typewriter />
          </h1>

          {/* One idea per sentence, and the reader's problem before our
              credentials. The previous version stacked five claims into a
              single sentence and read as a keyword list. */}
          <p className="hero-sub">
            <strong>Your site is where a broker gets chosen — or quietly ruled out.</strong> Most broker sites are built to look tidy, not to turn a stranger at 11pm into a booked call. We build for mortgage brokers and nobody else, so we already know what a self-employed applicant needs to read before they pick up the phone. Websites from £1,500. Live in 7 days.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={openModal}>Book a free 30-minute review</button>
            <a href="/examples" className="btn-ghost">See a site we&apos;ve built →</a>
          </div>

          <div className="hero-trust">
            <div className="hero-stars" aria-hidden="true">★★★★★</div>
            <div>
              <div className="hero-trust-bold">Built for one industry. Compliance handled. Live in 7 days.</div>
              <div className="hero-trust-sub">Dan builds every site personally — you never get passed to a junior.</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* LCP image: priority so it is preloaded, sized so the browser can
              reserve the space, and served as AVIF/WebP instead of a 1.1MB PNG. */}
          <Image
            src="/images/dan-photo.png"
            alt="Dan Senja, founder of Senja Studio"
            width={1022}
            height={1280}
            priority
            sizes="(max-width: 768px) 100vw, 38vw"
          />
          <div className="hero-right-overlay">
            <div className="hero-right-name">Dan Senja</div>
            <div className="hero-right-title">Founder · Senja Studio · Mortgage Broker Website Specialist</div>
          </div>
        </div>
      </section>

      {/* ── TRUST MARQUEE ────────────────────────────── */}
      <div className="trust-bar-strip">
        <div className="trust-marquee" id="trustMarquee">
          {/* Rendered twice so the -50% scroll loops seamlessly. The second
              copy is decorative and hidden from assistive tech. */}
          <div className="trust-marquee-inner">
            {[0, 1].map(copy =>
              TRUST_STRIP.map((t, i) => (
                <div key={`${copy}-${i}`} className="trust-strip-item" aria-hidden={copy === 1 ? 'true' : undefined}>
                  <span className="trust-strip-icon" aria-hidden="true">✦</span>
                  <span>{t.split(' — ')[0]}<span style={{ opacity: 0.45 }}> — </span>{t.split(' — ')[1]}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(26,20,40,0.4)', textAlign: 'center', marginTop: '12px' }}>
          Serving brokers in{' '}
          <Link href="/mortgage-broker-website-design-london" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>London</Link>
          {', '}
          <Link href="/mortgage-broker-website-design-manchester" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>Manchester</Link>
          {', '}
          <Link href="/mortgage-broker-website-design-birmingham" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>Birmingham</Link>
          {' and 22 more markets worldwide'}
        </p>
      </div>

      <LiveRates />

      {/* ── WHY SPECIALIST ───────────────────────────── */}
      <section className="section why-niche" id="why-niche">
        <p className="section-label">Why specialism matters</p>
        <h2 className="section-heading" id="niche-heading">
          A generic agency has to learn your<br />business. We <em>already know it.</em>
        </h2>
        <div className="niche-grid">
          {NICHE_CARDS.map((card, i) => (
            <div key={i} className="niche-card stagger-child">
              <div className="niche-icon css-diamond"></div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────── */}
      <section className="section who-section" id="who">
        <p className="section-label">Who we work with</p>
        <h2 className="section-heading" id="who-heading">
          Where a better site<br />actually <em>changes the numbers.</em>
        </h2>
        <div className="who-grid">
          {WHO_CARDS.map((card, i) => (
            <div key={i} className="who-card stagger-child">
              <div className="who-icon css-diamond"></div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────── */}
      {/* Always dark, in either theme — pinned inline so no theme rule can reach it. */}
      <section className="section scroll-reveal-text" id="offer" style={DARK_PANEL}>
        <p className="section-label">What&apos;s included</p>
        <h2 className="section-heading" id="offer-heading" style={{ color: '#FFFFFF' }}>
          What every build includes <em style={{ color: 'var(--gold-light)' }}>as standard.</em>
        </h2>
        <CardStackCarousel items={OFFER_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-gold" onClick={openModal}>Talk through your build</button>
        </div>
      </section>

      {/* ── FCA COMPLIANCE ───────────────────────────── */}
      <section className="section scroll-reveal-text" id="compliance" style={{ background: 'var(--navy)' }}>
        <p className="section-label">Compliance</p>
        <h2 className="section-heading" style={{ color: 'var(--white)' }}>
          Most agencies hand you a site<br />and leave you to <em style={{ color: 'var(--gold-light)' }}>figure out compliance yourself.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.78)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto 56px', lineHeight: 1.85 }}>
          We don't. Every site we build includes a standard compliance checklist delivered as part of the handover. Here's what's covered — and why it matters for your FCA authorisation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', maxWidth: '1000px', margin: '0 auto 56px' }}>
          <div style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: '8px', marginBottom: '10px' }}>Required by FCA</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: '10px' }}>FCA Authorisation Statement</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
              Every regulated mortgage broker site must display their authorisation statement and registration number — required by the FCA (UK), ASIC (Australia), CFPB/state regulators (USA), and equivalent bodies worldwide. We build a compliant placeholder into the footer of every page and flag it before going live.
            </p>
          </div>
          <div style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: '8px', marginBottom: '10px' }}>Financial Promotions Rules</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: '10px' }}>Fair, Clear & Not Misleading</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
              FCA rules require all financial promotions to be fair, clear and not misleading. We write copy with this in mind — no outcome guarantees, no rate promises, no "we'll definitely get you a mortgage" language. We flag any problematic claims in client-supplied copy before they go live on a regulated site.
            </p>
          </div>
          <div style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: '8px', marginBottom: '10px' }}>Data Privacy</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: '10px' }}>GDPR-Compliant Lead Capture</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
              Any lead capture form requires a privacy policy, explicit consent language, and compliant data handling. We build every form with the correct consent checkboxes, privacy policy links, and compliant copy. Your clients are responsible for their own GDPR compliance — but we make sure the forms we build don't create problems from the start.
            </p>
          </div>
          <div style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: '8px', marginBottom: '10px' }}>UK Law</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: '10px' }}>Cookie Consent & Accessibility</h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
              UK law requires a genuine cookie consent banner with real accept and reject options — not a fake banner that ignores user preference. We also build with accessibility in mind: good colour contrast, descriptive alt text, and keyboard-navigable forms. Financial services sites are increasingly expected to meet WCAG standards.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn-gold" onClick={openModal}>Talk through compliance on a call</button>
        </div>

        {/* The checklist download lives here, next to the compliance argument
            it belongs to, rather than as its own section fifteen sections
            further down. */}
        <div style={{ maxWidth: '640px', margin: '48px auto 0', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <FCAChecklistForm />
        </div>
      </section>

      {/* ── AGENCY COMPARISON ────────────────────────── */}
      <section className="section" id="why">
        <p className="section-label">The comparison</p>
        <h2 className="section-heading">
          What you actually get,<br />line by <em>line.</em>
        </h2>
        {/* Scrolls horizontally on narrow screens rather than squeezing three
            columns into 375px. */}
        <div className="agency-compare-scroll">
        <div className="agency-compare-table" role="table" aria-label="Senja Studio compared with a typical agency">
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', background: 'var(--royal)' }} role="row">
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', borderRight: '1px solid rgba(255,255,255,0.06)' }} role="columnheader"></div>
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', borderRight: '1px solid rgba(255,255,255,0.06)' }} role="columnheader">Typical Agency</div>
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-light)' }} role="columnheader">Senja Studio</div>
          </div>
          {[
            ['Price', '£3,000 – £8,000', 'From £1,500'],
            ['Delivery time', '6 – 12 weeks', '7 days standard'],
            ['Mortgage broker expertise', 'Generic agency', '100% specialist niche'],
            ['Compliance-ready copy', 'Extra cost, if at all', 'Included as standard'],
            ['Built to convert', 'Built to look good', 'Every decision = more calls'],
            ['Payment structure', 'Full payment upfront', '50% upfront, 50% on delivery'],
            ['Who builds your site', 'Junior passed your brief', 'Dan, personally, every build'],
            ['Regulatory authorisation statement', 'Left to you to figure out', 'Built in, checked before launch'],
            ['GDPR-compliant forms', 'Generic forms, no consent copy', 'Consent language built in'],
            ['Cookie consent banner', 'Fake banner or none at all', 'Real accept/reject, legally compliant'],
            ['Financial promotion copy review', 'Not their problem', 'We flag compliance risks before launch'],
            ['Lock-in contract', 'Long retainer required', 'You own everything. No lock-in.']
          ].map(([feature, bad, good], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', borderTop: '1px solid var(--border)', background: 'var(--surface)' }} role="row">
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: 'var(--ink)', fontWeight: 400, borderRight: '1px solid var(--border)', lineHeight: 1.5 }} role="cell">{feature}</div>
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: 'var(--negative)', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.5 }} role="cell"><span style={{ fontWeight: 700 }}>✕</span> {bad}</div>
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: 'var(--positive)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.5 }} role="cell"><span style={{ fontWeight: 700 }}>✓</span> {good}</div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ───────────────────────────── */}
      <ROICalculator />

      {/* ── SOCIAL TRUST ─────────────────────────────── */}
      <div className="social-trust">
        <div className="social-trust-inner">
          <div className="social-trust-text">
            A site is the one asset that works while you sleep. <em>It should earn its cost back in cases, not clicks.</em>
          </div>
          <div className="trust-badges">
            {[['7', 'Day delivery'], ['£1,500', 'Starting price'], ['50/50', 'Payment split'], ['0', 'Lock-in contracts']].map(([num, label]) => (
              <div key={label} className="trust-badge">
                <div className="trust-badge-num">{num}</div>
                <div className="trust-badge-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MEET DAN ─────────────────────────────────── */}
      <section className="meet-dan" id="about" style={{scrollMarginTop: '100px'}}>
        <div className="meet-dan-inner">
          <div className="meet-dan-img-wrap">
            <Image
              src="/images/dan-photo-about.png"
              alt="Dan Senja, founder of Senja Studio"
              width={1022}
              height={1280}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 35vw"
              className="meet-dan-img"
            />
            <div className="meet-dan-img-tag">Dan Senja · Founder</div>
          </div>
          <div className="meet-dan-content">
          <p className="section-label" style={{ color: 'var(--gold)' }}>The person building your site</p>
          <h2 className="meet-dan-heading">
            You're not hiring an agency.<br />You're working with <em>Dan.</em>
          </h2>
          <p>I'm Dan Senja — and I've built this entire agency around one niche. <strong>Independent mortgage brokers, worldwide, exclusively.</strong> Every site I've delivered has been built from scratch by me — not passed to a junior, not pulled from a template. When you work with Senja Studio, you work with the person who actually builds your site.</p>
          <p>Most agencies build sites for restaurants, gyms, and solicitors. I build for one type of business only. Which means I know exactly what your self-employed clients need to see before they pick up the phone. I know what FCA compliance looks like in practice. I know what layout converts a complex case enquiry at 11pm. <strong>That knowledge goes into every single build.</strong></p>
          <p>Agencies charge £5,000–£8,000 and take three months. I deliver better — <strong style={{ color: 'var(--gold-light)' }}>in 7 days, from £1,500.</strong> Not because I cut corners. Because I've built enough of these to know exactly what works, and I don't waste time on anything that doesn't.</p>
          <div className="meet-dan-stats">
            {/* Structural facts about how the studio works, not client counts.
                "6 sites delivered" was not true, and "96% mortgage brokers"
                contradicted the four places that say we build exclusively for
                brokers — 96% means 4% are something else. */}
            {[['100%', 'Mortgage brokers'], ['7 days', 'Standard delivery'], ['50/50', 'Payment split']].map(([num, label]) => (
              <div key={label} className="meet-dan-stat">
                <div className="meet-dan-stat-num">{num}</div>
                <div className="meet-dan-stat-label">{label}</div>
              </div>
            ))}
          </div>
          <button className="btn-gold" onClick={openModal} style={{ marginTop: '24px', padding: '19px 32px' }}>Book a call with Dan</button>
          </div>
        </div>
      </section>

      {/* ── FOUNDER VIDEO ────────────────────────────── */}
      {/* Directly under the bio: the bio makes the argument, the video puts a
          voice to it, and the testimonials below then let clients speak. Only
          renders once the file exists in /public/videos. */}
      {founderVideo && <FounderVideo video={founderVideo} openModal={openModal} />}

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section" id="testimonials">
        <p className="section-label">What brokers say</p>
        <h2 className="section-heading">What brokers say<br />after <em>launch.</em></h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="testi-card">
              <div className="testi-stars">{'★'.repeat(t.stars)}</div>
              <p className="testi-quote">"{t.quote}"</p>
              <div className="testi-name">{t.name}</div>
              <div className="testi-role">{t.role}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="section pricing scroll-reveal-text" id="pricing">
        <div className="section-gold-line" />
        <p className="section-label">Transparent pricing</p>
        <h2 className="section-heading">Three tiers. Fixed prices.<br /><em>No surprises.</em></h2>

        <div className="scroll-reveal" style={{ textAlign: 'left', background: 'var(--cream2)', borderLeft: '3px solid var(--gold)', maxWidth: '680px', margin: '0 auto 32px', padding: '14px 24px', fontSize: '0.78rem', color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>⏱ Important:</strong> The 7-day delivery applies to website builds only. AI add-ons are scoped and timed separately. All timelines confirmed in writing before work begins.
        </div>

        {/* Needs a real class: the mobile rules were written against
            `.pricing-grid`, which this markup never used, so on a phone the
            three cards stayed in a flex row squeezed into 375px — an enormously
            tall block with the grey container showing through the gaps. */}
        <div className="pricing-grid scroll-reveal-stagger">
          {[
            { title: 'Homepage Build', price: '£1,500', delivery: 'Delivered in 5 working days', featured: false, features: ['High-converting homepage only', 'Segmented CTAs — self-employed, FTB, complex', 'Google review integration', 'FCA statement and compliance copy', 'GDPR-compliant lead form + cookie consent', 'Mobile-first, fast-loading', '1 round of revisions', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
            { title: 'Full Website', price: '£2,500', delivery: 'Delivered in 7 working days', featured: true, badge: 'Most Popular', features: ['Homepage + About + Services + Contact', 'Segmented CTAs for each client type', 'Google review integration and social proof', 'Compliance-ready copy and regulatory badges', 'GDPR forms on every page + cookie consent', 'WhatsApp widget and booking integration', 'Mobile-first, fast-loading, SEO ready', '2 rounds of revisions included', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
            // A retainer, not a one-off — hence `per`. The note spells out what
            // the recurring half of the fee buys, because a £3,500 number sitting
            // next to two fixed build prices otherwise reads as a third build fee.
            { title: 'Website + Leads', price: '£3,500', per: '/month', delivery: 'Delivered in 7 working days, then monthly', note: 'Website built in first month. Leads delivered every month after.', dark: true, badge: 'Best Value', features: ['Everything in Full Website', '10 qualified mortgage appointments per month', 'Leads booked directly into your diary', 'Dedicated sending domain and outreach setup', 'Weekly performance report', 'No ads, no cold calling on your end', '2 rounds of revisions included', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
          ].map((card) => (
            <div key={card.title} className={`pricing-card${card.featured ? ' featured' : ''}${card.dark ? ' dark' : ''}`}>
              {card.badge && <div className="pricing-badge">{card.badge}</div>}
              <div className="pricing-title">{card.title}</div>
              <div className="pricing-price">
                {card.price}{card.per && <span className="pricing-per">{card.per}</span>}
              </div>
              {/* Colour lives in .pricing-delivery / .pricing-card.featured .pricing-delivery */}
              <div className="pricing-meta">
                <div className="pricing-delivery">{card.delivery}</div>
                {card.note && <p className="pricing-note">{card.note}</p>}
              </div>
              <ul className="pricing-features">
                {card.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className={card.featured || card.dark ? 'btn-gold' : 'btn-primary'} onClick={openModal} style={{ width: '100%' }}>
                Book a Free Call
              </button>
            </div>
          ))}
        </div>

        {/* ── LEAD GENERATION ─────────────────────────────
            Standalone offer for brokers who already have a site. It lives
            inside the pricing section, reusing .pricing-grid and the card
            classes, so it reads as a continuation of the same price list
            rather than a separate block bolted underneath. */}
        <div className="leadgen-block">
          <div className="section-gold-line" />
          <p className="section-label">Lead generation</p>
          <h2 className="section-heading">Just need <em>leads?</em></h2>
          <p className="leadgen-sub">
            We build outbound appointment systems for mortgage brokers — qualified buyers booked straight into your diary. No website required.
          </p>

          <div className="pricing-grid leadgen-grid scroll-reveal-stagger">
            {[
              { title: 'Starter Leads', price: '£1,500', per: '/month', features: ['10 booked mortgage appointments per month', 'Qualified buyers only (actively looking in next 90 days)', 'Dedicated sending domain set up for you', 'Leads booked directly into your Calendly', 'Weekly performance report', 'Cancel anytime after month 1'] },
              { title: 'Pay Per Appointment', price: '£175', per: 'per appointment', features: ['No monthly retainer', 'Pay only for appointments delivered', 'Qualified buyers only', 'Minimum 5 appointments to start', 'Booked directly into your diary', 'Best for brokers testing the service'] },
            ].map((card) => (
              <div key={card.title} className="pricing-card">
                <div className="pricing-title">{card.title}</div>
                <div className="pricing-price">
                  {card.price}<span className="pricing-per">{card.per}</span>
                </div>
                <ul className="pricing-features">
                  {card.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="btn-primary" onClick={openModal} style={{ width: '100%' }}>
                  Book a Free Call
                </button>
              </div>
            ))}
          </div>
        </div>

        <AvailabilityLine />

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
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
      </section>

      {/* AI add-ons moved to their own page — they are a separate business
          line and were taking 115 lines between pricing and process. */}
      <div style={{ background: 'var(--cream2)', padding: '48px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 20px' }}>
          Want the site to qualify leads, answer questions and book calls on its own?{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Six AI add-ons</strong> plug into any build.
        </p>
        <Link href="/ai-add-ons" className="btn-primary" style={{ textDecoration: 'none' }}>
          Explore AI add-ons
        </Link>
      </div>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section" id="process" style={{ background: 'var(--cream2)' }}>
        <div className="section-gold-line" />
        <p className="section-label">The process</p>
        <h2 className="section-heading">
          From first call to live site<br />in <em>seven days.</em>
        </h2>
        <div className="grid-3col" style={{ maxWidth: '1060px', margin: '0 auto' }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} style={{ // --surface, not --white: --white is a literal #FFFFFF for text on dark
              // panels and does not flip with the theme, so using it as a card
              // background left light text on a white card in dark mode.
              background: i === 5 ? 'var(--cream2)' : 'var(--surface)', padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', opacity: 0.2, marginBottom: '8px' }}>{step.num}</div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>{step.day}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn-primary" onClick={openModal}>Start with a free review</button>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section" id="faq">
        <p className="section-label">Common questions</p>
        <h2 className="section-heading">The questions brokers<br />actually <em>ask us.</em></h2>
        <div style={{ maxWidth: '740px', margin: '0 auto', border: '1px solid var(--border)' }}>
          {FAQS.map((item, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">
                {item.q}
              </summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────── */}
      <section className="section" id="blog" style={{ background: 'var(--cream2)' }}>
        <p className="section-label">From the journal</p>
        <h2 className="section-heading">What we’ve learned building<br />sites for <em>this one industry.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '1100px', margin: '0 auto 36px' }}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', background: 'var(--surface)', display: 'block' }}>
              <div style={{ background: 'var(--navy)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                {post.emoji}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span className="blog-tag">{post.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/blog" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
            View all 5 articles →
          </Link>
        </div>
      </section>

      {/* ── AI AUDIT ─────────────────────────────────── */}
      {/* There used to be four lead-capture sections stacked back to back here
          — guide, FCA checklist, audit and quiz. Four asks in a row dilute each
          other. The FCA checklist now sits inside the compliance section where
          it is contextually relevant, and the quiz has its own page. What is
          left is one tool and one download. */}
      <AuditSection />

      {/* ── LEAD MAGNET ──────────────────────────────── */}
      <LeadMagnetSection />

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="cta-final" id="cta">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="response-badge">
              <span className="response-dot" />
              Typically responds within 2 hours
            </span>
          </div>
          <p className="section-label" style={{ color: 'var(--gold-light)' }}>Ready to build?</p>
          <h2 className="cta-heading">
            Find out what your site is<br />costing you. <em>For free.</em>
          </h2>
          <p className="cta-sub">
            Thirty minutes, on a call with Dan. We pull up your current site, go through what's stopping enquiries, and show you what a properly built broker site does differently. You leave with a specific list of fixes whether or not you work with us.
          </p>
          <button className="btn-gold" onClick={openModal} style={{ marginBottom: '16px' }}>
            Book your free 30-minute review
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.68)', marginTop: '8px' }}>
            dan@senjastudio.co.uk · senjastudio.co.uk
          </p>
        </div>
      </section>
    </Layout>
  )
}

// ── FOUNDER VIDEO FILE LOOKUP (build time only) ───────────────
//
// Everything below runs on the server during `next build` and is stripped from
// the browser bundle along with the fs/path imports, because nothing outside
// getStaticProps references it.
//
// Expected files in /public/videos — only the .mp4 is required:
//   founder.mp4          the video itself, H.264 in an mp4 container
//   founder.webm         optional smaller alternative, served first if present
//   founder-poster.jpg   optional still frame shown before play (.png/.webp too)
//   founder.vtt          optional subtitles
//
// A .mov straight off a camera is deliberately not in that list. The codec
// inside is usually fine, but the QuickTime container is unreliable outside
// Safari, and camera files run an order of magnitude larger than anything that
// belongs in a git repo. Convert first — the warning below says so out loud
// rather than letting the section quietly fail to appear.
const VIDEO_DIR = path.join(process.cwd(), 'public', 'videos')

function findFounderVideo() {
  if (!fs.existsSync(VIDEO_DIR)) return null

  const pick = (names) => {
    const found = names.find((name) => fs.existsSync(path.join(VIDEO_DIR, name)))
    return found ? `/videos/${found}` : null
  }

  const mp4 = pick(['founder.mp4'])
  const webm = pick(['founder.webm'])

  if (!mp4 && !webm) {
    const strays = fs.readdirSync(VIDEO_DIR).filter((f) => /\.(mov|avi|mkv|m4v|wmv)$/i.test(f))
    if (strays.length) {
      console.warn(
        `\n⚠️  public/videos contains ${strays.join(', ')} but no founder.mp4 — ` +
        'the founder video section will not render. Convert to mp4 first.\n'
      )
    }
    return null
  }

  return {
    mp4,
    webm,
    poster: pick(['founder-poster.jpg', 'founder-poster.jpeg', 'founder-poster.png', 'founder-poster.webp']),
    captions: pick(['founder.vtt']),
    ...readMp4Dimensions(mp4),
  }
}

// Pulls the display width and height out of an mp4's track header, so the page
// can reserve the right shape before the browser has fetched a single byte of
// video. Returns {} for anything it can't read — the component falls back to
// 16:9 — so a file this doesn't understand degrades quietly rather than
// breaking the build.
function readMp4Dimensions(publicPath) {
  if (!publicPath) return {}

  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', publicPath.replace(/^\/+/, '')))

    // Walks the box tree looking for the first track header with a non-zero
    // size — audio tracks carry 0×0, so that lands on the video track.
    const findTkhd = (start, end) => {
      let offset = start
      while (offset + 8 <= end) {
        let size = buf.readUInt32BE(offset)
        const type = buf.toString('latin1', offset + 4, offset + 8)
        let header = 8
        if (size === 1) {
          // 64-bit size, stored immediately after the type.
          size = Number(buf.readBigUInt64BE(offset + 8))
          header = 16
        } else if (size === 0) {
          size = end - offset
        }
        if (size < header || offset + size > end) return null

        if (type === 'moov' || type === 'trak') {
          const found = findTkhd(offset + header, offset + size)
          if (found) return found
        } else if (type === 'tkhd') {
          const body = offset + header
          const version = buf[body]
          // Fixed-length fields between the version byte and the 3×3 display
          // matrix; the v1 header carries 64-bit timestamps, hence the offset.
          const matrix = body + 4 + (version === 1 ? 32 : 20) + 16
          const width = buf.readUInt32BE(matrix + 36) / 65536
          const height = buf.readUInt32BE(matrix + 40) / 65536
          if (width && height) {
            // The matrix records rotation. A quarter turn — which is what a
            // phone held upright writes — puts a=d=0, and the stored width and
            // height then describe the pre-rotation frame.
            const a = buf.readInt32BE(matrix)
            const d = buf.readInt32BE(matrix + 16)
            const rotated = a === 0 && d === 0
            return rotated
              ? { width: Math.round(height), height: Math.round(width) }
              : { width: Math.round(width), height: Math.round(height) }
          }
        }
        offset += size
      }
      return null
    }

    return findTkhd(0, buf.length) || {}
  } catch {
    return {}
  }
}

export async function getStaticProps() {
  return { props: { founderVideo: findFounderVideo() } }
}

// Client-only for the same reason as ActivityFeed — the page is static HTML.
function AvailabilityLine() {
  const nextSlot = useTimeBasedValue(getNextSlot, '')
  const slots = useTimeBasedValue(getSlots, 0)
  if (!nextSlot) return null

  return (
    <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: 'var(--muted)' }}>
      Next available build slot: <strong style={{ color: 'var(--burgundy)' }}>{nextSlot}</strong> &nbsp;·&nbsp;{' '}
      <strong style={{ color: 'var(--burgundy)' }}>{slots} slot{slots === 1 ? '' : 's'}</strong> remaining this month
    </div>
  )
}

function getNextSlot() {
  const now = new Date()
  const day = now.getDay()
  const daysToAdd = day === 5 ? 5 : day === 6 ? 4 : day === 0 ? 3 : 3
  const next = new Date(now)
  next.setDate(now.getDate() + daysToAdd)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${next.getDate()} ${months[next.getMonth()]}`
}
