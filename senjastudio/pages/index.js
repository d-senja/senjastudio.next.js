import { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import CardStackCarousel from '../components/CardStackCarousel'

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
  { title: 'Complex Case Specialists', body: "Self-employed clients, adverse credit, unusual income — these are your best clients and the hardest to reach. We build sites with segmented CTAs that speak directly to them so they self-identify and book rather than bounce." },
  { title: 'Brokers Running Ads', body: "Running Google or Facebook ads to a generic site is burning money. Every £1 you spend on traffic needs a site that converts it. A properly built mortgage broker landing page can double or triple your return on ad spend." },
]

const OFFER_ITEMS = [
  { num: '01', title: 'Conversion-First Layout', body: 'Every element positioned to move visitors toward a booking. Not aesthetic — functional. Built around how mortgage clients actually behave on mobile.' },
  { num: '02', title: 'Segmented CTAs for Every Client Type', body: 'Self-employed, first-time buyer, adverse credit — separate pathways for each so every visitor feels directly spoken to. The single biggest lever for more enquiries.' },
  { num: '03', title: 'Google Reviews Positioned to Close', body: 'Your star rating and best client quote in the hero — before anyone scrolls. Social proof at the exact moment visitors decide whether to trust you.' },
  { num: '04', title: 'FCA Compliance Throughout', body: 'Authorisation statement, regulatory badges, compliant copy. We check every financial promotion claim before the site goes live. You deal with us directly — not a junior following a checklist.' },
  { num: '05', title: 'WhatsApp, Calendly & Booking Integration', body: 'Direct WhatsApp widget, Calendly booking flow, and click-to-call — every possible way a motivated lead can reach you, built in and working from day one.' },
  { num: '06', title: 'Mobile-First & Fast', body: 'Over 60% of mortgage searches happen on mobile. Your site loads fast, looks sharp, and converts on every device — phone, tablet, desktop.' },
  { num: '07', title: 'Lender Panel Credibility Block', body: "A \"whole of market access to 90+ lenders\" trust signal — because the breadth of your panel is one of the biggest reasons clients choose an independent broker over a bank." },
  { num: '08', title: '48-Hour DIP Promise Display', body: 'Decision in Principle timelines matter to buyers who are under pressure. If you offer a fast DIP, we make that a visible selling point.' },
]

const PROCESS_STEPS = [
  { num: '01', day: 'Day 0', title: 'Free 30-min call', body: "I pull up your site and tell you exactly what's costing you leads — specific problems, specific fixes. No pitch deck, no generic advice. If I can't show you something useful in 30 minutes, you've lost nothing." },
  { num: '02', day: 'Day 0', title: 'Invoice & brief', body: "50% invoice sent. Once paid, you receive a short project brief — your brand, your clients, your positioning. Takes around 30 minutes to fill in properly. That's all we need to get started." },
  { num: '03', day: 'Days 1–5', title: 'The build', body: "I build your site from scratch — conversion-first layout, segmented CTAs for every client type, your Google reviews positioned to close leads, FCA compliance throughout. You send me the brief. I handle everything else." },
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
  { q: "What do you actually build — is it just a homepage?", a: "We offer three tiers. The Homepage Build is one high-converting page — where 90% of visitor decisions happen anyway. The Full Website adds About, Services, and Contact pages. The Bespoke tier covers custom multi-page architectures." },
  { q: "What if I don't like the design?", a: "Every build includes 2 rounds of revisions. Before we start, we send you a project brief covering your brand colours, positioning, and preferences. Revisions are included — additional rounds beyond the two are billed at £75/hour." },
  { q: "Do I need to provide content, copy, or photos?", a: "No. We write all the copy, structure the page, and work with whatever brand assets you have. If you have a headshot, great. If not, we work with what's available. Everything you need to provide is covered in the project brief." },
  { q: "What's the Care Plan and what does it include?", a: "The Care Plan at £150/month comes with every build — your first month is free. It covers up to 2 hours of changes per month — adding new Google reviews, updating rates, refreshing copy, small design tweaks. Work beyond 2 hours is billed at £75/hour, agreed in advance." },
  { q: 'Will I own the website?', a: "Yes. You own everything — the code, the content, the files. There's no platform lock-in. If you ever want to move the site elsewhere, take it. Everything is yours." },
  { q: 'How is this different from using Wix or Squarespace?', a: "Wix and Squarespace are generic tools built for every business. Senja Studio builds specifically for mortgage brokers — with segmented CTAs, FCA compliance, conversion-first layouts, and copy that speaks directly to your client types. The result converts at a fundamentally different rate." },
]

