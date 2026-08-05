import { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import s from './HeroTeardown.module.css'

gsap.registerPlugin(useGSAP)

/* ── the audit ───────────────────────────────────────────────────
   Boxes are in canvas coordinates (the 1200×750 space defined in the CSS
   header). `side` decides which corner the label hangs off, purely so no two
   labels collide at any scale. */

const AUDITS = [
  { key: 'nav', label: '12 nav links', box: [20, 60, 1160, 32], side: 'below' },
  { key: 'stock', label: 'Stock photo — 41,000 other sites use it', box: [24, 106, 1152, 236], side: 'inside' },
  { key: 'headline', label: 'Headline says nothing', box: [24, 356, 596, 48], side: 'above' },
  { key: 'reviews', label: 'No reviews anywhere', box: [648, 356, 528, 214], side: 'above' },
  { key: 'link', label: 'No way to book a call', box: [24, 592, 232, 28], side: 'above' },
]

/* The wireframe the rebuild fills. Each box is positioned to match the new-site
   element that lands in it, so the skeleton reads as a plan rather than noise. */
const WIRES = [
  [56, 20, 1088, 36],
  [56, 150, 620, 178],
  [56, 352, 520, 48],
  [56, 424, 300, 52],
  [760, 120, 384, 526],
  [648, 460, 372, 150],
  [56, 660, 1088, 76],
]

/* ── the "before" site ───────────────────────────────────────────
   Believable-bad, not parody. Every complaint the audit makes has to be
   visibly true on screen, or the tags read as marketing. */

const OLD_NAV = [
  'Home', 'About Us', 'Our Services', 'Mortgages', 'Remortgaging',
  'Buy to Let', 'Insurance', 'Calculators', 'News', 'Testimonials',
  'Useful Links', 'Contact Us',
]

const OLD_BODY = [
  'Hartley & Coe are a whole of market mortgage brokerage offering a friendly and professional service to clients throughout the region and beyond. Established for over twenty years, we pride ourselves on the quality of the advice we provide to each and every one of our valued customers.',
  'Whether you are a first time buyer taking your first steps onto the property ladder, or an experienced landlord looking to expand an existing portfolio, our experienced team of advisers are on hand to guide you through every stage of the process from start to finish.',
  'We have access to a comprehensive range of products from across the market and are able to source competitive rates on your behalf. Please do not hesitate to contact a member of our team who will be happy to discuss your requirements in more detail at your convenience.',
]

function OldSite() {
  return (
    <div className={s.old}>
      <div className={s.oTop}>
        <div className={s.oLogo}>
          <svg viewBox="0 0 32 26" width="26" height="21" aria-hidden="true">
            <path d="M16 2 2 12h4v12h20V12h4z" fill="#7a1f2b" />
            <rect x="13" y="16" width="6" height="8" fill="#c9c2b4" />
          </svg>
          <span>
            Hartley &amp; Coe
            <em>Mortgage &amp; Insurance Services</em>
          </span>
        </div>
        <div className={s.oPhone}>
          Call us today:<strong>0113 496 0000</strong>
        </div>
      </div>

      <div className={s.oNav}>
        {OLD_NAV.map((item, i) => (
          <span key={item} className={s.oNavItem}>
            {i > 0 && <i className={s.oNavSep}>|</i>}
            {item}
          </span>
        ))}
      </div>

      {/* The stock photo, drawn rather than loaded — it has to be desaturated,
          generic and instantly recognisable as licensed, which is easier to
          guarantee in SVG than to find in a real image. */}
      <div className={s.oStock}>
        <svg viewBox="0 0 1152 236" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="htStockSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b9c4cf" />
              <stop offset="100%" stopColor="#8e9aa6" />
            </linearGradient>
          </defs>
          <rect width="1152" height="236" fill="url(#htStockSky)" />
          {[80, 200, 320, 900, 1020].map((x, i) => (
            <rect key={x} x={x} y={20 + i * 12} width="86" height="216" fill="#7d8894" opacity="0.5" />
          ))}
          <g fill="#4a525c">
            <circle cx="470" cy="74" r="30" />
            <path d="M406 236c0-40 28-62 64-62s64 22 64 62z" />
            <circle cx="690" cy="74" r="30" />
            <path d="M626 236c0-40 28-62 64-62s64 22 64 62z" />
          </g>
          <g stroke="#cfd6dd" strokeWidth="16" strokeLinecap="round" fill="none">
            <path d="M520 150h120" />
          </g>
        </svg>
      </div>

      <div className={s.oHeadline}>Welcome to Hartley &amp; Coe Mortgages</div>

      <div className={s.oBody}>
        {OLD_BODY.map((para, i) => (
          <p key={i} className={s.oCol}>{para}</p>
        ))}
      </div>

      {/* Where a broker's social proof should be. Instead: a news list. */}
      <div className={s.oSide}>
        <div className={s.oSideTitle}>Latest News</div>
        {[
          ['Bank of England holds base rate', '14/03/2019'],
          ['Stamp duty changes explained', '02/11/2018'],
          ['Our office will be closed over Easter', '19/04/2018'],
          ['Welcome to our new website!', '08/06/2011'],
        ].map(([title, date]) => (
          <div key={title} className={s.oSideItem}>
            {title} <span>&mdash; {date}</span>
          </div>
        ))}
      </div>

      <div className={s.oLink}>Click here to contact us &raquo;</div>

      <div className={s.oFooter}>
        <span>
          Hartley &amp; Coe Ltd is authorised and regulated by the Financial Conduct
          Authority. Your home may be repossessed if you do not keep up repayments on
          your mortgage. Calls may be recorded for training purposes.
        </span>
        <span className={s.oCredit}>Site by WebSolutions &copy; 2011</span>
      </div>
    </div>
  )
}

/* ── the "after" site ────────────────────────────────────────────
   Every element here lands in a wireframe box above.

   The rate strip along the foot is the point of the whole design. It is the
   artifact of a broker's actual job, and it rhymes against the old site's dead
   "Latest News — 08/06/2011" list: the same slot, one dated 2011, one stamped
   this morning. Three service cards in a row would have said nothing. */

const RATES = [
  ['2 yr fixed', '4.19%'],
  ['5 yr fixed', '4.02%'],
  ['Tracker', '4.55%'],
  ['Max LTV', '95%'],
]

function NewSite() {
  return (
    <div className={s.new}>
      <div className={s.nNav}>
        <div className={s.nLogo}>
          <span className={s.nLogoMark} />
          Hartley &amp; Coe
        </div>
        <div className={s.nNavLinks}>
          <span>Mortgages</span>
          <span>Remortgage</span>
          <span>Buy to let</span>
          <span className={s.nNavBtn}>Book a call</span>
        </div>
      </div>

      <div className={s.nEyebrow}>Leeds · Whole of market · Est. 2004</div>

      <div className={s.nHeadline}>
        Know where you stand{' '}
        <em className={s.nHeadlineAccent}>by Friday.</em>
      </div>

      <div className={s.nSub}>
        Most brokers take three weeks to tell you. We&rsquo;ll tell you this week
        &mdash; including if the answer is no.
      </div>

      <div className={s.nCtaRow}>
        <span className={s.nCta}>Book a 15-minute call</span>
        <span className={s.nCtaNote}>No fee. Ever.</span>
      </div>

      <div className={s.nAdviser}>
        {/* A monogram, not a silhouette glyph. A generic person-icon on a page
            whose whole argument is "show a real human" undercuts the argument;
            a set monogram is honest about being a mark. */}
        <span className={s.nAvatar} aria-hidden="true">SW</span>
        <span>
          <span className={s.nAdviserName}>Sarah Whitfield</span>
          <span className={s.nAdviserRole}>
            Adviser since 2004 · She answers her own phone
          </span>
        </span>
      </div>

      {/* The hero mass. A Leeds red-brick facade, cropped the way a photograph
          would be — the roofline and both edges run out of frame, because a
          whole house centred in a box reads as a clip-art icon rather than a
          picture. Swap the <svg> for an <img> the moment there is a licensed
          photograph; nothing else in the layout has to move. */}
      <div className={s.nArt}>
        <svg viewBox="0 0 384 526" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="htGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D8AC5E" />
              <stop offset="100%" stopColor="#9A7433" />
            </linearGradient>
            <linearGradient id="htFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0C201A" stopOpacity="0" />
              <stop offset="100%" stopColor="#0C201A" stopOpacity="0.62" />
            </linearGradient>
            {/* A pattern, not 272 hand-generated paths. Two courses tall so the
                vertical joints stagger. */}
            <pattern id="htBrick" width="56" height="32" patternUnits="userSpaceOnUse">
              <rect width="56" height="32" fill="#0F241D" />
              <g stroke="#16332B" strokeWidth="1">
                <path d="M0 0h56M0 16h56" />
                <path d="M0 0v16M28 16v16" />
              </g>
            </pattern>
          </defs>

          {/* brickwork, running to all four edges */}
          <rect width="384" height="526" fill="url(#htBrick)" />

          {/* first-floor sash windows, stone lintel and sill */}
          <g>
            <rect x="38" y="44" width="100" height="12" fill="#24473C" />
            <rect x="228" y="44" width="100" height="12" fill="#24473C" />
            <rect x="44" y="56" width="88" height="116" fill="url(#htGlow)" />
            <rect x="234" y="56" width="88" height="116" fill="#16332B" />
            <g stroke="#0F241D" strokeWidth="4">
              <path d="M88 56v116M44 114h88" />
              <path d="M278 56v116M234 114h88" />
            </g>
            <rect x="38" y="172" width="100" height="10" fill="#24473C" />
            <rect x="228" y="172" width="100" height="10" fill="#24473C" />
          </g>

          {/* string course, edge to edge */}
          <rect x="0" y="208" width="384" height="14" fill="#1C3A31" />

          {/* ground floor — the bay runs out of the left edge. Left unlit: the
              white review card lands on this corner, and two lit sources
              underneath it would fight. */}
          <rect x="-20" y="254" width="170" height="216" fill="#16332B" />
          <g stroke="#0F241D" strokeWidth="5">
            <path d="M40 254v216M96 254v216M-20 340h170" />
          </g>

          {/* door, fanlight lit above it */}
          <rect x="232" y="246" width="96" height="224" fill="#24473C" />
          <path d="M240 278a40 40 0 0 1 80 0z" fill="url(#htGlow)" />
          <rect x="240" y="286" width="80" height="184" fill="#132A22" />
          <circle cx="311" cy="392" r="4" fill="#B8904B" />
          <rect x="222" y="462" width="116" height="8" fill="#24473C" />

          {/* pavement */}
          <rect y="470" width="384" height="56" fill="#16332B" />

          {/* the review card lands on this corner — calm it down */}
          <rect y="366" width="384" height="160" fill="url(#htFade)" />
        </svg>
      </div>

      <div className={s.nProof}>
        <div className={s.nProofStars} aria-hidden="true">★★★★★</div>
        <div className={s.nProofQuote}>
          “A decision in two days, when our own bank had written us off.”
        </div>
        <div className={s.nProofAttr}>J. Mensah · Headingley · First-time buyer</div>
      </div>

      <div className={s.nRates}>
        <div className={s.nRatesHead}>
          <span className={s.nRatesTitle}>Today&rsquo;s best rates</span>
          <span className={s.nRatesStamp}>Updated 09:15</span>
        </div>
        {RATES.map(([term, rate]) => (
          <div key={term} className={s.nRate}>
            <span className={s.nRateTerm}>{term}</span>
            <span className={s.nRateNum}>{rate}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── the timeline ────────────────────────────────────────────────
   One autoplaying timeline. No ScrollTrigger — the sequence owes nothing to
   where the visitor has scrolled to. Every tween is a transform or an opacity.

   The "before" state lives in the CSS media query, not here, so the resolved
   page is what renders without JS. buildTimeline animates forward from it. */

function buildTimeline(section) {
  const q = gsap.utils.selector(section)

  const el = {
    frame: q(`.${s.browser}`),
    urlOld: q(`.${s.urlOld}`),
    urlNew: q(`.${s.urlNew}`),
    grid: q(`.${s.grid}`),
    audits: q(`.${s.audit}`),
    wires: q(`.${s.wire}`),
    old: q(`.${s.old} > *`),
    newSite: q(`.${s.new}`),
    newParts: q(`.${s.new} > *`),
    cta: q(`.${s.nCta}`),
    copy: q(`.${s.copyLine}`),
    hint: q(`.${s.hint}`),
  }

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  // ── the frame settles in, then holds. The pause is deliberate: the ugly
  // site has to be read before it is criticised, or the tags mean nothing.
  tl.to(el.frame, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }, 0)

  // ── AUDIT — the grid snaps on and the complaints stagger in
  tl.to(el.grid, { opacity: 1, duration: 0.25 }, 0.7)
    .to(el.audits, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.11 }, 0.78)

  // ── EJECT — the tags flash, then everything they pointed at is thrown out.
  // Each old element gets its own vector so the exit reads as debris, not as a
  // single group transition.
  tl.to(el.audits, { filter: 'brightness(2.4)', duration: 0.11, yoyo: true, repeat: 1 }, 1.62)
    .to(el.audits, { opacity: 0, scale: 0.94, duration: 0.25 }, 1.82)
    .to(el.grid, { opacity: 0, duration: 0.3 }, 1.82)
    .to(
      el.old,
      {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.in',
        stagger: { each: 0.05, from: 'random' },
        x: () => gsap.utils.random(-520, 520),
        y: () => gsap.utils.random(340, 760),
        rotate: () => gsap.utils.random(-32, 32),
      },
      1.85
    )

  // ── SKELETON — what is left of the page is a plan.
  // The pulse has to finish before the fade-out at 2.92 starts: two tweens on
  // the same opacity, overlapping, made the skeleton flicker back up.
  tl.to(el.wires, { opacity: 1, duration: 0.2, stagger: 0.03 }, 2.34)
    .to(el.wires, { opacity: 0.35, duration: 0.14, yoyo: true, repeat: 1 }, 2.62)

  // ── REBUILD — blocks fill, then colour floods.
  // The greyscale wash is on the container while the parts land, so the page
  // assembles in grey and only becomes a brand at the end.
  tl.to(el.newSite, { opacity: 1, duration: 0.01 }, 2.82)
    .to(el.newParts, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06 }, 2.84)
    .to(el.wires, { opacity: 0, duration: 0.3 }, 2.92)
    .to(el.newSite, { filter: 'grayscale(0) saturate(1)', duration: 0.55 }, 3.35)

  // ── the CTA lands last, and the address bar resolves with it
  tl.fromTo(
    el.cta,
    { scale: 0.82 },
    { scale: 1, duration: 0.5, ease: 'back.out(2.6)' },
    3.86
  )
    .to(el.urlOld, { opacity: 0, duration: 0.3 }, 3.86)
    .to(el.urlNew, { opacity: 1, duration: 0.35 }, 3.94)

  // ── our copy, once the argument has already been made on screen
  tl.to(el.copy, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, 4.15)
    .to(el.hint, { opacity: 1, duration: 0.4 }, 4.5)

  return tl
}

export default function HeroTeardown({ onBookClick }) {
  const root = useRef(null)
  const tlRef = useRef(null)
  const [canReplay, setCanReplay] = useState(false)

  useGSAP(
    () => {
      const section = root.current

      // The canvas is a fixed 1200×750 box scaled to fit whatever the frame
      // ends up being. Measuring beats a media-query ladder: the frame is
      // constrained by viewport HEIGHT as well as width, so its size is not
      // predictable from a breakpoint. This runs in every case — the static
      // fallbacks need the canvas scaled just as much as the animated one does.
      const viewport = section.querySelector(`.${s.viewport}`)
      const fit = () => section.style.setProperty('--fit', viewport.clientWidth / 1200)

      fit()
      const ro = new ResizeObserver(fit)
      ro.observe(viewport)

      const mm = gsap.matchMedia()

      // Matches the media query in HeroTeardown.module.css exactly. Below 768px,
      // or when reduced motion is preferred, no timeline is ever built and the
      // markup stays in its resolved state.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        tlRef.current = buildTimeline(section)
        tlRef.current.eventCallback('onComplete', () => setCanReplay(true))

        return () => {
          tlRef.current = null
          setCanReplay(false)
        }
      })

      // matchMedia builds its own context, so useGSAP's revert does not reach
      // the timeline inside it. Kill both explicitly.
      return () => {
        ro.disconnect()
        mm.revert()
      }
    },
    { scope: root }
  )

  // restart() only — never invalidate() first. The ejection vectors are
  // function-based, so invalidating looks like the way to re-randomise them,
  // but by the time this button exists the timeline has completed and its
  // targets sit at their END state. GSAP would record that as the new start
  // and the replay would animate from nothing to nothing.
  const replay = useCallback(() => {
    tlRef.current?.restart()
  }, [])

  return (
    <section ref={root} className={s.section} aria-labelledby="teardown-eyebrow">
      <div className={s.stage}>
        {/* A picture of a website, not a website. Hidden from assistive tech so
            it cannot be read as a second page of content, and containing
            nothing focusable, so it cannot trap a keyboard. */}
        <div className={s.browser} aria-hidden="true">
          <div className={s.chrome}>
            <span className={s.dots}>
              <i /><i /><i />
            </span>
            <span className={s.urlBar}>
              <span className={s.urlOld}>
                <span className={s.urlWarn}>Not secure</span>
                hartleycoe-mortgages.co.uk/index.html
              </span>
              <span className={s.urlNew}>
                <svg viewBox="0 0 12 14" width="9" height="11" aria-hidden="true">
                  <path
                    d="M3 6V4a3 3 0 0 1 6 0v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <rect x="1" y="6" width="10" height="7.5" rx="1.5" fill="currentColor" />
                </svg>
                hartleycoe.co.uk
              </span>
            </span>
          </div>

          <div className={s.viewport}>
            <div className={s.canvas}>
              <OldSite />

              <div className={s.grid} />

              {AUDITS.map(({ key, label, box, side }) => (
                <div
                  key={key}
                  className={s.audit}
                  data-side={side}
                  style={{ left: box[0], top: box[1], width: box[2], height: box[3] }}
                >
                  <span className={s.auditLabel}>{label}</span>
                </div>
              ))}

              {WIRES.map((box, i) => (
                <div
                  key={i}
                  className={s.wire}
                  style={{ left: box[0], top: box[1], width: box[2], height: box[3] }}
                />
              ))}

              <NewSite />
            </div>
          </div>
        </div>

        <div className={s.copy}>
          <p className={s.eyebrow} id="teardown-eyebrow">
            What we change
          </p>
          {/* No <h1> here — the hero below still owns it. */}
          <p className={`${s.copyLine} ${s.copyHead}`}>
            Mortgage broker websites, <em>rebuilt.</em>
          </p>
          <p className={`${s.copyLine} ${s.copySub}`}>
            Built for mortgage brokers and nobody else. Live in seven days.
          </p>
          <div className={s.copyLine}>
            <button type="button" className={`btn-primary ${s.cta}`} onClick={onBookClick}>
              Book a free 30-minute review
            </button>
          </div>
        </div>

        <div className={s.hint} aria-hidden="true">
          <span className={s.hintArrow} />
        </div>

        {canReplay && (
          <button type="button" className={s.replay} onClick={replay}>
            ↻ Replay
          </button>
        )}
      </div>

      {/* The audit points as text, for anyone who never sees the animation —
          mobile, reduced motion, or no JS at all. Visually hidden on desktop,
          where the same five points are made on screen. */}
      <ul className={s.staticPoints}>
        {AUDITS.map(({ key, label }) => (
          <li key={key}>{label}</li>
        ))}
      </ul>
    </section>
  )
}
