import { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      // Posts to our own API so the Formspree form ID stays server-side.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'contact', ...formData })
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please email dan@senjastudio.co.uk.')
      }
    } catch (error) {
      setError('Something went wrong. Please email dan@senjastudio.co.uk.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout
      title="Contact — Broker Website Enquiries"
      description="Questions about a mortgage broker website build, pricing or timelines? Email Dan directly, or book a free 30-minute review of your current site."
      canonical="/contact"
    >
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px 64px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem,5vw,4rem)',
          fontWeight: 600,
          color: 'var(--white)',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.02em'
        }}>
          Let's <em style={{ color: 'var(--gold)' }}>talk.</em>
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.78)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.85
        }}>
          For questions about a build, pricing or timelines. If you would rather just talk it through, book the free 30-minute review instead — you get a specific list of what to fix either way.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>

          {/* Contact Form */}
          <div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.8rem',
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}>
              Send a message
            </h2>

            {submitted ? (
              <div style={{
                background: 'var(--navy)',
                padding: '32px 28px',
                borderLeft: '3px solid var(--gold)',
                marginTop: '24px'
              }}>
                <p style={{
                  color: 'var(--gold)',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--serif)',
                  marginBottom: '12px',
                  fontWeight: 500
                }}>
                  Thank you for getting in touch.
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.7
                }}>
                  Dan reads every message himself and usually replies the same working day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Name <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Email <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Company/Brokerage name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Message <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontFamily: 'Inter, sans-serif',
                      resize: 'vertical',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                {/* Hidden from people, irresistible to bots. */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.website_url || ''}
                  onChange={handleChange}
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: 'fit-content' }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>

                {error && (
                  <p role="alert" style={{ fontSize: '0.85rem', color: '#C0392B', lineHeight: 1.6 }}>
                    {error}
                  </p>
                )}
              </form>
            )}

            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px' }}>
                Or email directly:
              </p>
              <a
                href="mailto:dan@senjastudio.co.uk"
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  fontFamily: 'var(--serif)',
                  fontWeight: 500
                }}
              >
                dan@senjastudio.co.uk
              </a>
            </div>
          </div>

          {/* Book a Call CTA */}
          <div>
            <div style={{
              background: 'var(--navy)',
              padding: '32px 28px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              height: 'fit-content',
              position: 'sticky',
              top: '100px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📞</div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--white)',
                marginBottom: '12px',
                letterSpacing: '-0.01em'
              }}>
                Prefer to <em style={{ color: 'var(--gold)' }}>talk?</em>
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.75,
                marginBottom: '24px'
              }}>
                Thirty minutes with Dan. We go through your current site, what is stopping enquiries, and what a build would actually involve. No deck, no follow-up sequence.
              </p>
              <a
                href="https://calendly.com/dan-senjastudio/lets-talk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                Book Your Free Call
              </a>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.68)',
                marginTop: '16px',
                lineHeight: 1.6
              }}>
                Typically responds within 2 hours<br />
                No pitch deck · No hard sell
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
