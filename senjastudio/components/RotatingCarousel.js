import { useState, useEffect, useRef } from 'react'

export default function RotatingCarousel({ items }) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startRotation, setStartRotation] = useState(0)
  const [dimensions, setDimensions] = useState({
    radius: 450,
    cardWidth: 320,
    cardHeight: 420,
    containerHeight: 650,
    fontSize: {
      number: '4rem',
      title: '1.35rem',
      body: '0.88rem'
    },
    padding: '40px 32px',
    dragSensitivity: 0.5
  })
  const requestRef = useRef()
  const containerRef = useRef(null)

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth

      if (width < 480) {
        // Mobile
        setDimensions({
          radius: 280,
          cardWidth: 260,
          cardHeight: 340,
          containerHeight: 480,
          fontSize: {
            number: '2.8rem',
            title: '1.1rem',
            body: '0.8rem'
          },
          padding: '28px 24px',
          dragSensitivity: 0.7
        })
      } else if (width < 768) {
        // Tablet
        setDimensions({
          radius: 360,
          cardWidth: 290,
          cardHeight: 380,
          containerHeight: 550,
          fontSize: {
            number: '3.4rem',
            title: '1.2rem',
            body: '0.84rem'
          },
          padding: '32px 28px',
          dragSensitivity: 0.6
        })
      } else {
        // Desktop
        setDimensions({
          radius: 450,
          cardWidth: 320,
          cardHeight: 420,
          containerHeight: 650,
          fontSize: {
            number: '4rem',
            title: '1.35rem',
            body: '0.88rem'
          },
          padding: '40px 32px',
          dragSensitivity: 0.5
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Auto-rotation
  useEffect(() => {
    if (!isDragging) {
      const animate = () => {
        setRotation(prev => (prev + 0.1) % 360)
        requestRef.current = requestAnimationFrame(animate)
      }
      requestRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(requestRef.current)
    }
  }, [isDragging])

  // Mouse/touch handlers
  const handleStart = (clientX) => {
    setIsDragging(true)
    setStartX(clientX)
    setStartRotation(rotation)
  }

  const handleMove = (clientX) => {
    if (!isDragging) return
    const delta = clientX - startX
    const rotationDelta = delta * dimensions.dragSensitivity
    setRotation(startRotation + rotationDelta)
  }

  const handleEnd = () => {
    setIsDragging(false)
  }

  // Calculate card positions
  const angleStep = 360 / items.length
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480

  return (
    <div
      ref={containerRef}
      style={{
        perspective: `${dimensions.radius * 4}px`,
        width: '100%',
        height: `${dimensions.containerHeight}px`,
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Instruction text */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 500,
          zIndex: 100,
          pointerEvents: 'none',
          opacity: 0.6
        }}>
          ← Drag to rotate →
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s linear'
        }}
      >
        {items.map((item, index) => {
          const angle = angleStep * index
          const x = Math.sin((angle * Math.PI) / 180) * dimensions.radius
          const z = Math.cos((angle * Math.PI) / 180) * dimensions.radius
          const cardRotation = -angle

          // Calculate distance from front for depth effect
          const normalizedZ = (z + dimensions.radius) / (dimensions.radius * 2)
          const scale = 0.7 + normalizedZ * 0.3
          const opacity = 0.4 + normalizedZ * 0.6

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
                transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${cardRotation}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                opacity: opacity,
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, var(--navy) 0%, #1a2847 100%)',
                  borderRadius: '12px',
                  padding: dimensions.padding,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.1) inset',
                  border: '1px solid rgba(212,175,55,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: isMobile ? '14px' : '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative corner accents */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: isMobile ? '60px' : '80px',
                  height: isMobile ? '60px' : '80px',
                  background: 'linear-gradient(135deg, transparent 0%, rgba(212,175,55,0.08) 100%)',
                  borderBottomLeftRadius: '100%'
                }} />

                {/* Item number */}
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: dimensions.fontSize.number,
                  fontWeight: 700,
                  color: 'var(--gold)',
                  opacity: 0.15,
                  lineHeight: 1,
                  alignSelf: 'flex-start'
                }}>
                  {item.num}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: dimensions.fontSize.title,
                  fontWeight: 500,
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                  marginTop: isMobile ? '-6px' : '-10px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {item.title}
                </h3>

                {/* Divider */}
                <div style={{
                  width: isMobile ? '50px' : '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
                  marginTop: isMobile ? '-6px' : '-10px'
                }} />

                {/* Body text */}
                <p style={{
                  fontSize: dimensions.fontSize.body,
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7,
                  flex: 1
                }}>
                  {item.body}
                </p>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--gold) 0%, transparent 50%, var(--gold) 100%)',
                  opacity: 0.3
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Center glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '150px' : '200px',
        height: isMobile ? '150px' : '200px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1
      }} />
    </div>
  )
}
