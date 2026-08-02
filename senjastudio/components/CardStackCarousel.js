import { useState } from 'react'

// The carousel is a dark panel by design. Every colour below is a literal so
// that no theme variable — and no theme CSS rule — can repaint it.
const PANEL_BG = '#0F0B1E'
const CARD_GRADIENT = 'linear-gradient(135deg, #1A1428 0%, #1a2847 100%)'
const GOLD = '#C9A84C'

export default function CardStackCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = (index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(((index % items.length) + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleNext = () => goTo(currentIndex + 1)

  // Reorder items so current item is at front
  const orderedItems = [
    ...items.slice(currentIndex),
    ...items.slice(0, currentIndex)
  ]

  return (
    <div
      // backgroundColor set inline on the wrapper: an inline style outranks any
      // stylesheet rule that isn't !important, so the panel stays dark navy in
      // both light and dark themes.
      style={{
        backgroundColor: PANEL_BG,
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px 80px',
        position: 'relative',
        minHeight: '480px'
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="What's included in every build"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex - 1) }
      }}
    >
      {/* Card Stack */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '420px'
      }}>
        {orderedItems.map((item, index) => {
          const isActive = index === 0
          const zIndex = orderedItems.length - index
          const translateY = index * 8
          const scale = 1 - (index * 0.04)
          const opacity = index < 3 ? 1 : 0

          return (
            <div
              key={`${item.num}-${index}`}
              onClick={isActive ? handleNext : undefined}
              role={isActive ? 'button' : undefined}
              tabIndex={isActive ? 0 : undefined}
              aria-label={isActive ? `${item.title}. Show next card.` : undefined}
              aria-hidden={isActive ? undefined : true}
              onKeyDown={isActive ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNext() }
              } : undefined}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '100%',
                maxWidth: '520px',
                transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
                cursor: isActive ? 'pointer' : 'default',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <div style={{
                background: CARD_GRADIENT,
                borderRadius: '12px',
                padding: '40px 36px',
                boxShadow: index === 0
                  ? '0 24px 48px rgba(0,0,0,0.3), 0 0 1px rgba(201,168,76,0.2) inset'
                  : '0 8px 16px rgba(0,0,0,0.2)',
                border: '1px solid rgba(201,168,76,0.15)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Decorative corner accent */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, transparent 0%, rgba(201,168,76,0.08) 100%)',
                  borderBottomLeftRadius: '100%'
                }} />

                {/* Item number */}
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: '#C9A84C',
                  opacity: 0.18,
                  lineHeight: 1,
                  marginBottom: '12px'
                }}>
                  {item.num}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                  marginBottom: '16px',
                  marginTop: '-8px'
                }}>
                  {item.title}
                </h3>

                {/* Divider */}
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #C9A84C 0%, transparent 100%)',
                  marginBottom: '20px'
                }} />

                {/* Body text */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.82)',
                  lineHeight: 1.7,
                  flex: 1
                }}>
                  {item.body}
                </p>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #C9A84C 0%, transparent 50%, #C9A84C 100%)',
                  opacity: 0.3
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show card ${index + 1} of ${items.length}: ${item.title}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            style={{
              // 8px dot inside a 44px hit area — meets the minimum touch target
              // without changing how the indicator looks.
              width: '44px',
              height: '44px',
              padding: 0,
              margin: '0 -18px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                display: 'block',
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentIndex ? GOLD : 'rgba(255,255,255,0.35)',
                transition: 'all 0.3s ease'
              }}
            />
          </button>
        ))}
      </div>

      {/* Tap/Click Hint */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: 500,
        pointerEvents: 'none'
      }}>
        Tap card to cycle
      </div>
    </div>
  )
}
