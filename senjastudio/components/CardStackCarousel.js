import { useState } from 'react'

export default function CardStackCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Reorder items so current item is at front
  const orderedItems = [
    ...items.slice(currentIndex),
    ...items.slice(0, currentIndex)
  ]

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px 80px',
      position: 'relative',
      minHeight: '480px'
    }}>
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
                background: 'linear-gradient(135deg, var(--navy) 0%, #1a2847 100%)',
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
                  color: 'var(--gold)',
                  opacity: 0.15,
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
                  background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
                  marginBottom: '20px'
                }} />

                {/* Body text */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.8)',
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
                  background: 'linear-gradient(90deg, var(--gold) 0%, transparent 50%, var(--gold) 100%)',
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
        {items.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: index === currentIndex ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
          />
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
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 500,
        pointerEvents: 'none'
      }}>
        Tap card to cycle
      </div>
    </div>
  )
}
