import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import s from './HeroTransform.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Where each beat's copy latches in, as a fraction of the section's scroll
   travel. Latched rather than scrubbed: the laptop rewinds if you scroll back
   up, the sentences do not. */
const COPY_AT = [0.06, 0.4, 0.73]

/* ── the fake page ───────────────────────────────────────────────
   Rendered in its RESOLVED state. The dated version exists only as the
   transform offsets in buildTimeline(). */

function FakePage() {
  return (
    <div className={s.page}>
      <div className={s.fpNav}>
        <div className={s.fpLogo}>
          <span className={s.fpLogoMark} />
          Hartley &amp; Coe
        </div>
        <div className={s.fpNavLinks}>
          <span>Home</span>
          <span>Services</span>
          <span className={s.fpNavExtra}>Remortgage</span>
          <span className={s.fpNavExtra}>News</span>
          <span className={s.fpNavExtra}>Calculators</span>
          <span className={s.fpNavLast}>Contact</span>
        </div>
      </div>

      <div className={s.fpStock} />

      {/* Both headlines share one slot, so beat 3 is a cross-fade that moves
          nothing beneath it. */}
      {/* A div, not a heading: the laptop is aria-hidden, and a real <h3>
          here would still show up in a document-outline audit as a heading
          with no section. */}
      <div className={s.fpHeadline}>
        <span className={s.fpHeadlineOld}>Straightforward Impartial Advice</span>
        <span className={s.fpHeadlineNew}>
          Remortgaging in Leeds? Know where you stand in 10 minutes.
        </span>
      </div>

      <p className={s.fpSub}>
        We are a whole of market mortgage brokerage offering a friendly, professional
        service to clients across the region.
      </p>

      <div className={s.fpReviews}>
        <div className={s.fpStarsRow}>
          <span className={s.fpStarsGrey} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => <span key={i}>★</span>)}
          </span>
          <span className={s.fpStarsGold} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => <span key={i}>★</span>)}
          </span>
          <span className={s.fpStarsLabel}>4.9 · 212 Google reviews</span>
        </div>
        <div className={s.fpReviewCard}>
          “They got us a decision in principle in two days when our own bank had
          written us off. Genuinely could not have been easier.”
          <div className={s.fpReviewAttr}>J. Mensah · First-time buyer</div>
        </div>
      </div>

      <div className={s.fpCta}>
        <span className={s.fpCtaLink}>Contact Us</span>
        <span className={s.fpCtaBtn}>Book a 15-min call →</span>
      </div>

      <div className={s.fpCols}>
        {[
          ['First-time buyers', 'Advice for those taking their first step onto the property ladder.'],
          ['Remortgaging', 'Review your existing deal and explore the options available to you.'],
          ['Buy to let', 'Specialist guidance for landlords and portfolio investors.'],
        ].map(([title, body]) => (
          <div key={title} className={s.fpCol}>
            <div className={s.fpColTitle}>{title}</div>
            <div className={s.fpColBody}>{body}</div>
          </div>
        ))}
      </div>

      <div className={s.fpFee}>
        <span className={s.fpFeeNum}>£0</span>
        <span className={s.fpFeeLabel}>No broker fee · ever</span>
      </div>

      <div className={s.fpTestimonial}>
        <div className={s.fpAdviser}>
          <span className={s.fpAvatar}>
            {/* Placeholder headshot. Swap for a real photo without touching
                any of the transforms. */}
            <svg viewBox="0 0 44 40" width="34" height="31" aria-hidden="true">
              <circle cx="22" cy="13" r="9" fill="#7d8fa5" />
              <path d="M4 40c0-9.4 8-15 18-15s18 5.6 18 15z" fill="#7d8fa5" />
            </svg>
          </span>
        </div>
        <div className={s.fpQuoteBlock}>
          <div className={s.fpQuote}>“Sarah was brilliant from start to finish.”</div>
          <div className={s.fpAdviserName}>Sarah Whitfield · Mortgage &amp; Protection Adviser</div>
        </div>
      </div>

      <div className={s.fpFooter}>
        <span>© Hartley &amp; Coe Ltd</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Complaints</span>
        <span className={s.fpFooterFee}>Our fee is typically £499, payable on offer.</span>
      </div>
    </div>
  )
}

/* ── the timeline ────────────────────────────────────────────────
   Three labelled units on one scrubbed ScrollTrigger. Every tween is a
   transform or an opacity; nothing here touches top/height/width/box-shadow,
   so the whole thing stays on the compositor. */

