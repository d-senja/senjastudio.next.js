# Hero Teardown — design

Replaces the scroll-driven `HeroTransform` laptop with an autoplaying, near-full-bleed
"bad site → audit → rebuild" sequence.

## Why

The existing `HeroTransform` already carried the bad-site → good-site idea, but it
failed on four counts the owner named: it feels generic, it is too small to be
cinematic, the transformation is too subtle to read, and it has no wow factor.

Root cause of "too subtle": the before state is only *mildly* dated, so a visitor
cannot see what changed. The fix is a before state a broker recognises as broken.

## Decisions

| Decision | Choice | Rejected |
|---|---|---|
| Trigger | Autoplay on load, ~4.4s | Scroll-driven (nothing happens until the visitor acts) |
| Framing | Browser chrome, ~92vw | Edge-to-edge (visitor thinks *our* site is broken); laptop (generic) |
| Length | One 100vh screen | 250vh pinned scroll story |
| Concept | Teardown + audit tags | Wall of sites; refinish sweep |

The browser chrome is load-bearing, not decorative: it declares "this is someone
else's site" in frame 1. The fake URL carries the same weight — `⚠ Not secure`
becomes `🔒` during the rebuild.

## Sequence

| t | Beat |
|---|---|
| 0.0 | Frame settles in. Ugly site sits, unexplained. |
| 0.7 | Audit grid snaps on; 5 red outline boxes + labels stagger in. |
| 1.8 | Tags flash. Every tagged element is flung off-screen with rotation. |
| 2.4 | Bare wireframe skeleton remains, pulses once. |
| 2.8 | New site fills the skeleton: blocks → type → colour. |
| 4.0 | Gold CTA pops with overshoot. URL bar resolves to https. |
| 4.3 | Copy + CTA + scroll hint fade in beneath the frame. |

## The five audit tags

These are the sales pitch, delivered without body copy.

- `Headline says nothing` → "Welcome to Hartley & Coe Mortgages"
- `Stock photo — 41,000 other sites use it` → the handshake
- `12 nav links` → the nav bar
- `No reviews anywhere` → the empty space where they belong
- `No way to book a call` → a blue underlined text link

## Architecture

`components/HeroTeardown.js` + `HeroTeardown.module.css`. `HeroTransform` and its
stylesheet are deleted — git history is the revert path. Removing it also took
the last `ScrollTrigger` import off the homepage, and left the
`window.__onLenisScroll` hook in `SmoothScroll` with no subscriber, so that was
removed too.

Inherits two proven ideas from `HeroTransform`:

1. **Fixed 1200×750 canvas, every child absolutely positioned, scaled to fit.**
   Nothing inside reflows during the timeline, and one scale value handles every
   breakpoint. `--fit` is set by a `ResizeObserver` on the frame.
2. **CSS owns the state, not JS.** The default (mobile / reduced-motion) styles
   render the resolved page. The animated before-state is opted into by the same
   media query that gates the timeline, so there is no flash and no-JS still works.

The timeline is a single `gsap.timeline()` — no ScrollTrigger, no Lenis coupling.
Every tween is a transform or opacity.

## Accessibility

- The whole frame is `aria-hidden`. It is a picture of a website, not a website,
  and contains nothing focusable.
- No `<h1>` — the real hero below still owns it.
- Below 768px or under `prefers-reduced-motion`, no timeline is built and the
  markup stays resolved.
- A `↻ Replay` control lets anyone watch it again.

## Out of scope

A bespoke mobile before/after treatment. Mobile currently falls back to the
resolved site plus the audit points as text.
