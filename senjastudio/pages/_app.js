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

  return (
    <div style={{
      opacity: isTransitioning ? 0 : 1,
      transition: 'opacity 0.3s ease'
    }}>
      <Component {...pageProps} />
    </div>
  )
}
