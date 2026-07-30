import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
    <div style={{
      opacity: isTransitioning ? 0 : 1,
      transition: 'opacity 0.3s ease'
    }}>
      <Component {...pageProps} />
    </div>
  )
}
