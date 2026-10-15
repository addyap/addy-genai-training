# Motion system — ia.antonyaddy.com

The site's story is in the hero's headline: **"De l'intention à l'intelligence"**, from intention
to intelligence. Noise settles into order, and a plain sentence becomes a reliable result. Motion
tells the same story at every scale: things **arrive already composed**. They settle into place
and never bounce, spin or overshoot. A visitor should feel that the page is calm and in
control, the same feeling the training promises about AI.

Three rules decide every animation:

1. **Motion explains or confirms. It never decorates.** An animation either shows where
   something came from (reveal, menu origin), confirms an action (press, hover, submit), or
   adds depth to the one signature moment (the hero). If it does none of these, cut it.
2. **One signature moment per page, quiet everywhere else.** The home hero is the only
   cinematic sequence. Every other page uses the same short, restrained intro.
3. **Content is never hostage to motion.** Prerendered HTML is fully visible. JavaScript
   only *adds* hidden-then-revealed states, and only for content still below the fold. With
   `prefers-reduced-motion: reduce`, everything is static and every state change is instant.

---

## 1. Tokens

All tokens live on `:root` in `src/index.css` and are mapped into Tailwind, so classes like
`duration-base ease-out-quart` work.

### Easing

| Token | Curve | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | **Entrances.** Fast start, long, soft settle. Reveals, hero lines, page enter. |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | **UI responses.** Hover, focus, menus opening, header state. |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things that move *across* the screen while staying visible (rare). |
| `--ease-in` | `cubic-bezier(0.5, 0, 0.75, 0)` | **Exits.** Menus closing. Exits are always shorter than entrances. |

No springs, no bounce and no overshoot. Overshoot reads as playful, and this brand is about reliability.

### Duration

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | Press-down, toggles |
| `--dur-fast` | 160ms | Colour/opacity hover changes, menu exit |
| `--dur-base` | 240ms | Lift on hover, menu enter, header state |
| `--dur-slow` | 420ms | Page enter, image settle start |
| `--dur-reveal` | 1000ms | Scroll reveals |
| `--dur-hero` | 1200ms | Image settle (the hero headline keeps its own 900ms) |

Rule of thumb: **the more of the screen it covers, the longer it may take, up to 1.2s.**
Nothing the user is waiting on (a menu, a button) takes longer than 240ms.

### Distance and stagger

| Token | Value | Notes |
|---|---|---|
| `--reveal-distance` | 40px | Rise distance for reveals. Never more than 48px. |
| `--reveal-scale` | 0.96 | Blocks grow to full size as they rise |
| `--stagger` | 110ms | Between siblings in a group |
| Stagger cap | 6 items | Item 7+ shares item 6's delay, so a long list never feels slow |
| Hover lift | −6px cards, −2px buttons | |
| Press | `scale(0.98)` | |

---

## 2. Loading sequences

### Home: the signature sequence (`HeroSection.tsx`)

The hero *performs* the promise: the instruction is typed, and that typing pulls the noise
into form. Sending it completes the structure.

| t (ms) | Element | Motion |
|---|---|---|
| 0 | Canvas | Particles scattered as noise (6% formed) |
| 50 | Kicker pill | Rise 12px + fade, 700ms, out-expo |
| 150 / 250 | Headline line 1 / line 2 | Masked slide up from 110%, `--dur-hero`, out-expo |
| 550 | Prompt line | Fade 500ms |
| 650 → ~2500 | Prompt types (20–40ms/char) | Each character pulls the particles further into form (up to 88%). Caret stays solid while typing. |
| 700 | Subhead | Rise + fade 700ms |
| 850 | Meta line | Fade |
| 950 | Buttons | Rise + fade. Clickable and settled by ~1.65s. |
| end + 220 | "Send" | Form completes, filaments connect, one glow pulse (decays over ~420ms). Caret blinks 4 times, then rests. |

- **Return visits** in the same browser session (`sessionStorage`): everything settles in 300ms
  with no delays, the prompt is already typed, and the form completes from 70%.
- **Scroll handoff**: the constellation expands and dissolves over 85% of the viewport height,
  and the copy lifts 48px and recedes to 15% opacity over the first 60vh (CSS scroll timeline).
