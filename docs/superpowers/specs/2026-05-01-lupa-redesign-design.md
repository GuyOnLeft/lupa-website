# Lupa Intelligence — Site Redesign
**Date:** 2026-05-01  
**Status:** Approved for implementation

## Goal

Redesign `lupaintel.com` (single `index.html`) to adopt the structural clarity and visual warmth of designjoy.co — large fluid gradient cards per pipeline step, light background, clean sans-serif typography — while keeping Lupa's existing content, the Three.js globe, and the EN/ES language toggle intact.

## Design System

| Token | Value |
|---|---|
| Background | `#edeae5` (warm light grey) |
| Surface (cards) | `#ffffff` |
| Ink | `#1a1a1a` |
| Dim | `#888888` |
| Accent (amber) | `#c47f17` |
| Font | Inter (Google Fonts), fallback `system-ui, -apple-system, sans-serif` — replaces IBM Plex Mono site-wide |
| Monospace | `'IBM Plex Mono', monospace` — retained only inside gradient card data labels |

The noise texture overlay and `body::after` grain effect are removed. The amber scanline/terminal aesthetic is retired from the main layout but preserved inside the gradient card mockup panels.

## Page Sections (top to bottom)

### 1. Nav
- Same links and logic as current: logo left, "Products" anchor + lang toggle + "Request a Demo" CTA right
- CTA becomes a filled black pill button (`background:#1a1a1a; border-radius:99px`) instead of the current underline link
- Fixed, blurred backdrop retained

### 2. Hero
The globe stays but changes role: instead of full-bleed canvas behind a dark overlay, it becomes a **large dark rounded card** (`border-radius:20px`) sitting on the light background — like a designjoy hero card.

- Left side of card: existing headline, subhead, and CTA pill
- Right side: the Three.js globe canvas, same animation, same scan-coords HUD
- Stat row below the card (not inside it): four white rounded stat boxes showing `570+`, `1M+`, `5`, `100%` — same labels as current proof section

The current standalone `#proof` section is removed; its numbers move to this stat row.

### 3. How It Works — Gradient Cards
Three large stacked cards (`border-radius:20px`, `min-height:320px`), each with a fluid blob gradient background built from layered `radial-gradient()` blobs. Content floats in the upper portion; label row anchors to the bottom.

**Card 1 — Ingest** (purple/blue palette)
- Background: purple → indigo → sky blobs over `#1e1b4b`
- Content: floating pill tags — County Assessors, State Cadastral, FL FDOR, Business Registries, Permit History, Tax Rolls, Public Records
- Label: `01 — Ingest` / "Pull public parcel records" / existing description copy

**Card 2 — Cross-reference** (amber/orange palette)
- Background: amber → burnt-orange blobs over `#451a03`
- Content: two dark frosted-glass record panels side by side with a connector — RECORD A (EXEMPT) ↔ RECORD B (EXEMPT), with a `DUAL CLAIM DETECTED` status line
- Label: `02 — Cross-reference` / "Identify discrepancies" / existing description copy

**Card 3 — Deliver** (red/orange palette)
- Background: red → orange blobs over `#7c2d12`
- Content: a frosted-glass ranked leads panel showing 3 redacted parcel rows with `DUAL CLAIM` badges
- Label: `03 — Deliver` / "Ranked leads, ready to act on" / existing description copy

The existing `#how` section and its `layer-row` pipeline layout are replaced entirely by these cards.

### 4. Products
Keep both products (Homestead Exemption Audit, Pool Detection) and their existing copy. Redesign as clean white rounded cards (`border-radius:16px`) replacing the current `vert-row` layout. The scroll-triggered `anim-play` animation panels are retained inside the cards.

### 5. Who We Serve
Keep all three buyer rows (County Property Appraisers, State Revenue Agencies, Municipal Assessors) and their descriptions. Restyle typography to match the new design system — same structure, cleaner visual weight.

### 6. CTA Section
Keep existing headline ("Ready to see what your records already know?") and subhead. Replace the terminal-style `>` link with a large black pill button. No pricing card added.

### 7. Footer
Same content (logo, email, phone, copyright). Lighter typographic treatment on the new background.

## What Stays Unchanged

- All copy (EN + ES translations), all `data-i18n` keys and the full `T` translation object
- The Three.js globe: geometry, textures, anomaly markers, rotation, resize logic
- Google Analytics tag (`G-8890VE29T1`)
- `mailto:jeremy@lupaintel.com` CTA links throughout
- EN/ES language toggle button and `applyLang()` function
- `scroll-behavior: smooth` and `IntersectionObserver` fade-up animations
- CNAME (`lupaintel.com`) and favicon

## What Is Removed

- `#0A0908` dark background and all dark-mode color tokens
- IBM Plex Mono as the site-wide font (kept only inside card panels)
- Noise/grain texture overlay (`body::after`)
- Terminal aesthetic: `>` cursor blink CTAs, `//` eyebrows, `::before`/`::after` cursor animation on links
- `#proof` as a standalone section (numbers move to stat row below hero)
- `layer-row` pipeline layout in `#how`

## File Architecture

Single `index.html` — no build step, no new files. All styles remain inline in `<style>`. The Three.js import map stays. External font load switches from IBM Plex Mono to Inter (Google Fonts) or falls back to `system-ui`.

## Out of Scope

- Mobile layout changes beyond what naturally follows from the new CSS
- New sections (FAQ, testimonials, pricing card)
- Contact form (stays as mailto)
- Any backend or analytics changes