const ADDONS = [
  { tag: 'Most Popular', title: 'AI Lead Capture Chatbot', body: "An AI assistant that qualifies mortgage leads 24/7 — asking the right questions, capturing contact details, and booking calls while you sleep.", price: '£800', monthly: 'Included in Care Plan' },
  { tag: 'Add-on', title: 'AI Customer Support Agent', body: "An AI that handles common mortgage questions from existing and prospective clients around the clock.", price: '£1,200', monthly: '+ £100/month' },
  { tag: 'Add-on', title: 'AI Appointment Setting Agent', body: "An AI that follows up with leads who didn't book, reactivates cold contacts, and fills your calendar.", price: '£1,000', monthly: '+ £100/month' },
  { tag: 'Add-on', title: 'Automated AI Outreach System', body: "A fully automated outreach pipeline that scrapes leads, generates personalised emails, and sends them on autopilot.", price: '£1,500', monthly: '+ £150/month' },
  { tag: 'Add-on', title: 'AI Inbound Phone Caller', body: "An AI voice agent that answers your business calls when you're unavailable — qualifying the enquiry, capturing details, and booking a callback.", price: '£1,500', monthly: '+ £120/month' },
  { tag: 'Add-on', title: 'AI Outbound Phone Caller', body: "An AI voice agent that proactively calls leads from your pipeline — following up on enquiries and booking appointments.", price: '£2,000', monthly: '+ £150/month' },
]

const BLOG_POSTS = [
  { slug: 'why-mortgage-broker-websites-fail-to-convert', title: 'Why Most Mortgage Broker Websites Fail to Convert', excerpt: "Most broker sites have the same three problems. Here's what they are — and exactly how to fix them.", tag: 'Conversion', date: 'July 2025', emoji: '📉' },
  { slug: 'fca-compliant-mortgage-broker-website', title: 'FCA Compliant Mortgage Broker Website: What You Actually Need', excerpt: "The FCA rules that apply to your website — and the simple ways most broker sites get them wrong.", tag: 'FCA Compliance', date: 'July 2025', emoji: '🏛️' },
  { slug: 'how-much-does-a-mortgage-broker-website-cost', title: 'How Much Does a Mortgage Broker Website Cost UK?', excerpt: "Agencies quote £3k–£8k. Freelancers quote £500. Here's what you get at each price point.", tag: 'Pricing', date: 'July 2025', emoji: '💷' },
]

// ── COMPONENTS ────────────────────────────────────────────────

function Typewriter() {
  const phrases = ['booked calls.', 'qualified leads.', 'paying clients.', 'your best work.']
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[idx]

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false)
        setIdx((prev) => (prev + 1) % phrases.length)
      } else {
        const timeout = setTimeout(() => {
          setText(text.substring(0, text.length - 1))
        }, 50)
        return () => clearTimeout(timeout)
      }
    } else {
      if (text === currentPhrase) {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 1500)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      }
    }
  }, [text, isDeleting, idx, phrases])

  return (
    <em style={{ color: 'var(--gold)', position: 'relative' }}>
      {text}
      <span className="typewriter-cursor"></span>
    </em>
  )
}

