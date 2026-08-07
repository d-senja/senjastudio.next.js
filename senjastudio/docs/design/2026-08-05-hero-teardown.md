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

1. **Fixed canvas, every child absolutely positioned, scaled to fit.**
   Nothing inside reflows during the timeline, and one scale value handles every
   width. `--fit` / `--fit-m` are set by a `ResizeObserver` on the frame.
2. **CSS owns the state, not JS.** The default (reduced-motion) styles render
   the resolved page. The animated before-state is opted into by the same media
   query that gates the timeline, so there is no flash and no-JS still works.

## Two canvases

There is a landscape 1200×750 canvas and a portrait 340×600 one. Both are
always in the DOM; `@media (min-width: 768px)` picks which is displayed, and
`gsap.matchMedia` builds the timeline against that one.

A single canvas cannot serve both. Scaled to fit a 277px phone frame, the
landscape canvas lands at `--fit` 0.3: the rebuilt site's body copy renders at
3px and the nav links at 3.7px, so the section makes no argument at all on the
device most of a broker's traffic arrives on. The portrait canvas lands at
~0.82, which is why its type is authored near its rendered size.

Consequences worth knowing:

- Canvas-internal tweens are scoped to the **canvas element**, not the section.
  A `stagger` that swept up the hidden canvas too would spread the visible
  elements over twice the intended time.
- The ejection vectors are a parameter, not a constant. 520px of debris off a
  340px-wide canvas clears the frame before the eye catches it.
- The five audit tags hang off different sides on mobile. At 340px a label is a
  large fraction of the box it belongs to, and an `inside` tag on the nav sat on
  top of the twelve links it was counting.
- The portrait rebuild drops the adviser row. At 340px it costs a fifth of the
  screen, and the review card is already answering *No reviews anywhere*.

The timeline is a single `gsap.timeline()` — no ScrollTrigger, no Lenis coupling.
Every tween is a transform or opacity.

## Accessibility

- The whole frame is `aria-hidden`. It is a picture of a website, not a website,
  and contains nothing focusable.
- No `<h1>` — the real hero below still owns it.
- Under `prefers-reduced-motion` no timeline is built, the markup stays resolved,
  and the five audit points appear as text beneath it.
- A `↻ Replay` control lets anyone watch it again.

## Known trap

`.section` is a flex container with two children: `.stage` and the
`.staticPoints` fallback list. It must stay `flex-direction: column`. As a
**row** — which it was originally, when `.staticPoints` was hidden everywhere
the section was visible — the list is squeezed to a couple of characters wide
next to a `width: 100%` stage and renders as a vertical strip of single letters
down the edge of the page, 900px tall, which then sets the section height and
centres the frame in a screenful of dead space.