function buildTimeline(section) {
  const q = gsap.utils.selector(section)

  const el = {
    body: q(`.${s.laptopBody}`),
    reviews: q(`.${s.fpReviews}`),
    starsGrey: q(`.${s.fpStarsGrey} span`),
    starsGold: q(`.${s.fpStarsGold} span`),
    fee: q(`.${s.fpFee}`),
    footerFee: q(`.${s.fpFooterFee}`),
    navExtra: q(`.${s.fpNavExtra}`),
    navLast: q(`.${s.fpNavLast}`),
    adviser: q(`.${s.fpAdviser}`),
    quote: q(`.${s.fpQuoteBlock}`),
    hOld: q(`.${s.fpHeadlineOld}`),
    hNew: q(`.${s.fpHeadlineNew}`),
    ctaLink: q(`.${s.fpCtaLink}`),
    ctaBtn: q(`.${s.fpCtaBtn}`),
    stock: q(`.${s.fpStock}`),
    sub: q(`.${s.fpSub}`),
    cols: q(`.${s.fpCol}`),
  }

  // The "before" state is declared in HeroTransform.module.css, not here — see
  // the comment on that block for why. GSAP reads it off the computed style
  // and every tween below animates forward from it.

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  })

  // The frame settles across the whole run, underneath the three beats.
  tl.to(el.body, { rotateX: 0, scale: 1, duration: 3, ease: 'none' }, 0)

  // ── BEAT 1 — the reviews surface
  tl.addLabel('beat1', 0)
    .to(el.reviews, { y: 0, opacity: 1, duration: 0.85 }, 'beat1')
    .to(el.starsGrey, { opacity: 0, duration: 0.3, stagger: 0.06 }, 'beat1+=0.5')
    .to(el.starsGold, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06 }, 'beat1+=0.5')

  // ── BEAT 2 — the person appears, the fee comes out of the footer
  tl.addLabel('beat2', 1)
    .to(el.navExtra, { opacity: 0, y: -6, duration: 0.4, stagger: 0.04 }, 'beat2')
    // Fading the surplus links leaves their width behind, which reads as a
    // hole rather than a tidier nav. Close it by sliding the last item across
    // the gap — a transform, where animating the gap itself would not be.
    .to(
      el.navLast,
      {
        x: () => -el.navExtra.reduce((w, n) => w + n.offsetWidth + 18, 0),
        duration: 0.5,
      },
      'beat2+=0.15'
    )
    .to(el.fee, { y: 0, scale: 1, opacity: 1, duration: 0.8 }, 'beat2')
    .to(el.footerFee, { opacity: 0, duration: 0.3 }, 'beat2')
    .to(el.quote, { x: 0, duration: 0.6 }, 'beat2+=0.2')
    .to(el.adviser, { opacity: 1, x: 0, scale: 1, duration: 0.6 }, 'beat2+=0.3')

  // ── BEAT 3 — the page resolves
  tl.addLabel('beat3', 2)
    .to(el.stock, { opacity: 0, duration: 0.6 }, 'beat3')
    // "A friendly, professional service to clients across the region" is the
    // same vague filler as the old headline. Leaving it in the resolved page
    // would contradict the beat.
    .to(el.sub, { opacity: 0, duration: 0.4 }, 'beat3')
    .to(el.hOld, { opacity: 0, y: -14, duration: 0.4 }, 'beat3')
    .to(el.hNew, { opacity: 1, y: 0, duration: 0.5 }, 'beat3+=0.25')
    .to(el.ctaLink, { opacity: 0, duration: 0.3 }, 'beat3+=0.2')
    .to(el.ctaBtn, { opacity: 1, scale: 1, duration: 0.5 }, 'beat3+=0.4')
    .to(el.cols, { y: 0, duration: 0.5, stagger: 0.05 }, 'beat3+=0.3')

  // ── the copy. Separate one-way triggers rather than tweens on the scrubbed
  // timeline, so a sentence that has been read stays read.
  q(`.${s.beat}`).forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: () =>
          'top top-=' +
          Math.round(COPY_AT[i] * (section.offsetHeight - window.innerHeight)),
        toggleActions: 'play none none none',
      },
    })
  })
}

export default function HeroTransform({ onBookClick }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const section = root.current
      const mm = gsap.matchMedia()

      // Matches the media query in HeroTransform.module.css exactly. Below
      // 768px, or when reduced motion is preferred, no timeline is ever built
      // and the markup stays in its resolved state with all three lines
      // already visible.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // Picked up by SmoothScroll on every Lenis tick. Registering the
        // callback rather than subscribing to the instance keeps this working
        // regardless of which effect runs first.
        window.__onLenisScroll = ScrollTrigger.update

        gsap.ticker.lagSmoothing(0)
        buildTimeline(section)

        return () => {
          delete window.__onLenisScroll
          gsap.ticker.lagSmoothing(500, 33)
        }
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className={s.section} aria-labelledby="transform-eyebrow">
      <div className={s.sticky}>
        <div className={s.stage}>
          {/* A picture of a website, not a website. Hidden from assistive tech
              so it cannot be read as a second page of content, and containing
              nothing focusable, so it cannot trap a keyboard. */}
          <div className={s.laptop} aria-hidden="true">
            <div className={s.laptopBody}>
              <div className={s.bezel}>
                <span className={s.notch} />
                <div className={s.screen}>
                  <FakePage />
                </div>
              </div>
              <div className={s.base}>
                <div className={s.baseNotch} />
              </div>
            </div>
          </div>

          <div className={s.beats}>
            <p className={s.eyebrow} id="transform-eyebrow">
              What we change
            </p>
            <p className={s.beat}>
              The first mortgage broker website that behaves like it&rsquo;s <em>2026.</em>
            </p>
            <p className={s.beat}>
              Built for mortgage brokers. <em>Nobody else.</em>
            </p>
            <p className={s.beat}>
              Rebuilt from scratch. <em>Live in seven days.</em>
            </p>
            <button type="button" className={`btn-primary ${s.cta}`} onClick={onBookClick}>
              Book a free 30-minute review
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
