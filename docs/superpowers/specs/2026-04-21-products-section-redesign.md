# Lupa Intelligence — Products Section Redesign

**Date:** 2026-04-21
**Scope:** Expand the current minimal #verticals section into a full #products section with a scroll-triggered animation for the flagship product and a secondary listing for pool detection.

---

## Goals

- Showcase both current products (Homestead Exemption Audit, Pool Detection) without the site feeling thin or cluttered
- Give Homestead Exemption Audit a visually compelling scroll-triggered demo animation that conveys the product without revealing methodology details
- Position Pool Detection as a real, available product — secondary in visual weight
- Close with a quiet "more in development" teaser
- Remain jurisdiction-agnostic throughout (no FL, OH, Lee County references in any copy or animation)

## What Does NOT Change

- Visual design, color palette, typography (IBM Plex Mono, amber accents, dark background)
- Site structure (single HTML file)
- All other sections (nav, hero, how, buyers, cta, footer)
- Nav remains a single anchor link to `#products` — no dropdown

---

## Section-by-Section Changes

### Nav

| Element | Current | New |
|---|---|---|
| "Products" link | Scrolls to `#verticals` | Scrolls to `#products` |

The nav link text stays "Products". Change the `href` from `#verticals` to `#products`.

### Products Section (replaces #verticals)

The `<section id="verticals">` becomes `<section id="products">`. The eyebrow stays "Products".

Three tiers, stacked vertically, separated by a 1px `var(--faint)` border between Tier 1 and Tier 2.

---

#### Tier 1 — Homestead Exemption Audit (flagship)

Full-width block. Largest visual weight on the page.

**Copy:**

```
01  Homestead Exemption Audit

Cross-jurisdiction dual-claim detection — identifying owners simultaneously 
claiming primary-residence tax benefits in more than one jurisdiction. 
Available now.

> request_a_demo_
```

`request_a_demo` links to `mailto:jeremy@lupaintel.com`.

**Scroll-triggered animation:**

Triggers when the block enters the viewport (IntersectionObserver, threshold 0.3). Plays once per page load.

Three panels appear in sequence with a short delay between each:

**Panel LEFT** — fades in from left (translateX -20px → 0):
```
// RECORD A
OWNER     ████████████
JURIS     JURISDICTION A
STATUS    EXEMPT
```

**Center connector** — after LEFT appears, a horizontal amber line animates from left panel to right panel (width 0 → 100%, ~400ms).

**Panel RIGHT** — fades in from right (translateX +20px → 0):
```
// RECORD B
OWNER     ████████████
JURIS     JURISDICTION B
STATUS    EXEMPT
```

**Status line** — after RIGHT appears, a line fades in below both panels in amber:
```
// DUAL CLAIM DETECTED
```

Animation timing:
- LEFT panel: 0ms delay
- Connector line: 300ms delay
- RIGHT panel: 500ms delay
- Status line: 900ms delay

All panels use amber (`var(--amber)`) for labels, `var(--dim)` for values, `var(--faint)` border, monospace terminal styling. Block characters `████` are literal Unicode full-block characters (U+2588), not CSS.

No FL, OH, Lee County, or any jurisdiction name appears in the animation.

---

#### Tier 2 — Pool Detection (secondary)

Smaller block, ~30% of the vertical space Tier 1 gets. No animation.

**Copy:**

```
02  Pool Detection

Satellite-based detection of unrecorded pool installations 
cross-referenced against permit history and tax roll records. 
Available now.

> request_a_demo_
```

`request_a_demo` links to `mailto:jeremy@lupaintel.com`.

Visual treatment: same terminal style, but smaller font for the description, less vertical padding. Separated from Tier 1 by a 1px `var(--faint)` horizontal rule.

---

#### Tier 3 — More in development

One quiet line at the bottom of the section, in `var(--dim)`:

```
// Additional compliance verticals in development — reach out if you have a use case.
```

No heading, no number, no CTA. Just the line.

---

## i18n

The i18n system (`data-i18n` + `T.en`) should be updated to match:

| Key | Value |
|---|---|
| `vert-eyebrow` | `Products` |
| `vert-01-title` | `Homestead Exemption Audit` |
| `vert-01-desc` | `Cross-jurisdiction dual-claim detection — identifying owners simultaneously claiming primary-residence tax benefits in more than one jurisdiction. Available now.` |
| `vert-01-cta` | `request_a_demo` |
| `vert-02-title` | `Pool Detection` |
| `vert-02-desc` | `Satellite-based detection of unrecorded pool installations cross-referenced against permit history and tax roll records. Available now.` |
| `vert-02-cta` | `request_a_demo` |
| `vert-more` | `// Additional compliance verticals in development — reach out if you have a use case.` |

Note: `vert-01-cta`, `vert-02-cta`, and `vert-more` are NEW keys that don't exist yet — add them to `T.en`. The old `vert-02-title` ("More products in development.") and `vert-02-desc` values are replaced by the Pool Detection copy above. The `vert-more` key replaces the concept of that old second row.

---

## JavaScript — Scroll Animation

Add a new IntersectionObserver in the inline `<script>` block (after the existing fade-up observer):

```javascript
// Products animation
const animTarget = document.getElementById('products-anim');
if (animTarget) {
    const animObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('anim-play');
                animObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    animObs.observe(animTarget);
}
```

The animation is driven by CSS transitions on `.anim-play` class (not JS timers). Each panel and the connector get `transition-delay` values matching the timing above.

---

## CSS

Add styles for:
- `.products-flagship` — Tier 1 wrapper with extra top/bottom padding
- `.products-secondary` — Tier 2 wrapper, smaller padding
- `.products-more` — Tier 3 line, `var(--dim)` color, top border `var(--faint)`, small top margin
- `.anim-panels` — flex row, gap 24px, align-items center
- `.anim-panel` — card style: `background: var(--bg2)`, `border: 1px solid var(--faint)`, `border-radius: 6px`, padding 20px 24px, opacity 0, transform translateX(±20px), transition opacity 0.4s + transform 0.4s. Values use `var(--ink)` (not `var(--dim)`) so text reads clearly against the card background. Labels in `var(--amber)` but at 70% opacity to soften the contrast.
- `.anim-connector` — horizontal amber line, height 1px, background `var(--amber)`, flex 1, width 0, transition width 0.4s
- `.anim-status` — amber status line below panels, opacity 0, transition opacity 0.4s
- `.anim-play .anim-panel--left` — opacity 1, transform none, delay 0ms
- `.anim-play .anim-connector` — width 100%, delay 300ms
- `.anim-play .anim-panel--right` — opacity 1, transform none, delay 500ms
- `.anim-play .anim-status` — opacity 1, delay 900ms
- `.vert-cta` — amber terminal link (same style as `.hero-cta` but inline, smaller)

---

## Out of Scope

- Nav dropdown (deferred until 4+ products)
- Per-product landing pages
- Mobile layout changes beyond what existing responsive CSS handles
- Any new pages or routing
- Spanish translation updates (lang toggle remains hidden)
