import { useState } from 'react'
import Layout from '../components/Layout'

// Moved off the homepage: it was the fourth lead-capture section stacked back
// to back at the bottom of the page. On its own page it can be linked to
// deliberately, and the homepage makes one argument instead of four asks.

// ── WEBSITE SCORE QUIZ ────────────────────────────────────────

// Literal hex, applied inline on the section wrapper. The quiz reads as a dark
// panel by design, so it must not follow the theme — and an inline background
// cannot be repainted by a theme rule.
const QUIZ_BG = { background: '#0F0B1E', backgroundColor: '#0F0B1E' }

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
      explanation: 'A self-employed client and a first-time buyer need different reassurance before they enquire'
    },
    {
      id: 'speed',
      text: 'Does your site load in under 3 seconds on mobile?',
      explanation: 'Most mortgage searches happen on a phone, often outside working hours'
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
        description: 'Several of the elements that turn a visitor into an enquiry are missing. Most are quick to fix once you know what to look for.',
        color: '#c53030',
        pdfUrl: '/downloads/score-report-low.pdf',
        pdfLabel: 'Download Your Full Report (0-40%)'
      }
    } else if (score <= 70) {
      return {
        title: 'Your site has real gaps',
        description: 'You\'re doing some things right, but there are clear gaps. Each one is a reason a visitor who was interested decided not to make contact.',
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
      <section className="section" id="website-quiz" style={QUIZ_BG}>
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
                color: 'rgba(255,255,255,0.78)',
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
            color: 'rgba(255,255,255,0.78)',
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
    <section className="section" id="website-quiz" style={QUIZ_BG}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

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
          backgroundColor: '#1E1A35',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px',
          padding: '40px 32px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '0.72rem',
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
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.8)',
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
                fontSize: '0.95rem',
                fontWeight: 600,
                // Literal, not --ink: this button lives on the always-dark quiz
                // panel, so it must stay dark-on-gold in either theme.
                color: '#0F0B1E',
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
                color: 'rgba(255,255,255,0.78)',
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

export default function WebsiteScorePage() {
  return (
    <Layout
      title="Score Your Broker Website"
      description="Five yes/no questions about your broker site. Get an instant score, the specific gaps costing you enquiries, and a report you can act on today."
      canonical="/website-score"
    >
      {/* The quiz uses h2 internally, so the page needs its own h1 for both
          heading hierarchy and search results. */}
      <div className="location-hero" style={{ padding: '72px 24px 56px', textAlign: 'center' }}>
        <p className="section-label">5-question website score</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          How does your broker site<br /><em style={{ color: '#E2C46A' }}>actually stack up?</em>
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.85 }}>
          Five yes/no questions about your current site. You&apos;ll get a score, the specific gaps behind it, and a report you can act on.
        </p>
      </div>
      <WebsiteScoreQuiz />
    </Layout>
  )
}