- **Buttons**: one primary ("Demander un devis", with a forward arrow), one outline ("Voir les
  formations") and a quiet WhatsApp text link, so nothing competes with the main action.
- **Cost**: the canvas loop runs only while the hero is on screen and the tab is visible.
  Phones get 360 particles at 55% strength behind the copy. Desktops get 900.
- **No-JS**: hidden entrance states require `html.js` (set inline in `index.html`), so the
  prerendered hero is readable without JavaScript.
- **Reduced motion**: one static, fully formed frame (redrawn on resize), the prompt
  pre-typed, no loop and no pointer tracking.

### About page portrait

`.image-settle`: opacity + scale 1.08→1, `--dur-hero`, out-expo, 160ms after the intro starts.
This is the one image transition on the site, because the portrait is the one image that carries the story.

### Inner pages: the standard intro

Every inner page header (badge → H1 → lede → meta → CTA) uses `.animate-fade-in-up` with
`.animate-delay-100/200/300`:

- Rise `--reveal-distance` + fade, `--dur-reveal`, `--ease-out-expo`
- Delays 0 / 80 / 160 / 240ms. The whole intro has settled by ~1s.

These run on load, not on scroll, because they are above the fold.

### No preloader

The site is prerendered and fast, so a loading screen would only add waiting. Fonts load
non-blocking. The hero canvas doesn't block text.

---

## 3. Page transitions

Route changes (React Router `BrowserRouter`):

1. **Scroll jumps to the top instantly** (`behavior: 'instant'`). A smooth scroll back up
   from deep in a page, while the new page renders, is the most disorienting motion on
   the old site. Hash links (`/ressources#automatisation`) still scroll smoothly to their target.
2. **The new page enters**: `.page-enter` on the route wrapper, fade + 24px rise,
   600ms, `--ease-out-expo`. No exit animation, because exits delay the content the
   user just asked for.
3. The first, prerendered page load does **not** play the page-enter. That load belongs to
   the page's own intro.

---

## 4. Scroll-triggered reveals

**Primitive:** `data-reveal` on any element, optionally inside a `data-reveal-group`.

```tsx
<div data-reveal-group className="grid gap-6 md:grid-cols-2">
  {items.map((item) => (
    <div key={item.id} data-reveal className="card-surface">…</div>
  ))}
</div>
```

| Variant | Attribute | Motion |
|---|---|---|
| Rise (default) | `data-reveal` | opacity 0→1, translateY(40px) + scale 0.96 → rest |
| Heading | `data-reveal="heading"` | Wipes up out of a mask (clip-path) while rising 0.5em, echoing the hero headline |
| Fade | `data-reveal="fade"` | opacity + 20px rise, no scale. Use for large blocks and dark panels. |
| Image | `data-reveal="image"` | opacity + scale 1.08→1 over `--dur-hero`. Media only. |

- **Trigger:** one shared `IntersectionObserver`, threshold 0 and `rootMargin: 0px 0px -15% 0px`,
  so an element reveals when its top crosses 85% of the viewport height, clearly in view. Each element reveals **once**. Scrolling back up
  never hides it again, so content doesn't flicker in and out.
- **Stagger:** children of `data-reveal-group` get `--i` (0…5, capped) and delay `--i × --stagger`.
- **No-flash guarantee** (`src/hooks/use-reveal.ts`): before hiding anything, the hook marks every
  `[data-reveal]` already in the viewport as revealed, *then* adds `html.motion-ready`.
  Hidden states only exist under `html.motion-ready`, so prerendered HTML, no-JS visitors,
  crawlers and reduced-motion users always see everything.
- **What reveals:** section headings, cards, card groups, images, the CTA band.
  **What never reveals:** body paragraphs inside a card (the card reveals as one unit), nav,
  footer, form fields, anything inside the hero.

### Section headings: text reveal

`SectionHeading` is a group of three: eyebrow (fade) → H2 (masked wipe) → description (rise), staggered.
Headings reveal as whole lines, never word by word or letter by letter. Splitting text breaks
screen readers and translation, and makes a heading slower to read.

---

## 5. Parallax

Only decorative layers move, and only slightly. Text never parallaxes.

- `.motion-drift`: a decorative layer (dot grid, glow blob) travels 120px (+60 → −60) across
  its section's pass through the viewport. It's built on **CSS scroll-driven animations**
  (`animation-timeline: view()`), so it runs off the main thread with no JS and no scroll
  listeners. It's wrapped in `@supports (animation-timeline: view())` and
  `prefers-reduced-motion: no-preference`. Browsers without support show a static layer,
  which is fine.
- Hero: the constellation's scroll dissolve (already built) is the site's main depth effect.
- Never on: text, photos of people, cards, anything that's tapped or clicked.

## 6. Pinned sections

**There are none, on purpose.** Pinning (scroll-jacking) suits a product launch narrative with
5–10 visual beats. This site has dense, scannable content that buyers and HR leads skim and
come back to. Pinning would trap them and fight trackpads, iOS momentum scroll and the
browser's find-in-page.

If a future section needs a pin (for example a step-by-step "how a training runs" timeline),
use the approved pattern: **CSS `position: sticky` on the left column, desktop (`lg:`) only**,
with the right column scrolling normally. That gives a pinned feel without hijacking the scroll.

```tsx
<div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
  <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading align="left" … /></div>
  <ol data-reveal-group>…steps, each data-reveal…</ol>
</div>
```

---

## 7. Hover states

| Element | Hover | Timing |
|---|---|---|
| `.card-surface` | translateY(−4px), border → primary/25, shadow → `card-hover` | `--dur-base`, out-quart |
| Primary button | translateY(−2px), glow → `glow-lg` | `--dur-base`, out-quart |
| Outline/secondary button | translateY(−2px), bg tint | `--dur-base`, out-quart |
| Any forward arrow (lucide `ArrowRight`) | Nudges +5px on x when its link, button or card is hovered (automatic, no markup) | `--dur-base`, out-quart |
| Nav pills | Colour + background tint only (no movement) | `--dur-fast` |
| Logo mark | scale 1.05 + rotate 3° | `--dur-base` |

- Hover transforms only apply to `(hover: hover) and (pointer: fine)`. Touch screens get no
  sticky "lifted" card after a tap.
- With reduced motion, hovers keep their colour and shadow changes but drop every transform.
- Transitions list exact properties (`transform, box-shadow, border-color, background-color,
  color`), never `transition: all`.

## 8. Micro-interactions

| Interaction | Spec |
|---|---|
| Button press | `scale(0.98)`, `--dur-instant` |
| Focus ring | Appears instantly. Focus must never wait on an animation. |
| Header on scroll | Past 8px: border strengthens + soft shadow, `--dur-base`. No shrink and no hide-on-scroll, because the quote CTA must stay reachable. |
| "Mes formations" dropdown | Enter: fade + scale 0.97→1 + 4px drop from the top-right origin, `--dur-base`, out-quart. Close is instant. |
| Mobile menu | Enter: fade + 8px drop, `--dur-base`, out-quart. Close is instant. |
| Accordion (FAQ) | Radix height: open `--dur-base` out-quart, close `--dur-fast` in |
| Async buttons (email correction) | Spinner replaces icon. Label stays, so the width doesn't jump. |
| Results panel (diagnostic, correction) | Rise reveal, `--dur-reveal` |
| Hero CTA hover | The constellation warms violet → amber (already built), so the hero responds to intent |

---

## 9. Performance budget

- Animate **only `opacity`, `transform`/`translate` and `clip-path`** (headings only). Never width, height, top, margin or filter. Radix accordion height is the one allowed exception.
- No animation library: the reveal hook is ~60 lines and one observer per page.
- `will-change` is not set globally. The browser promotes layers during transitions by itself.
- One scroll listener in the hero (passive, already present) and one in the header (passive,
  flips a boolean). Everything else uses `IntersectionObserver` or CSS scroll timelines.
- The hero canvas halves its particles below 820px wide and caps DPR at 2.

## 10. Reduced motion

`prefers-reduced-motion: reduce` gives:

- No reveals (the hook never adds `html.motion-ready`), no page-enter, no drift.
- Hero: static, fully composed constellation and pre-typed prompt.
- Hovers: colour and shadow only, no movement.
- Global safety net: every remaining animation and transition is reduced to 0.01ms.
- Smooth scrolling is turned off.

## 11. Checklist for new UI

- [ ] Does this motion explain, confirm, or belong to the signature hero? If not, remove it.
- [ ] Uses tokens (`--ease-*`, `--dur-*`), not raw numbers.
- [ ] Animates only opacity and transform.
- [ ] Entrance ≤ 1000ms (UI ≤ 240ms). Exits are shorter than entrances.
- [ ] Hidden states only under `html.motion-ready`.
- [ ] Hover transforms gated to fine pointers and removed under reduced motion.
- [ ] Checked with reduced motion on, and on a mid-range phone.