function LiveRates() {
  const base = { r2yr: 4.21, r5yr: 4.08, rtrack: 5.19 }
  const [rates, setRates] = useState(base)
  const [updated, setUpdated] = useState(0)

  useEffect(() => {
    const jitter = (n) => +(n + (Math.random() - 0.5) * 0.06).toFixed(2)
    const interval = setInterval(() => {
      setRates({ r2yr: jitter(base.r2yr), r5yr: jitter(base.r5yr), rtrack: jitter(base.rtrack) })
      setUpdated(0)
    }, 8000)
    const ticker = setInterval(() => setUpdated(s => s + 1), 1000)
    return () => { clearInterval(interval); clearInterval(ticker) }
  }, [])

  const timeStr = updated < 60 ? `Updated ${updated}s ago` : `Updated ${Math.floor(updated / 60)}m ago`

  return (
    <div className="live-bar">
      <div className="live-bar-inner">
        <div className="live-rates">
          <span className="live-dot" />
          <span className="live-label">Live UK Mortgage Rates</span>
          <span className="live-rate-item">2yr Fixed <strong>{rates.r2yr}%</strong></span>
          <span className="live-rate-item">5yr Fixed <strong>{rates.r5yr}%</strong></span>
          <span className="live-rate-item">Tracker <strong>{rates.rtrack}%</strong></span>
          <span className="live-updated">{timeStr}</span>
        </div>
        <div className="live-availability">
          <span>📅</span>
          <span>Currently booking builds for <strong style={{ color: 'var(--burgundy)' }}>{getMonth()}</strong></span>
          <span className="live-slots">— <strong style={{ color: 'var(--burgundy)' }}>{getSlots()} slot{getSlots() === 1 ? '' : 's'}</strong> remaining</span>
        </div>
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

function ActivityFeed() {
  const activities = [
    { icon: '▪', text: 'Currently building a broker site for a new client' },
    { icon: '▸', text: 'Writing conversion copy for a homepage build' },
    { icon: '◆', text: 'Following up with brokers who booked calls this week' },
    { icon: '▴', text: 'Designing a segmented CTA layout for a broker' },
    { icon: '▸', text: 'Preparing a finished site for launch' },
    { icon: '◆', text: 'Setting up an AI lead capture chatbot for a client' },
    { icon: '▴', text: 'Reviewing analytics for a recently launched site' },
    { icon: '▸', text: 'Optimising mobile speed on a live broker site' },
  ]

  const d = new Date()
  const blockIdx = Math.floor((d.getHours() * 60 + d.getMinutes()) / 180) % activities.length
  const activity = activities[blockIdx]

  return (
    <div className="activity-feed-wrap">
      <div className="activity-live-dot" />
      <div className="activity-feed">
        <span className="activity-icon">{activity.icon}</span>
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
      {[['Homepage', '£1,500'], ['Full Site', '£2,500'], ['Bespoke', 'From £3,500']].map(([label, price]) => (
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

      if (res.ok && data.audit) {
        setResult(data.audit)
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
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 500, color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
            Get an instant conversion audit<br />of <em style={{ color: 'var(--gold)' }}>your broker site</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}>
            Enter your website URL and our AI will analyze your homepage for the 5 biggest conversion issues — CTA clarity, trust signals, FCA compliance, mobile UX, and more. <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>2 free audits per day.</strong>
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
                  background: 'var(--white)',
                  color: 'var(--navy)',
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
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '8px' }}>✓ Audit Complete</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '4px' }}>Your Website Audit Results</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{url}</p>
              </div>
              <button
                onClick={() => { setResult(null); setUrl(''); setError('') }}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
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
              color: 'var(--navy)',
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
                Book a Free 30-Minute Call with Dan
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── WEBSITE SCORE QUIZ ────────────────────────────────────────
function WebsiteScoreQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      id: 'reviews',
      text: 'Do you have Google reviews visible above the fold on your homepage?',
      explanation: 'Social proof in the hero section builds immediate trust'
    },
    {
      id: 'booking',
      text: 'Do you have a Calendly or direct booking link on your site?',
      explanation: 'Direct booking removes friction and increases conversion'
    },
    {
      id: 'fca',
      text: 'Is your FCA number visible in the navigation or hero section?',
      explanation: 'Regulatory compliance signals professionalism and trust'
    },
    {
      id: 'segmented',
      text: 'Do you have separate CTAs for self-employed clients and first-time buyers?',
      explanation: 'Segmented CTAs convert 2-3x better than generic ones'
    },
    {
      id: 'speed',
      text: 'Does your site load in under 3 seconds on mobile?',
      explanation: 'Every second of delay costs you 7% of conversions'
    }
  ]

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(a => a === true).length
    return Math.round((yesCount / questions.length) * 100)
  }

  const getOutcome = (score) => {
    if (score <= 40) {
      return {
        title: 'Your site needs urgent attention',
        description: 'You\'re missing critical conversion elements that are costing you enquiries every single week. Most of these fixes take under an hour once you know what to look for.',
        color: '#c53030',
        pdfUrl: '/downloads/score-report-low.pdf',
        pdfLabel: 'Download Your Full Report (0-40%)'
      }
    } else if (score <= 70) {
      return {
        title: 'Your site has real gaps',
        description: 'You\'re doing some things right, but there are clear opportunities being left on the table. Fixing these gaps could double your conversion rate within a month.',
        color: '#d69e2e',
        pdfUrl: '/downloads/score-report-mid.pdf',
        pdfLabel: 'Download Your Full Report (41-70%)'
      }
    } else {
      return {
        title: 'You\'re close — let\'s close the gap',
        description: 'Your site is already doing most things right. The remaining 1-2 changes could be the difference between a good conversion rate and an exceptional one.',
        color: 'var(--gold)',
        pdfUrl: '/downloads/score-report-high.pdf',
        pdfLabel: 'Download Your Full Report (71-100%)'
      }
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  if (showResult) {
    const score = calculateScore()
    const outcome = getOutcome(score)

    return (
      <section className="section" id="website-quiz" style={{ background: 'var(--navy)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              width: '140px',
              height: '140px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              border: `8px solid ${outcome.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: '3rem',
                fontWeight: 700,
                color: 'var(--white)'
              }}>
                {score}%
              </div>
            </div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.8rem,4vw,2.5rem)',
              fontWeight: 600,
              color: 'var(--white)',
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              {outcome.title}
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              marginBottom: '32px'
            }}>
              {outcome.description}
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Your Answers:
            </div>
            {questions.map((q, i) => (
              <div key={q.id} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: i < questions.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {answers[q.id] ? '✓' : '✗'}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6
                }}>
                  {q.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <a
              href={outcome.pdfUrl}
              download
              className="btn-gold"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              {outcome.pdfLabel} →
            </a>
            <button
              onClick={reset}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.6)',
                padding: '12px 24px',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = 'var(--gold)'
                e.target.style.color = 'var(--gold)'
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                e.target.style.color = 'rgba(255,255,255,0.6)'
              }}
            >
              ← Retake Quiz
            </button>
          </div>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '32px',
            lineHeight: 1.7
          }}>
            Want us to audit your actual site and tell you exactly what to fix?{' '}
            <button
              onClick={() => document.dispatchEvent(new Event('openModal'))}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gold)',
                textDecoration: 'underline',
                cursor: 'pointer',
                font: 'inherit',
                padding: 0
              }}
            >
              Book a free call
            </button>.
          </p>
        </div>
      </section>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <section className="section" id="website-quiz" style={{ background: 'var(--navy)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--gold)', fontWeight: 300 }}>◆</div>
          <p className="section-label" style={{ color: 'var(--gold-light)' }}>5-Question Website Score</p>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.5rem,3.5vw,2.2rem)',
            fontWeight: 500,
            color: 'var(--white)',
            marginBottom: '16px',
            lineHeight: 1.25,
            letterSpacing: '-0.01em'
          }}>
            How does your broker site<br /><em style={{ color: 'var(--gold-light)' }}>stack up?</em>
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8
          }}>
            Answer 5 quick yes/no questions about your current website and get an instant score with a personalized action plan.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--gold)',
            transition: 'width 0.3s ease',
            borderRadius: '2px'
          }} />
        </div>

        {/* Question Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '40px 32px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--gold-light)',
            marginBottom: '16px',
            fontWeight: 500
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.4rem',
            fontWeight: 500,
            color: '#FFFFFF',
            marginBottom: '12px',
            lineHeight: 1.4
          }}>
            {question.text}
          </h3>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '32px',
            lineHeight: 1.7
          }}>
            {question.explanation}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => handleAnswer(true)}
              style={{
                flex: '1',
                maxWidth: '200px',
                padding: '18px 32px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--navy)',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              ✓ Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              style={{
                flex: '1',
                maxWidth: '200px',
                padding: '18px 32px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--white)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.15)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              ✗ No
            </button>
          </div>
        </div>

        {currentQuestion > 0 && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '8px 16px',
                fontWeight: 500
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--gold)'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              ← Back
            </button>
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
        <div style={{ background: 'var(--white)', padding: '40px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--gold)' }}>☆</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--navy)' }}>Your Numbers</span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Average proc fee per case</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--navy)' }}>£{fee}</span>
            </div>
            <input type="range" min="300" max="2000" step="50" value={fee} onChange={(e) => setFee(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Extra cases this site generates / month</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--navy)' }}>{cases}</span>
            </div>
            <input type="range" min="1" max="10" step="1" value={cases} onChange={(e) => setCases(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Website enquiry → case conversion rate</label>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--navy)' }}>{convRate}%</span>
            </div>
            <input type="range" min="10" max="80" step="5" value={convRate} onChange={(e) => setConvRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--navy)', cursor: 'pointer' }} />
          </div>
        </div>

        {/* RESULTS */}
        <div style={{ background: 'var(--cream)', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ background: 'var(--white)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Extra revenue — Month 1</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--navy)', lineHeight: 1 }}>£{month1.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>From cases that wouldn't have found you without this site</div>
          </div>
          <div style={{ background: 'var(--white)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Extra revenue — Year 1</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--navy)', lineHeight: 1 }}>£{year1.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>Compounding as your Google visibility grows over time</div>
          </div>
          <div style={{ background: 'var(--white)', borderLeft: '3px solid var(--gold)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Cases needed to cover the site cost</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{payback}{payback === 3 ? '–4' : payback === 2 ? '–3' : ''}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>At your proc fee — typically achieved in the first few weeks</div>
          </div>
          <div style={{ background: 'var(--white)', padding: '24px 28px', flex: 1 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Enquiries needed to get your first case</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--navy)', lineHeight: 1 }}>{enquiries}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px' }}>At your current conversion rate</div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA BAR */}
      <div style={{ maxWidth: '940px', margin: '1px auto 0', background: 'var(--navy)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: 'var(--white)' }}>Your site is live in 7 days.</strong> A single well-placed case more than justifies the investment. Ready to see what's possible?
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new Event('openModal'))} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          Book a free call with Dan →
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
        // Trigger download
        if (data.downloadUrl) {
          window.location.href = data.downloadUrl
        }
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
      <section className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gold)', fontWeight: 300 }}>◆</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 500, color: 'var(--white)', marginBottom: '12px', lineHeight: 1.3 }}>
            Check your inbox
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            Your free guide is on its way. If you don't see it in the next few minutes, check your spam folder.
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
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
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
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '6px', lineHeight: 1.4 }}>
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

          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '12px', lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime. Read our <Link href="/privacy-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>privacy policy</Link>.
          </p>
        </form>
      </div>
    </section>
  )
}

