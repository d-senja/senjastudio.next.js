import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth scroll, mounted once in _app.js.
 *
 * Renders nothing — Lenis 1.x drives window scroll directly and needs no DOM
 * wrapper, so a visitor who prefers reduced motion simply never gets an
 * instance and keeps the browser's native scrolling untouched.
 *
 * Deliberately imports no GSAP. This component is in the _app bundle, so
 * anything it pulls in is downloaded by every page on the site — importing
 * ScrollTrigger here put 50 kB on /blog, /terms and /contact, none of which
 * animate anything. Nothing on the site subscribes to scroll position any
 * more either: the homepage hero autoplays on load rather than scrubbing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Replaces the `html { scroll-behavior: smooth }` rule that was removed
      // from globals.css. Two smooth-scroll implementations on one page fight
      // each other, so exactly one of them owns anchor jumps.
      anchors: true,
      // Leave touch alone. Native momentum scrolling on a phone is better than
      // anything we can synthesise, and the hero animation is disabled there.
      syncTouch: false,
    })

    // Read by the back-to-top button in Layout.js — window.scrollTo() bypasses
    // Lenis and desyncs it.
    window.__lenis = lenis

    // Page-level consumers (SnapToSection) mount below this component in the
    // tree, so their effects run *first* and find no instance. Announce it
    // rather than making them poll.
    window.dispatchEvent(new CustomEvent('lenis:ready'))

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      delete window.__lenis
      lenis.destroy()
    }
  }, [])

  return null
}
