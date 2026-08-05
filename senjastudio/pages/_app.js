import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import * as Sentry from '@sentry/nextjs'
import SmoothScroll from '../components/SmoothScroll'

// Initialize Sentry only in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://c2a4669b1f7871eaaa69874aad37fdfc@o4511637563768832.ingest.de.sentry.io/4511821412040784',
    tracesSampleRate: 1.0,
    debug: false,
    environment: process.env.NODE_ENV,
  })
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
    } else {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Something went wrong</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>We've been notified and are looking into it.</p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '12px 24px',
                background: '#1A1428',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsTransitioning(true)
    const handleComplete = () => setIsTransitioning(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  // Google Analytics Conversion Event Tracking
  useEffect(() => {
    const trackEvent = (eventName, additionalParams = {}) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          event_category: 'conversion',
          ...additionalParams
        })
      }
    }

    // Track all booking CTA clicks
    const handleBookCallClick = (e) => {
      const target = e.target
      const isBookingCTA =
        target.classList.contains('btn-primary') ||
        target.classList.contains('btn-gold') ||
        target.classList.contains('nav-cta') ||
        (target.textContent && target.textContent.includes('Book'))

      if (isBookingCTA) {
        trackEvent('book_call_click', {
          button_text: target.textContent || target.innerText,
          page_path: window.location.pathname
        })
      }
    }

    // Track lead magnet form submissions
    const handleLeadMagnetSubmit = (e) => {
      if (e.target.id === 'lead-magnet' || e.target.closest('#lead-magnet')) {
        trackEvent('lead_magnet_submit', {
          page_path: window.location.pathname
        })
      }
    }

    // Track contact form submissions
    const handleContactFormSubmit = (e) => {
      const form = e.target
      if (form.action && form.action.includes('/api/contact')) {
        trackEvent('contact_form_submit', {
          page_path: window.location.pathname
        })
      }
    }

    // Track quiz completion
    const handleQuizComplete = () => {
      trackEvent('quiz_complete', {
        page_path: window.location.pathname
      })
    }

    // Add event listeners
    document.addEventListener('click', handleBookCallClick)
    document.addEventListener('submit', handleLeadMagnetSubmit)
    document.addEventListener('submit', handleContactFormSubmit)

    // Listen for custom quiz complete event
    document.addEventListener('quizComplete', handleQuizComplete)

    return () => {
      document.removeEventListener('click', handleBookCallClick)
      document.removeEventListener('submit', handleLeadMagnetSubmit)
      document.removeEventListener('submit', handleContactFormSubmit)
      document.removeEventListener('quizComplete', handleQuizComplete)
    }
  }, [])

  return (
    <ErrorBoundary>
      {/* Renders nothing. Skips instantiation entirely under reduced motion,
          so those visitors keep native scrolling. */}
      <SmoothScroll />
      <div style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <Component {...pageProps} />
      </div>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  )
}
