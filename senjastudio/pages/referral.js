import { useState } from 'react'
import Layout from '../components/Layout'

export default function Referral() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referralMethod: 'Share a link'
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
        body: JSON.stringify({ form: 'referral', ...formData })
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
      title="Referral Programme — Earn £250 Per Broker"
      description="Know an independent mortgage broker who needs a better website? Earn £250 cash for every referral that becomes a client. Paid within 7 days. No cap."
      canonical="/referral"
    >
      {/* Hero */}
      <div className="referral-hero" style={{ background: '#1A1428', padding: '80px 48px 64px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem,5vw,4rem)',
          fontWeight: 600,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          Refer a broker. <em style={{ color: '#C9A84C' }}>Earn £250.</em>
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#E2C46A',
          maxWidth: '600px',
          margin: '0 auto 24px',
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          lineHeight: 1.6
        }}>
          Every referral that becomes a client puts money in your pocket.
        </p>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: 1.85
        }}>
          Refer an independent mortgage broker to Senja Studio. If they become a paying client, you earn £250 cash paid via bank transfer within 7 days of their deposit clearing. No limit on referrals.
        </p>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 48px' }}>
        <p className="section-label" style={{ textAlign: 'center', marginBottom: '16px' }}>
          Simple process
        </p>
        <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '56px' }}>
          How the referral<br />programme <em style={{ color: 'var(--gold)' }}>works.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {[
            {
              num: '01',
              title: 'Share your unique link',
              body: 'Sign up below and receive your unique referral link. Share it with mortgage brokers you know, or introduce Dan directly via email introduction. Either works.'
            },
            {
              num: '02',
              title: 'The broker becomes a client',
              body: 'The broker books a free call, discusses their project, and becomes a paying client by making their 50% deposit payment. We track all referrals by link or by name.'
            },
            {
              num: '03',
              title: 'You receive £250 within 7 days',
              body: 'Once the deposit clears, you receive £250 via bank transfer within 7 working days. Every referral that converts pays out. No caps, no limits, no fine print.'
            }
          ].map(step => (
            <div key={step.num} style={{
              background: 'var(--surface)',
              padding: '32px 28px',
              border: '1px solid var(--border)',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--serif)',
                color: 'var(--gold-light)',
                fontWeight: 300,
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.3rem',
                fontWeight: 500,
                color: 'var(--ink)',
                marginBottom: '12px',
                letterSpacing: '-0.01em'
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--muted)',
                lineHeight: 1.8
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Who This Is For */}
      <div style={{ background: 'var(--cream)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '16px' }}>
            Who this is for
          </p>
          <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Anyone who works with<br /><em style={{ color: 'var(--gold)' }}>mortgage brokers.</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🏠', label: 'Other Mortgage Brokers' },
              { icon: '💼', label: 'Financial Advisers' },
              { icon: '📊', label: 'Accountants' },
              { icon: '⚖️', label: 'Solicitors & Conveyancers' },
              { icon: '🏢', label: 'Estate Agents' },
              { icon: '💻', label: 'Marketing Consultants' }
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--surface)',
                padding: '24px 20px',
                textAlign: 'center',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--ink)',
                  fontWeight: 500,
                  fontFamily: 'var(--serif)'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: '32px',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '32px auto 0'
          }}>
            If you work with independent mortgage brokers and you know someone who needs a better website, this programme puts cash in your pocket for the introduction. Simple as that.
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '80px 48px' }}>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: '2rem',
          fontWeight: 500,
          color: 'var(--ink)',
          marginBottom: '16px',
          textAlign: 'center',
          letterSpacing: '-0.01em'
        }}>
          Join the referral programme
        </h2>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: '40px',
          lineHeight: 1.8
        }}>
          Sign up below and we'll send you your unique referral link and tracking details within 24 hours.
        </p>

        {submitted ? (
          <div style={{
            background: 'var(--navy)',
            padding: '40px 32px',
            borderLeft: '3px solid var(--gold)',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'var(--gold)',
              fontSize: '1.3rem',
              fontFamily: 'var(--serif)',
              marginBottom: '12px',
              fontWeight: 500
            }}>
              You're in.
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.75
            }}>
              We'll email you your unique referral link and tracking details within 24 hours. Check your inbox at <strong style={{ color: 'var(--gold)' }}>{formData.email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'var(--surface)',
            padding: '40px 32px',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}>
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
                Your Name <span style={{ color: 'var(--gold)' }}>*</span>
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
                Your Email <span style={{ color: 'var(--gold)' }}>*</span>
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
                Your Phone (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
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
                How you'd like to refer <span style={{ color: 'var(--gold)' }}>*</span>
              </label>
              <select
                name="referralMethod"
                required
                value={formData.referralMethod}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              >
                <option value="Share a link">Share a link</option>
                <option value="Make an email introduction">Make an email introduction</option>
                <option value="Other">Other</option>
              </select>
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
              style={{ width: '100%', marginTop: '8px' }}
            >
              {submitting ? 'Submitting...' : 'Join Referral Programme'}
            </button>

            {error && (
              <p role="alert" style={{ fontSize: '0.85rem', color: '#C0392B', textAlign: 'center', lineHeight: 1.6 }}>
                {error}
              </p>
            )}

            <p style={{
              fontSize: '0.75rem',
              color: 'var(--muted)',
              textAlign: 'center',
              lineHeight: 1.6,
              marginTop: '8px'
            }}>
              By submitting, you agree to our referral programme terms. We'll email you your unique tracking link within 24 hours.
            </p>
          </form>
        )}
      </div>

      {/* Final CTA */}
      <div style={{ background: 'var(--navy)', padding: '64px 48px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.8rem,4vw,2.5rem)',
          fontWeight: 600,
          color: 'var(--white)',
          lineHeight: 1.2,
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          Questions about the<br /><em style={{ color: 'var(--gold)' }}>referral programme?</em>
        </h2>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '500px',
          margin: '0 auto 24px',
          lineHeight: 1.8
        }}>
          Email <a href="mailto:dan@senjastudio.co.uk" style={{ color: 'var(--gold)', textDecoration: 'none' }}>dan@senjastudio.co.uk</a> and we'll walk you through exactly how it works and answer any questions.
        </p>
      </div>
    </Layout>
  )
}