// ── FCA CHECKLIST LEAD MAGNET ─────────────────────────────────
function FCAChecklistSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
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
        body: JSON.stringify({ email, name, source: 'fca-checklist', pdf: 'fca-compliance-checklist.pdf' })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        if (data.downloadUrl) {
          window.location.href = data.downloadUrl
        }
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
      <section className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gold)', fontWeight: 300 }}>◆</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 500, color: 'var(--white)', marginBottom: '12px', lineHeight: 1.3 }}>
            Check your inbox
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            Your FCA compliance checklist is on its way. If you don't see it in the next few minutes, check your spam folder.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section" style={{ background: 'var(--navy)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📋</div>
        <p className="section-label" style={{ color: 'var(--gold-light)' }}>FREE CHECKLIST</p>
        <h2 className="lead-magnet-heading" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
          Is Your Broker Site <em style={{ color: 'var(--gold-light)' }}>FCA Compliant?</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
          The exact requirements every regulated mortgage broker site must meet — and how to check yours in 10 minutes.
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

          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '12px', lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime. Read our <Link href="/privacy-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>privacy policy</Link>.
          </p>
        </form>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = (e) => { if (e) e.preventDefault(); setModalOpen(true) }

  return (
    <Layout
      title={null}
      description="Senja Studio builds conversion-first, FCA-compliant mortgage broker websites exclusively for independent brokers worldwide. Delivered in 7 days from £2,500."
      canonical="/"
      modalOpen={modalOpen}
      onModalClose={() => setModalOpen(false)}
    >
      <StickyCompare openModal={openModal} />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-section" id="home">
        <div className="hero-left">
          <div className="hero-tag">Mortgage Broker Website Design</div>

          <ActivityFeed />

          <h1 className="hero-headline" id="hero-heading">
            The mortgage broker website <br />that turns visitors into <Typewriter />
          </h1>

          <p className="hero-sub">
            <strong>Senja Studio builds mortgage broker websites that win clients.</strong> Not templates. Not generic agency work. Conversion-first sites built exclusively for independent brokers — with segmented CTAs, FCA compliance, and social proof positioned to do one thing: fill your calendar. Delivered in 7 days from £2,500.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={openModal}>Book Your Free Call</button>
            <a href="/examples" className="btn-ghost">See Our Work →</a>
          </div>

          <div className="hero-trust">
            <div className="hero-stars">★★★★★</div>
            <div>
              <div className="hero-trust-bold">FCA compliant. Mobile-first. Built to convert.</div>
              <div className="hero-trust-sub">Delivered in 7 days — not 7 weeks.</div>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <img
            id="heroParallax"
            src="/images/dan-photo.png"
            alt="Dan Senja — founder of Senja Studio, mortgage broker website design specialist"
            loading="eager"
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
          <div className="trust-marquee-inner">
            {['Compliance-Ready — every build','50/50 Payment — no lock-in','Free 30-Min Audit — no commitment','Mortgage Brokers Only — worldwide','7-Day Delivery — standard build','From £2,500 — fraction of agency cost'].map((t, i) => (
              <div key={i} className="trust-strip-item">
                <span className="trust-strip-icon">✦</span>
                <span>{t.split(' — ')[0]}<span style={{opacity:0.4}}> — </span>{t.split(' — ')[1]}</span>
              </div>
            ))}
            {['Compliance-Ready — every build','50/50 Payment — no lock-in','Free 30-Min Audit — no commitment','Mortgage Brokers Only — worldwide','7-Day Delivery — standard build','From £2,500 — fraction of agency cost'].map((t, i) => (
              <div key={`b${i}`} className="trust-strip-item">
                <span className="trust-strip-icon">✦</span>
                <span>{t.split(' — ')[0]}<span style={{opacity:0.4}}> — </span>{t.split(' — ')[1]}</span>
              </div>
            ))}
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
        <p className="section-label">Why we build exclusively for mortgage brokers</p>
        <h2 className="section-heading" id="niche-heading">
          The most effective mortgage broker website design <br />comes from <em>deep specialism.</em>
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
        <p className="section-label">Built specifically for brokers like you.</p>
        <h2 className="section-heading" id="who-heading">
          Is this the right fit<br />for <em>your firm?</em>
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
      <section className="section scroll-reveal-text" id="offer" style={{ background: 'var(--navy)', backgroundColor: 'var(--navy)' }}>
        <p className="section-label" style={{ color: 'var(--gold-light)' }}>What's included</p>
        <h2 className="section-heading" id="offer-heading" style={{ color: '#FFFFFF', color: 'white' }}>
          Everything your site needs to <em style={{ color: 'var(--gold-light)' }}>win clients.</em>
        </h2>
        <CardStackCarousel items={OFFER_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-gold" onClick={openModal}>See What We'd Build for You</button>
        </div>
      </section>

      {/* ── FCA COMPLIANCE ───────────────────────────── */}
      <section className="section scroll-reveal-text" id="compliance" style={{ background: 'var(--navy)' }}>
        <p className="section-label" style={{ color: 'var(--gold-light)' }}>Regulatory compliance — built in, not bolted on</p>
        <h2 className="section-heading" style={{ color: 'var(--white)' }}>
          Most agencies hand you a site<br />and leave you to <em style={{ color: 'var(--gold-light)' }}>figure out compliance yourself.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto 56px', lineHeight: 1.85 }}>
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
          <button className="btn-gold" onClick={openModal}>Book a Free Call — See the Compliance Checklist</button>
        </div>
      </section>

      {/* ── BROKER-SPECIFIC FEATURES ────────────────────── */}
      <section className="section scroll-reveal-text" id="broker-features" style={{ background: 'var(--white)' }}>
        <p className="section-label">Built for mortgage brokers specifically</p>
        <h2 className="section-heading">
          Things a generic agency<br />would never think to <em>include.</em>
        </h2>
        <div className="scroll-reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">Live Mortgage Rate Display</h3>
            <p className="offer-body">A live rate ticker showing 2-year fixed, 5-year fixed, and tracker rates — updated regularly. Visitors see real numbers immediately, not a static page. Generic agencies would never think to include this. We build it in as standard.</p>
          </div>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">Lender Panel Credibility Block</h3>
            <p className="offer-body">A "whole of market access to 90+ lenders" trust signal — because the breadth of your panel is one of the biggest reasons clients choose an independent broker over a bank. We make this visible and prominent, not buried in the footer.</p>
          </div>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">48-Hour DIP Promise Display</h3>
            <p className="offer-body">Decision in Principle timelines matter to buyers who are under pressure. If you offer a fast DIP, we make that a visible selling point — not just a line in a paragraph, but a stat that stands out in your credentials bar.</p>
          </div>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">Complex Case Positioning</h3>
            <p className="offer-body">Most brokers want more self-employed and complex case clients — but their websites speak only to first-time buyers. We segment the copy and CTAs so complex case clients see themselves specifically addressed and feel confident enough to book.</p>
          </div>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">£0 Broker Fee Prominence</h3>
            <p className="offer-body">If you charge no broker fee, that's one of your biggest conversion advantages — and most broker sites bury it. We put it in your stats grid, your hero section, and your CTA copy so visitors see it before they even think about going elsewhere.</p>
          </div>
          <div className="offer-item">
            <div className="offer-num">→</div>
            <h3 className="offer-title">Google Reviews Done Properly</h3>
            <p className="offer-body">Most broker sites either don't show reviews at all or dump them in a row at the bottom. We surface your best review prominently in the hero, use your star rating and count as trust signals in multiple places, and make the social proof work for you throughout the page.</p>
          </div>
        </div>
      </section>

      {/* ── AGENCY COMPARISON ────────────────────────── */}
      <section className="section" id="why">
        <p className="section-label">Why Senja Studio</p>
        <h2 className="section-heading">
          What you actually get vs<br /><em>a typical agency.</em>
        </h2>
        <div style={{ maxWidth: '860px', margin: '0 auto', border: '1px solid var(--border)', overflow: 'hidden' }} role="table" aria-label="Senja Studio vs typical agency comparison">
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', background: 'var(--royal)' }} role="row">
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderRight: '1px solid rgba(255,255,255,0.06)' }} role="columnheader"></div>
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderRight: '1px solid rgba(255,255,255,0.06)' }} role="columnheader">Typical Agency</div>
            <div style={{ padding: '16px 20px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-light)' }} role="columnheader">Senja Studio</div>
          </div>
          {[
            ['Price', '£3,000 – £8,000', 'From £2,500'],
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
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', borderTop: '1px solid var(--border)', background: 'var(--white)' }} role="row">
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 400, borderRight: '1px solid var(--border)', lineHeight: 1.5 }} role="cell">{feature}</div>
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: '#C0392B', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.5 }} role="cell"><span style={{ fontWeight: 700 }}>✕</span> {bad}</div>
              <div style={{ padding: '14px 20px', fontSize: '0.78rem', color: '#1E7D4A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.5 }} role="cell"><span style={{ fontWeight: 700 }}>✓</span> {good}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROI CALCULATOR ───────────────────────────── */}
      <ROICalculator />

      {/* ── SOCIAL TRUST ─────────────────────────────── */}
      <div className="social-trust">
        <div className="social-trust-inner">
          <div className="social-trust-text">
            One extra completion pays for this build. <em>Most brokers recoup within 3 weeks.</em> Every month after that is pure revenue your old site was leaving on the table.
          </div>
          <div className="trust-badges">
            {[['7', 'Day delivery'], ['£2,500', 'Starting price'], ['50/50', 'Payment split'], ['0', 'Lock-in contracts']].map(([num, label]) => (
              <div key={label} className="trust-badge">
                <div className="trust-badge-num">{num}</div>
                <div className="trust-badge-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MEET DAN ─────────────────────────────────── */}
      <section className="meet-dan" id="about">
        <div className="meet-dan-inner">
          <div className="meet-dan-img-wrap">
            <img src="/images/dan-photo-about.png" alt="Dan Senja — founder of Senja Studio" className="meet-dan-img" loading="lazy" />
            <div className="meet-dan-img-tag">Dan Senja · Founder</div>
          </div>
          <div className="meet-dan-content">
          <p className="section-label" style={{ color: 'var(--gold)' }}>The person building your site</p>
          <h2 className="meet-dan-heading">
            You're not hiring an agency.<br />You're working with <em>Dan.</em>
          </h2>
          <p>I'm Dan Senja — and I've built this entire agency around one niche. <strong>Independent mortgage brokers, worldwide, exclusively.</strong> Every site I've delivered has been built from scratch by me — not passed to a junior, not pulled from a template. When you work with Senja Studio, you work with the person who actually builds your site.</p>
          <p>Most agencies build sites for restaurants, gyms, and solicitors. I build for one type of business only. Which means I know exactly what your self-employed clients need to see before they pick up the phone. I know what FCA compliance looks like in practice. I know what layout converts a complex case enquiry at 11pm. <strong>That knowledge goes into every single build.</strong></p>
          <p>Agencies charge £5,000–£8,000 and take three months. I deliver better — <strong style={{ color: 'var(--gold-light)' }}>in 7 days, from £2,500.</strong> Not because I cut corners. Because I've built enough of these to know exactly what works, and I don't waste time on anything that doesn't.</p>
          <div className="meet-dan-stats">
            {[['6', 'Sites delivered'], ['96%', 'Mortgage brokers'], ['50/50', 'Payment split']].map(([num, label]) => (
              <div key={label} className="meet-dan-stat">
                <div className="meet-dan-stat-num">{num}</div>
                <div className="meet-dan-stat-label">{label}</div>
              </div>
            ))}
          </div>
          <button className="btn-gold" onClick={openModal} style={{ marginTop: '24px', padding: '19px 32px' }}>Book a Free Call with Dan</button>
          </div>
        </div>
      </section>

      {/* ── FOUNDER VIDEO ────────────────────────────── */}
      <section className="section" id="founder-video" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'var(--gold)' }}>From The Founder</p>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 500,
          color: 'var(--white)',
          marginBottom: '48px',
          lineHeight: 1.3,
          maxWidth: '800px',
          margin: '0 auto 48px'
        }}>
          Why I built Senja Studio exclusively for mortgage brokers.
        </h2>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto 40px',
          position: 'relative',
          aspectRatio: '16 / 9',
          background: 'var(--royal)',
          border: '2px solid var(--gold)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
        aria-label="Video placeholder - coming soon"
        >
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'var(--gold)'
          }}
          aria-hidden="true"
          >
            ▶
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '400px',
            lineHeight: 1.7
          }}>
            Video coming soon — in the meantime, book a free call below.
          </p>
        </div>

        <a
          href="https://calendly.com/senjastudio/30min"
          className="btn-gold"
          style={{
            textDecoration: 'none',
            display: 'inline-block'
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          BOOK YOUR FREE CALL →
        </a>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="section" id="testimonials">
        <p className="section-label">What brokers say</p>
        <h2 className="section-heading">The results speak<br />for <em>themselves.</em></h2>
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
        <h2 className="section-heading">No hidden fees. No surprises.<br /><em>Just results.</em></h2>

        <div className="scroll-reveal" style={{ textAlign: 'left', background: 'var(--cream2)', borderLeft: '3px solid var(--gold)', maxWidth: '680px', margin: '0 auto 32px', padding: '14px 24px', fontSize: '0.78rem', color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--navy)' }}>⏱ Important:</strong> The 7-day delivery applies to website builds only. AI add-ons are scoped and timed separately. All timelines confirmed in writing before work begins.
        </div>

        <div className="scroll-reveal-stagger" style={{ display: 'flex', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '1060px', margin: '0 auto' }}>
          {[
            { title: 'Homepage Build', price: '£1,500', delivery: 'Delivered in 5 working days', featured: false, features: ['High-converting homepage only', 'Segmented CTAs — self-employed, FTB, complex', 'Google review integration', 'FCA statement and compliance copy', 'GDPR-compliant lead form + cookie consent', 'Mobile-first, fast-loading', '1 round of revisions', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
            { title: 'Full Website', price: '£2,500', delivery: 'Delivered in 7 working days', featured: true, features: ['Homepage + About + Services + Contact', 'Segmented CTAs for each client type', 'Google review integration and social proof', 'Compliance-ready copy and regulatory badges', 'GDPR forms on every page + cookie consent', 'WhatsApp widget and booking integration', 'Mobile-first, fast-loading, SEO ready', '2 rounds of revisions included', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
            { title: 'Bespoke Build', price: 'From £3,500', delivery: 'Timeline agreed per project', featured: false, features: ['Everything in Full Website', 'Custom multi-page architecture', 'Any AI add-ons from our suite', 'Mortgage calculator or rate comparison tool', 'Advanced analytics and conversion tracking', '2 rounds of revisions included', '50% upfront (non-refundable) · 50% on delivery', 'Care Plan — first month free, then £150/mo'] },
          ].map((card) => (
            <div key={card.title} className={`pricing-card${card.featured ? ' featured' : ''}`}>
              {card.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-title">{card.title}</div>
              <div className="pricing-price">{card.price}</div>
              <div className="pricing-delivery" style={card.featured ? { color: 'rgba(255,255,255,0.75)' } : {}}>{card.delivery}</div>
              <ul className="pricing-features">
                {card.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className={card.featured ? 'btn-gold' : 'btn-primary'} onClick={openModal} style={{ width: '100%' }}>
                Book a Free Call
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.8rem', color: 'var(--muted)' }}>
          Next available build slot: <strong style={{ color: 'var(--burgundy)' }}>{getNextSlot()}</strong> &nbsp;·&nbsp; <strong style={{ color: 'var(--burgundy)' }}>{getSlots()} slot{getSlots() === 1 ? '' : 's'}</strong> remaining this month
        </div>

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

      {/* ── AI ADD-ONS ───────────────────────────────── */}
      <section className="section upsells" id="addons">
        <p className="section-label">AI-powered add-ons</p>
        <h2 className="section-heading">Supercharge your site with<br /><em>AI automation.</em></h2>
        <div className="grid-3col" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {ADDONS.map((addon, i) => (
            <div key={i} className="upsell-card">
              <div className="upsell-icon css-diamond"></div>
              <div className="upsell-tag">{addon.tag}</div>
              <div className="upsell-title">{addon.title}</div>
              <div className="upsell-sub">{addon.body}</div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)' }}>
                  {addon.price} <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--sans)' }}>setup</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>{addon.monthly}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn-primary" onClick={openModal}>Discuss Add-ons on a Free Call</button>
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
                onClick={openModal}
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

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="section" id="process" style={{ background: 'var(--cream2)' }}>
        <div className="section-gold-line" />
        <p className="section-label">What happens next</p>
        <h2 className="section-heading">
          From first call to live site in <em>7 days.</em> Here's how.
        </h2>
        <div className="grid-3col" style={{ maxWidth: '1060px', margin: '0 auto' }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} style={{ background: i === 5 ? 'var(--cream)' : 'var(--white)', padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', opacity: 0.2, marginBottom: '8px' }}>{step.num}</div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>{step.day}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn-primary" onClick={openModal}>Start the Process — Book a Free Call</button>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="section" id="faq">
        <p className="section-label">Common questions</p>
        <h2 className="section-heading">Everything you need to<br /><em>know before booking.</em></h2>
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
        <h2 className="section-heading">Guides for mortgage brokers<br />who want to <em>convert more.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '1100px', margin: '0 auto 36px' }}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', background: 'var(--white)', display: 'block' }}>
              <div style={{ background: 'var(--navy)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                {post.emoji}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span className="blog-tag">{post.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '8px', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/blog" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
            View all 5 articles →
          </Link>
        </div>
      </section>

      {/* ── LEAD MAGNET ──────────────────────────────── */}
      <LeadMagnetSection />

      {/* ── FCA CHECKLIST ────────────────────────────── */}
      <FCAChecklistSection />

      {/* ── AI AUDIT ─────────────────────────────────── */}
      <AuditSection />

      {/* ── WEBSITE SCORE QUIZ ───────────────────────── */}
      <WebsiteScoreQuiz />

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
            Your competitors booked<br />a call. <em>Will you?</em>
          </h2>
          <p className="cta-sub">
            Book a free 30-minute call. We'll pull up your current site, tell you exactly what's costing you leads, and show you a live example of what a properly built broker site looks like. Most brokers leave the call and book the same day. No obligation — but you'll understand why they do.
          </p>
          <button className="btn-gold" onClick={openModal} style={{ marginBottom: '16px' }}>
            Book Your Free Call — See the Difference
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '8px' }}>
            dan@senjastudio.co.uk · senjastudio.co.uk
          </p>
        </div>
      </section>
    </Layout>
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
