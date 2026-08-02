import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useState, useEffect } from 'react'

// ── QUALIFYING MODAL ──────────────────────────────────────────
function QualifyModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState({})

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setAnswers({})
      setSelected({})
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const select = (stepKey, value, label) => {
    setSelected(prev => ({ ...prev, [stepKey]: value }))
    setAnswers(prev => ({ ...prev, [stepKey]: label }))
  }

  const nextStep = () => setStep(s => s + 1)

  const proceed = async () => {
    try {
      // Via our own API so the Formspree form ID is not in the page source.
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'qualify',
          website: answers.website,
          goal: answers.goal,
          timeline: answers.timeline,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        })
      })
    } catch (e) {
      // Non-fatal: the booking link still opens.
    }

    // Build Calendly URL with prefilled answers
    const params = new URLSearchParams()
    if (answers.website) params.append('a1', answers.website)
    if (answers.goal) params.append('a2', answers.goal)
    if (answers.timeline) params.append('a3', answers.timeline)

    const calendlyUrl = `https://calendly.com/dan-senjastudio/lets-talk${params.toString() ? '?' + params.toString() : ''}`
    window.open(calendlyUrl, '_blank')
    onClose()
  }

  if (!isOpen) return null

  const steps = [
    {
      key: 'website',
      label: 'Do you currently have a mortgage broker website?',
      options: [
        { value: 'yes', label: "Yes — but it's not converting well" },
        { value: 'basic', label: "Yes — it's very basic or outdated" },
        { value: 'no', label: "No — starting from scratch" },
      ],
      next: nextStep,
    },
    {
      key: 'goal',
      label: "What's your main goal for a new site?",
      options: [
        { value: 'leads', label: "Get more enquiries and booked calls" },
        { value: 'credibility', label: "Look more professional and credible" },
        { value: 'self-employed', label: "Convert more self-employed clients" },
        { value: 'launch', label: "Launch my brokerage online" },
      ],
      next: nextStep,
    },
    {
      key: 'timeline',
      label: "How soon are you looking to get started?",
      options: [
        { value: 'asap', label: "As soon as possible" },
        { value: 'month', label: "Within the next month" },
        { value: 'exploring', label: "Just exploring options" },
      ],
      next: proceed,
      nextLabel: 'Book My Free Call →',
    },
  ]

  const current = steps[step - 1]
  const isEnabled = !!selected[current?.key]

  return (
    <div
      className="qualify-modal"
      style={{ display: 'flex' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="qualify-box">
        <div className="qualify-header">
          <div className="qualify-eyebrow">Free 30-Minute Call</div>
          <h2 className="qualify-title">Three quick questions<br />before we <em>talk.</em></h2>
          <button className="qualify-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="qualify-body">
          <div className="qualify-progress">
            {[1, 2, 3].map(n => (
              <div key={n} className={`qualify-prog-dot${n <= step ? ' done' : ''}`} />
            ))}
          </div>
          <div className="qualify-q-label">{current.label}</div>
          <div className="qualify-options">
            {current.options.map(opt => (
              <button
                key={opt.value}
                className={`qualify-option${selected[current.key] === opt.value ? ' selected' : ''}`}
                onClick={() => select(current.key, opt.value, opt.label)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            className={`qualify-next${isEnabled ? ' enabled' : ''}`}
            onClick={isEnabled ? current.next : undefined}
          >
            {current.nextLabel || 'Next →'}
          </button>
        </div>
        <div className="qualify-footer">
          No commitment required · 30 minutes · Dan personally takes every call
        </div>
      </div>
    </div>
  )
}

// ── NAV ───────────────────────────────────────────────────────
function Nav({ openModal }) {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Dark mode: respect system preference, override with localStorage
    const stored = localStorage.getItem('darkMode')
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored !== null ? stored === 'true' : sysDark
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDark(e.matches)
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('darkMode', String(next))
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  const navLinks = [
    { href: '/#why-niche', label: 'Why Specialist' },
    { href: '/examples', label: 'Broker Sites' },
    { href: '/#about', label: 'About Dan' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">Senja<span>.</span>Studio</Link>
        <div className="nav-links">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="dark-toggle"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); openModal() }}
            style={{ border: 'none', cursor: 'pointer' }}
          >
            Book a Free Call
          </button>
          <button
            id="burgerBtn"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
          >
            <span className={`burger-line${menuOpen ? ' open-1' : ''}`} />
            <span className={`burger-line${menuOpen ? ' open-2' : ''}`} />
            <span className={`burger-line${menuOpen ? ' open-3' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{ position: 'fixed', top: '65px', left: 0, right: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)', zIndex: 99999, padding: '12px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '14px 24px', fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ padding: '16px 24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => { openModal(); setMenuOpen(false) }} style={{ flex: 1, textAlign: 'center', background: 'var(--navy)', color: 'var(--white)', padding: '14px', fontSize: '0.72rem', fontWeight: '500', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              Book a Free Call
            </button>
            <button onClick={toggleDark} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.9rem', flexShrink: 0 }}>
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ── FOOTER ────────────────────────────────────────────────────
// Evaluated once at module load. Calling new Date() during render makes the
// server and client disagree across a year boundary, which is a hydration error.
const YEAR = new Date().getFullYear()

function Footer() {
  const [locationsOpen, setLocationsOpen] = useState(false)

  const ukLocations = [
    { name: 'London', slug: 'mortgage-broker-website-design-london' },
    { name: 'Manchester', slug: 'mortgage-broker-website-design-manchester' },
    { name: 'Birmingham', slug: 'mortgage-broker-website-design-birmingham' },
    { name: 'Leeds', slug: 'mortgage-broker-website-design-leeds' },
    { name: 'Bristol', slug: 'mortgage-broker-website-design-bristol' },
    { name: 'Edinburgh', slug: 'mortgage-broker-website-design-edinburgh' },
    { name: 'Glasgow', slug: 'mortgage-broker-website-design-glasgow' },
    { name: 'Liverpool', slug: 'mortgage-broker-website-design-liverpool' },
    { name: 'Sheffield', slug: 'mortgage-broker-website-design-sheffield' },
    { name: 'Nottingham', slug: 'mortgage-broker-website-design-nottingham' },
    { name: 'Cardiff', slug: 'mortgage-broker-website-design-cardiff' },
    { name: 'Newcastle', slug: 'mortgage-broker-website-design-newcastle' }
  ]

  const internationalLocations = [
    { name: 'USA', slug: 'mortgage-broker-website-design-usa' },
    { name: 'Australia', slug: 'mortgage-broker-website-design-australia' },
    { name: 'Dubai', slug: 'mortgage-broker-website-design-dubai' },
    { name: 'Canada', slug: 'mortgage-broker-website-design-canada' },
    { name: 'New Zealand', slug: 'mortgage-broker-website-design-new-zealand' },
    { name: 'Singapore', slug: 'mortgage-broker-website-design-singapore' },
    { name: 'Hong Kong', slug: 'mortgage-broker-website-design-hong-kong' },
    { name: 'Ireland', slug: 'mortgage-broker-website-design-ireland' },
    { name: 'South Africa', slug: 'mortgage-broker-website-design-south-africa' },
    { name: 'Germany', slug: 'mortgage-broker-website-design-germany' },
    { name: 'France', slug: 'mortgage-broker-website-design-france' },
    { name: 'Spain', slug: 'mortgage-broker-website-design-spain' },
    { name: 'Portugal', slug: 'mortgage-broker-website-design-portugal' }
  ]

  return (
    <footer>
      <div className="footer-left">
        <Link href="/" className="footer-logo">Senja<span>.</span>Studio</Link>
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.68)', marginTop: '6px', lineHeight: 1.6 }}>
          Mortgage broker website design · Worldwide · Websites from £1,500
        </p>
      </div>
      <div className="footer-right">
        <Link href="/blog" className="footer-link">Blog</Link>
        <Link href="/examples" className="footer-link">Examples</Link>
        <Link href="/ai-add-ons" className="footer-link">AI Add-Ons</Link>
        <Link href="/website-score" className="footer-link">Score Your Site</Link>
        <Link href="/glossary" className="footer-link">Glossary</Link>
        <Link href="/referral" className="footer-link">Referral Programme</Link>
        <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
        <Link href="/terms" className="footer-link">Terms</Link>
        <a href="mailto:dan@senjastudio.co.uk" className="footer-link">dan@senjastudio.co.uk</a>
      </div>

      {/* Locations Section */}
      <div style={{ width: '100%', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => setLocationsOpen(!locationsOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.78)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto 16px',
            padding: '8px 16px',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--gold)'}
          onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          <span>{locationsOpen ? '▼' : '▶'}</span>
          <span>We Build for Brokers in {ukLocations.length + internationalLocations.length} Markets</span>
        </button>

        {locationsOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
            {/* UK Locations */}
            <div>
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500 }}>
                United Kingdom
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ukLocations.map(loc => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    style={{
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.78)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      paddingLeft: '12px',
                      borderLeft: '2px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = 'var(--white)'
                      e.target.style.borderLeftColor = 'var(--gold)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = 'rgba(255,255,255,0.5)'
                      e.target.style.borderLeftColor = 'transparent'
                    }}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* International Locations */}
            <div>
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500 }}>
                International
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {internationalLocations.map(loc => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    style={{
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.78)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      paddingLeft: '12px',
                      borderLeft: '2px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = 'var(--white)'
                      e.target.style.borderLeftColor = 'var(--gold)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = 'rgba(255,255,255,0.5)'
                      e.target.style.borderLeftColor = 'transparent'
                    }}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ width: '100%', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.68)', textAlign: 'center' }}>
        Senja Studio is not authorised and regulated by the FCA. This website is for marketing purposes only. © {YEAR} Senja Studio. All rights reserved.
      </div>
    </footer>
  )
}

// ── WHATSAPP WIDGET ───────────────────────────────────────────
function WhatsAppWidget({ visible }) {
  const [open, setOpen] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Check if user has already seen the notification this session
    if (sessionStorage.getItem('waNotifSeen')) return

    let fired = false
    let hideTimer

    const handleScroll = () => {
      if (fired) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if ((window.scrollY / scrollable) * 100 >= 60) {
        fired = true
        setShowNotif(true)
        setShowMessage(true)
        sessionStorage.setItem('waNotifSeen', 'true')
        hideTimer = setTimeout(() => setShowMessage(false), 10000)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(hideTimer)
    }
    // Deliberately empty: depending on showNotif tore down and re-attached the
    // scroll listener on every state change.
  }, [])

  const buildLink = () => {
    const input = document.getElementById('waInput')
    const msg = input?.value?.trim() || "Hi Dan, I'd like to chat about a mortgage broker website"
    window.open(`https://wa.me/447946299322?text=${encodeURIComponent(msg)}`, '_blank')
    return false
  }

  if (!visible) return null

  return (
    <>
      <div className="wa-widget visible">
        <button className="wa-trigger" onClick={() => setOpen(o => !o)} aria-label="Chat with Dan on WhatsApp">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.945c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.933 11.933 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.86 11.86 0 00-3.48-8.418z"/></svg>
          {showNotif && <span className="wa-notif">1</span>}
        </button>
      {open && (
        <div className="wa-popup open">
          <div className="wa-popup-header">
            <div className="wa-avatar">DS</div>
            <div className="wa-info">
              <div className="wa-name">Dan Senja</div>
              <div className="wa-status"><span className="wa-online-dot" />Typically replies within 2 hours</div>
            </div>
            <button className="wa-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              <p>Hi there! 👋</p>
              <p>I'm Dan — I build high-converting mortgage broker websites.</p>
              <p>Got a question? Drop me a message.</p>
              <span className="wa-time">Dan · Senja Studio</span>
            </div>
          </div>
          <div className="wa-popup-footer">
            <input id="waInput" type="text" placeholder="Type a message..." className="wa-input" onKeyDown={(e) => { if (e.key === 'Enter') buildLink() }} />
            <button className="wa-send" onClick={buildLink}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
        </div>
      )}
      </div>

      {/* WhatsApp Chat Bubble Notification */}
      {showMessage && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          background: 'white',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          maxWidth: '280px',
          zIndex: 9998,
          animation: 'slideInUp 0.4s ease',
          border: '1px solid rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navy)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              flexShrink: 0
            }}>
              DS
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1F1F1F',
                marginBottom: '4px'
              }}>
                Dan
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#333',
                lineHeight: 1.5
              }}>
                👋 Hi! Thinking about a new broker site? Happy to answer any questions.
              </div>
              <div style={{
                fontSize: '0.68rem',
                color: '#999',
                marginTop: '6px'
              }}>
                Just now
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowMessage(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: '#999',
              fontSize: '1.2rem',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(0,0,0,0.05)'
              e.target.style.color = '#333'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'none'
              e.target.style.color = '#999'
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

// ── BACK TO TOP ───────────────────────────────────────────────
function BackToTop({ visible }) {
  if (!visible) return null
  return (
    <button
      className="back-to-top visible"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

// ── COOKIE CONSENT ────────────────────────────────────────────
function CookieBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      const t = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => { localStorage.setItem('cookieConsent', 'accepted'); setShow(false) }
  const decline = () => { localStorage.setItem('cookieConsent', 'declined'); setShow(false) }

  if (!show) return null

  return (
    <div className={`cookie-bar${show ? ' visible' : ''}`}>
      <p className="cookie-text">
        We use cookies to improve your experience and analyse site performance.{' '}
        <Link href="/privacy-policy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link>
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={accept}>Accept</button>
        <button className="cookie-decline" onClick={decline}>Decline</button>
      </div>
    </div>
  )
}

// ── SCROLL PROGRESS ───────────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} />
}

// ── SCROLL REVEAL OBSERVER ────────────────────────────────────
function ScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // The CSS that hides revealable content is gated behind .js-anim, so the
    // content only ever starts hidden when this observer exists to show it.
    // Without this, a JS failure left whole sections stuck at opacity: 0.
    const root = document.documentElement
    root.classList.add('js-anim')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Only animate once - stop observing after visible
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with scroll-reveal classes
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger, .scroll-reveal-text')
    revealElements.forEach((el) => observer.observe(el))

    // Anything already in view when we mount should be revealed immediately
    // rather than waiting for a scroll event that may never come.
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-visible')
    })

    return () => {
      observer.disconnect()
      root.classList.remove('js-anim')
    }
  }, [])

  return null
}

