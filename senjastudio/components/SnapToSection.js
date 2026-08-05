import { useEffect } from 'react'
import Snap from 'lenis/snap'

/**
 * Proximity scroll snap for a single section. Renders nothing.
 *
 * When a scroll gesture would come to rest near the target's top edge, the
 * remaining distance is animated away so the section sits framed. Scroll hard
 * and you pass straight through — it never locks.
 *
 * This defers entirely to `lenis/snap`, which ships with Lenis and is already
 * installed. Two earlier approaches were wrong for reasons worth recording:
 *
 *   CSS `scroll-snap-type` fights Lenis rather than cooperating with it. Lenis
 *   drives window.scrollY from its own rAF loop, and the browser's snapping
 *   argues with it on every wheel tick.
 *
 *   A hand-rolled snap that debounced native `scroll` events also fails, less
 *   obviously: those events stop firing a fraction before Lenis's eased glide
 *   actually finishes, so the correction is issued mid-glide and Lenis's own
 *   animation immediately overrides it. The snap runs and is silently
 *   discarded, which looks exactly like it never fired at all.
 *
 * Lenis's own plugin debounces `virtual-scroll` — the input gesture — instead,
 * so it decides where you are heading before Lenis starts moving there, and
 * there is nothing to race.
 *
 * Touch is excluded by the plugin itself (it ignores `touchmove`), and under
 * reduced motion SmoothScroll never creates a Lenis instance, so no instance
 * means no snap. Neither case needs a media query here.
 */
export default function SnapToSection({ targetId, align = 'start' }) {
  useEffect(() => {
    let snap = null
    let cancelled = false

    const attach = () => {
      if (cancelled || snap) return

      const lenis = window.__lenis
      const el = document.getElementById(targetId)
      if (!lenis || !el) return

      snap = new Snap(lenis, {
        type: 'proximity',
        // Half a viewport either side of the edge. An earlier hand-rolled
        // version used 24%, which on a 707px-tall window was a 170px catch
        // zone — narrow enough that a normal wheel flick sailed past it.
        distanceThreshold: '50%',

        // The important number. The plugin debounces the trailing edge of
        // `virtual-scroll`, and Lenis's glide runs for 1.1s after your input
        // ends. At the 500ms default the glide has already carried past the
        // target before the snap fires, so it drags you back up — you see
        // slow-down, overshoot, then a pop. Firing at 120ms lands inside the
        // glide, so the snap redirects motion that is still travelling and
        // reads as a single deceleration into place.
        debounce: 120,

        // Long enough to blend with the glide it is taking over from. Shorter
        // than this and the hand-off is a visible change of pace.
        duration: 0.7,
      })

      snap.addElement(el, { align: [align] })
    }

    // SmoothScroll lives in _app and this lives on the page, so React runs this
    // effect first and window.__lenis does not exist yet. Attach on the ready
    // event instead; the direct call covers a remount, when it already does.
    attach()
    window.addEventListener('lenis:ready', attach)

    return () => {
      cancelled = true
      window.removeEventListener('lenis:ready', attach)
      snap?.destroy()
      snap = null
    }
  }, [targetId, align])

  return null
}