// ── EXIT INTENT POPUP 1: LEAD MAGNET ──────────────────────────
function ExitIntentLeadMagnet() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const closePopup = () => {
    setShow(false)
    sessionStorage.setItem('exitIntent1Shown', 'true')
  }

  useEffect(() => {
    // Don't show if already shown this session or user has submitted any form
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('exitIntent1Shown')) return
    if (sessionStorage.getItem('formSubmitted')) return

    let triggered = false

    const handleMouseLeave = (e) => {
      if (triggered) return
      if (e.clientY <= 10) {
        triggered = true
        setShow(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      // 'exit-intent' is not a known lead magnet; the API falls back to the
      // default guide. Send the real source so the right file goes out.
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'lead-magnet' })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        sessionStorage.setItem('formSubmitted', 'true')
        if (data.downloadUrl) {
          const link = document.createElement('a')
          link.href = data.downloadUrl
          link.download = ''
          link.rel = 'noopener'
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
        setTimeout(() => closePopup(), 4000)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) closePopup() }}
    >
      <div style={{
        background: 'var(--navy)',
        maxWidth: '520px',
        width: '100%',
        borderRadius: '8px',
        padding: '40px 32px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <button
          onClick={() => closePopup()}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.78)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)'
            e.target.style.color = 'var(--white)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'none'
            e.target.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          ×
        </button>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--white)',
              marginBottom: '12px'
            }}>
              Check your inbox!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)' }}>
              Your free guide is on its way.
            </p>
          </div>
        ) : (
          <>
            {/* This panel sits on --navy, so every colour here must be light.
                The heading and body previously used navy-on-navy and were invisible. */}
            <div style={{ fontSize: '2rem', marginBottom: '16px', textAlign: 'center' }}>📋</div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.8rem',
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '12px',
              textAlign: 'center',
              lineHeight: 1.3
            }}>
              Before you go —<br />get the <em style={{ color: 'var(--gold-light)' }}>free guide</em>
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '28px',
              textAlign: 'center',
              lineHeight: 1.7
            }}>
              5 things your broker site is costing you right now — and the exact fix for each one.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="exit-intent-email" className="sr-only">Your email address</label>
              <input
                id="exit-intent-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '1rem',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
              />

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
                <p role="alert" style={{ fontSize: '0.8rem', color: '#FF8A8A', marginTop: '12px', textAlign: 'center' }}>
                  {error}
                </p>
              )}

              <p style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.78)',
                marginTop: '12px',
                textAlign: 'center',
                lineHeight: 1.6
              }}>
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ── EXIT INTENT POPUP 2: OBJECTION CAPTURE ────────────────────
function ExitIntentObjection() {
  const [show, setShow] = useState(false)
  const [selectedReason, setSelectedReason] = useState('')
  const [additionalFeedback, setAdditionalFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const closePopup = () => {
    setShow(false)
  }

  const reasons = [
    { value: 'not-ready', label: 'Not ready yet' },
    { value: 'price', label: 'Price' },
    { value: 'think-about-it', label: 'Want to think about it' },
    { value: 'browsing', label: 'Just browsing' }
  ]

  useEffect(() => {
    // Don't show if already shown this session or user has submitted any form
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('exitIntent2Shown')) return
    if (sessionStorage.getItem('formSubmitted')) return
    if (!sessionStorage.getItem('exitIntent1Shown')) return

    let triggered = false

    const handleMouseLeave = (e) => {
      if (triggered) return
      if (e.clientY <= 10) {
        triggered = true
        setShow(true)
        sessionStorage.setItem('exitIntent2Shown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedReason) return

    setLoading(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'objection',
          reason: selectedReason,
          additionalFeedback: additionalFeedback || 'None provided'
        })
      })

      setSuccess(true)
      sessionStorage.setItem('formSubmitted', 'true')
      setTimeout(() => setShow(false), 2500)
    } catch (err) {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) closePopup() }}
    >
      <div style={{
        background: 'var(--navy)',
        maxWidth: '520px',
        width: '100%',
        borderRadius: '8px',
        padding: '40px 32px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <button
          onClick={() => closePopup()}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.78)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)'
            e.target.style.color = 'var(--white)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'none'
            e.target.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          ×
        </button>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🙏</div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--white)',
              marginBottom: '12px'
            }}>
              Thanks for the feedback!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)' }}>
              We appreciate you taking the time to let us know.
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '2rem', marginBottom: '16px', textAlign: 'center' }}>💬</div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.8rem',
              fontWeight: 500,
              color: 'var(--white)',
              marginBottom: '12px',
              textAlign: 'center',
              lineHeight: 1.3
            }}>
              What stopped you from<br /><em style={{ color: 'var(--gold-light)' }}>booking a call today?</em>
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.78)',
              marginBottom: '28px',
              textAlign: 'center',
              lineHeight: 1.6
            }}>
              Your feedback helps us improve. This is anonymous.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {reasons.map(reason => (
                  <button
                    key={reason.value}
                    type="button"
                    onClick={() => setSelectedReason(reason.value)}
                    style={{
                      padding: '14px 20px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      border: selectedReason === reason.value ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.2)',
                      background: selectedReason === reason.value ? 'rgba(226,196,106,0.1)' : 'rgba(255,255,255,0.05)',
                      color: selectedReason === reason.value ? 'var(--gold-light)' : 'rgba(255,255,255,0.7)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => {
                      if (selectedReason !== reason.value) {
                        e.target.style.background = 'rgba(255,255,255,0.08)'
                        e.target.style.borderColor = 'rgba(255,255,255,0.3)'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedReason !== reason.value) {
                        e.target.style.background = 'rgba(255,255,255,0.05)'
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                      }
                    }}
                  >
                    {selectedReason === reason.value && '✓ '}{reason.label}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Anything else you'd like us to know? (optional)"
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                disabled={loading}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--white)',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  lineHeight: 1.6
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />

              <button
                type="submit"
                disabled={loading || !selectedReason}
                className="btn-gold"
                style={{
                  width: '100%',
                  opacity: loading || !selectedReason ? 0.5 : 1,
                  cursor: loading || !selectedReason ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ── LAYOUT ────────────────────────────────────────────────────
export default function Layout({ children, title, description, canonical, schema, modalOpen: modalOpenProp, onModalClose }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Pages may drive the modal themselves (index.js) or leave it to the nav CTA
  const isModalOpen = modalOpen || Boolean(modalOpenProp)
  const closeModal = () => {
    setModalOpen(false)
    if (onModalClose) onModalClose()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Allow any page to open the modal via custom event
  useEffect(() => {
    const handler = () => setModalOpen(true)
    document.addEventListener('openModal', handler)
    return () => document.removeEventListener('openModal', handler)
  }, [])

  // Crisp and Clarity are loaded via next/script above with strategy
  // "lazyOnload" — they used to be injected on mount on every route change.

  const siteTitle = title
    ? `${title} | Senja Studio`
    : 'Mortgage Broker Website Design | Senja Studio'

  const siteDesc = description || 'Websites built only for independent mortgage brokers. Segmented enquiry paths, compliance handled, live in 7 days. From £1,500. Book a free 30-minute review.'

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        {canonical && <link rel="canonical" href={`https://senjastudio.co.uk${canonical}`} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:image" content="https://senjastudio.co.uk/images/og-image.png" />
        <meta property="og:site_name" content="Senja Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://senjastudio.co.uk/images/og-image.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        {/* Fonts and the site-wide Organization/WebSite/Person graph live in
            _document.js. They used to be duplicated here, which emitted the
            font stylesheet four times and two competing LocalBusiness
            entities per page. Page-specific schema comes in via `schema`. */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      {/* Analytics loads after the page is interactive rather than blocking it. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NNZY23RH3M"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NNZY23RH3M');`}
      </Script>
      <Script id="crisp-chat" strategy="lazyOnload">
        {`window.$crisp=[];window.CRISP_WEBSITE_ID="cc79fcb2-592c-4730-8afd-fbc75420b2a2";(function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
      </Script>
      <Script id="ms-clarity" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xua9mh5o25");`}
      </Script>

      <ScrollProgress />
      <ScrollRevealObserver />
      <Nav openModal={() => setModalOpen(true)} />

      <main>{children}</main>

      {/* Referral Banner */}
      <Link
        href="/referral"
        style={{
          display: 'block',
          background: 'var(--navy)',
          padding: '16px 48px',
          textAlign: 'center',
          borderTop: '1px solid rgba(212,175,55,0.2)',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
          textDecoration: 'none',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(26,20,40,0.95)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--navy)'}
      >
        <span style={{
          fontSize: '0.9rem',
          color: 'var(--gold)',
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          letterSpacing: '0.01em'
        }}>
          Know a mortgage broker? Earn £250 for every referral. →
        </span>
      </Link>

      <Footer />

      <QualifyModal isOpen={isModalOpen} onClose={closeModal} />
      <WhatsAppWidget visible={scrolled} />
      <BackToTop visible={scrolled} />
      <CookieBar />
      <ExitIntentLeadMagnet />
      <ExitIntentObjection />
    </>
  )
}
