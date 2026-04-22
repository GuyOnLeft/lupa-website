# Products Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the minimal two-row `#verticals` section with a full `#products` section — a flagship Homestead Exemption Audit block with a scroll-triggered dual-record animation, a secondary Pool Detection block, and a quiet "more in development" line.

**Architecture:** Single HTML file (`~/lupa-website/index.html`). All changes are in three places: the HTML body (section markup), the inline `<style>` block (new CSS rules), and the inline `<script type="module">` block (new IntersectionObserver). No build step — edit and reload in browser to verify.

**Tech Stack:** Vanilla HTML/CSS/JS, IBM Plex Mono (already loaded). No new dependencies.

---

> **Note on testing:** Static marketing page — no unit tests. Each task ends with a browser verification step. Open `index.html` directly (`open ~/lupa-website/index.html`) and visually confirm before committing.

---

## File Map

| File | What changes |
|---|---|
| `~/lupa-website/index.html` | All changes — HTML section, CSS block, JS block, T.en i18n object |

---

## Task 1: Replace #verticals HTML with #products three-tier structure

**Files:**
- Modify: `~/lupa-website/index.html:324-325` (CSS id), `628-649` (HTML section)

- [ ] **Step 1: Change the CSS selector from `#verticals` to `#products`**

Find line ~325:
```css
#verticals { background: var(--bg2); border-top: 1px solid var(--faint); }
```
Replace with:
```css
#products { background: var(--bg2); border-top: 1px solid var(--faint); }
```

- [ ] **Step 2: Add a Products nav link**

The current nav (line ~547-551) has only the logo, nav-loc, lang-toggle, and nav-cta. Add a Products anchor between `nav-loc` and `lang-toggle`:

Find:
```html
        <span class="nav-loc" data-i18n="nav-loc">Est. 2026 · Spatial Intelligence</span>
        <button class="lang-toggle" id="lang-btn" style="display:none">ES</button>
```
Replace with:
```html
        <span class="nav-loc" data-i18n="nav-loc">Est. 2026 · Spatial Intelligence</span>
        <a href="#products" class="nav-products">Products</a>
        <button class="lang-toggle" id="lang-btn" style="display:none">ES</button>
```

- [ ] **Step 3: Replace the entire #verticals section HTML**

Find and replace the entire `<!-- ── Verticals ── -->` block (lines ~628-649):

```html
<!-- ── Verticals ── -->
<section id="verticals">
    <div class="section-wrap">
        <div class="eyebrow fade-up" data-i18n="vert-eyebrow">Products</div>

        <div class="vert-row fade-up">
            <div class="vert-n">01</div>
            <div class="vert-content">
                <div class="vert-title" data-i18n="vert-01-title">Homestead Exemption Audit</div>
                <p class="vert-desc" data-i18n="vert-01-desc">Cross-jurisdiction dual-claim detection — owners simultaneously claiming primary-residence tax benefits in more than one state or county. Available now.</p>
            </div>
        </div>

        <div class="vert-row fade-up" style="transition-delay:.08s">
            <div class="vert-n">02</div>
            <div class="vert-content">
                <div class="vert-title" data-i18n="vert-02-title">More products in development.</div>
                <p class="vert-desc" data-i18n="vert-02-desc">Expanding to additional parcel compliance verticals. Reach out if you have a specific use case in mind.</p>
            </div>
        </div>
    </div>
</section>
```

Replace with:

```html
<!-- ── Products ── -->
<section id="products">
    <div class="section-wrap">
        <div class="eyebrow fade-up" data-i18n="vert-eyebrow">Products</div>

        <!-- Tier 1: Homestead Exemption Audit (flagship) -->
        <div class="products-flagship fade-up">
            <div class="vert-row">
                <div class="vert-n">01</div>
                <div class="vert-content">
                    <div class="vert-title" data-i18n="vert-01-title">Homestead Exemption Audit</div>
                    <p class="vert-desc" data-i18n="vert-01-desc">Cross-jurisdiction dual-claim detection — identifying owners simultaneously claiming primary-residence tax benefits in more than one jurisdiction. Available now.</p>
                </div>
            </div>
            <div class="anim-wrap" id="products-anim">
                <div class="anim-panels">
                    <div class="anim-panel anim-panel--left">
                        <div class="anim-label">// RECORD A</div>
                        <div class="anim-row"><span class="anim-key">OWNER</span><span class="anim-val">████████████</span></div>
                        <div class="anim-row"><span class="anim-key">JURIS</span><span class="anim-val">JURISDICTION A</span></div>
                        <div class="anim-row"><span class="anim-key">STATUS</span><span class="anim-val">EXEMPT</span></div>
                    </div>
                    <div class="anim-connector"></div>
                    <div class="anim-panel anim-panel--right">
                        <div class="anim-label">// RECORD B</div>
                        <div class="anim-row"><span class="anim-key">OWNER</span><span class="anim-val">████████████</span></div>
                        <div class="anim-row"><span class="anim-key">JURIS</span><span class="anim-val">JURISDICTION B</span></div>
                        <div class="anim-row"><span class="anim-key">STATUS</span><span class="anim-val">EXEMPT</span></div>
                    </div>
                </div>
                <div class="anim-status">// DUAL CLAIM DETECTED</div>
            </div>
            <a href="mailto:jeremy@lupaintel.com" class="vert-cta" data-i18n="vert-01-cta">request_a_demo</a>
        </div>

        <!-- Tier 2: Pool Detection (secondary) -->
        <div class="products-secondary fade-up">
            <div class="vert-row">
                <div class="vert-n">02</div>
                <div class="vert-content">
                    <div class="vert-title" data-i18n="vert-02-title">Pool Detection</div>
                    <p class="vert-desc" data-i18n="vert-02-desc">Satellite-based detection of unrecorded pool installations cross-referenced against permit history and tax roll records. Available now.</p>
                </div>
            </div>
            <a href="mailto:jeremy@lupaintel.com" class="vert-cta vert-cta--secondary" data-i18n="vert-02-cta">request_a_demo</a>
        </div>

        <!-- Tier 3: More in development -->
        <p class="products-more" data-i18n="vert-more">// Additional compliance verticals in development — reach out if you have a use case.</p>

    </div>
</section>
```

- [ ] **Step 4: Verify in browser**

```bash
open ~/lupa-website/index.html
```

Scroll to Products section. Confirm: two product blocks visible (Homestead + Pool), "more in development" line at bottom. Animation panels will not animate yet (JS added in Task 3) — they should be invisible (opacity 0). That is expected.

- [ ] **Step 5: Commit**

```bash
cd ~/lupa-website
git add index.html
git commit -m "replace verticals section with products three-tier structure"
```

---

## Task 2: Add CSS for products section and animation

**Files:**
- Modify: `~/lupa-website/index.html` — inline `<style>` block, after the `.vert-desc` rules (~line 367)

- [ ] **Step 1: Add nav-products link style**

After the `.nav-cta:hover` rule, add:
```css
        .nav-products {
            font-size: 9px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--dim);
            text-decoration: none;
            transition: color 0.15s;
        }

        .nav-products:hover { color: var(--ink); }
```

- [ ] **Step 2: Add products section layout styles**

After the existing `.vert-desc` rule block (find `/* ── Buyers ── */` and insert before it):

```css
        /* ── Products tiers ── */
        .products-flagship {
            padding-bottom: 64px;
            margin-bottom: 48px;
            border-bottom: 1px solid var(--faint);
        }

        .products-secondary {
            padding-bottom: 48px;
            margin-bottom: 32px;
            border-bottom: 1px solid var(--faint);
        }

        .products-more {
            font-size: 9px;
            letter-spacing: 0.12em;
            color: var(--dim);
            padding-top: 8px;
        }

        /* ── Products animation ── */
        .anim-wrap {
            margin: 40px 0 32px;
        }

        .anim-panels {
            display: flex;
            align-items: center;
            max-width: 560px;
        }

        .anim-panel {
            background: var(--bg2);
            border: 1px solid var(--faint);
            border-radius: 6px;
            padding: 20px 24px;
            font-size: 10px;
            line-height: 1.9;
            flex: 1;
            opacity: 0;
            transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .anim-panel--left  { transform: translateX(-20px); transition-delay: 0ms; }
        .anim-panel--right { transform: translateX(20px);  transition-delay: 500ms; }

        .anim-label {
            font-size: 8px;
            letter-spacing: 0.2em;
            color: var(--dim);
            margin-bottom: 8px;
        }

        .anim-row {
            display: flex;
            gap: 12px;
        }

        .anim-key {
            color: rgba(240, 181, 0, 0.7);
            min-width: 52px;
            font-size: 9px;
            letter-spacing: 0.1em;
            flex-shrink: 0;
        }

        .anim-val { color: var(--ink); }

        .anim-connector {
            width: 0;
            height: 1px;
            background: var(--amber);
            flex-shrink: 0;
            transition: width 0.4s ease;
            transition-delay: 300ms;
        }

        .anim-status {
            font-size: 9px;
            letter-spacing: 0.2em;
            color: var(--amber);
            margin-top: 16px;
            opacity: 0;
            transition: opacity 0.4s ease;
            transition-delay: 900ms;
        }

        /* Animation play state — triggered by JS adding .anim-play */
        .anim-play .anim-panel--left  { opacity: 1; transform: translateX(0); }
        .anim-play .anim-connector    { width: 48px; }
        .anim-play .anim-panel--right { opacity: 1; transform: translateX(0); }
        .anim-play .anim-status       { opacity: 1; }

        /* Products CTA links */
        .vert-cta {
            display: inline-block;
            font-size: 10px;
            font-family: 'IBM Plex Mono', monospace;
            letter-spacing: 0.1em;
            color: var(--amber);
            text-decoration: none;
        }

        .vert-cta::before { content: '> '; opacity: 0.55; }
        .vert-cta::after  { content: '_'; animation: cur 1.1s step-end infinite; }
        .vert-cta:hover { text-decoration: underline; }

        .vert-cta--secondary {
            font-size: 9px;
            color: var(--dim);
        }

        .vert-cta--secondary:hover { color: var(--amber); }
```

- [ ] **Step 3: Verify in browser**

Reload `index.html`. Products section should now show correct layout: Homestead block with generous padding and a bottom border, Pool Detection block below it (smaller), "more in development" line at the bottom. Animation panels still invisible — expected.

- [ ] **Step 4: Commit**

```bash
cd ~/lupa-website
git add index.html
git commit -m "add CSS for products section tiers and animation"
```

---

## Task 3: Add JS scroll animation observer

**Files:**
- Modify: `~/lupa-website/index.html` — inline `<script type="module">` block, just before the closing `</script>` tag (~line 1049)

- [ ] **Step 1: Add the IntersectionObserver for the animation**

Find the existing scroll animation block (around line 1043):
```javascript
// ── Scroll animations ─────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
```

After that block (before `</script>`), insert:
```javascript
// ── Products animation ────────────────────────────────────────────
const productsAnim = document.getElementById('products-anim');
if (productsAnim) {
    const animObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('anim-play');
                animObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    animObs.observe(productsAnim);
}
```

- [ ] **Step 2: Verify animation in browser**

```bash
open ~/lupa-website/index.html
```

Scroll slowly into the Products section. Confirm the animation plays in sequence:
1. Left panel fades and slides in from the left
2. Amber connector line extends from left to right (~300ms later)
3. Right panel fades and slides in from the right (~500ms)
4. `// DUAL CLAIM DETECTED` fades in below (~900ms)

Animation should play once and not repeat on re-scroll. Open browser devtools console — confirm no JS errors.

- [ ] **Step 3: Commit**

```bash
cd ~/lupa-website
git add index.html
git commit -m "add scroll-triggered dual-record animation for homestead product"
```

---

## Task 4: Update T.en i18n strings and final verification

**Files:**
- Modify: `~/lupa-website/index.html` — `T.en` object (~lines 706-737)

- [ ] **Step 1: Update vert-01-desc**

Find:
```javascript
        'vert-01-desc':   'Cross-jurisdiction dual-claim detection — owners simultaneously claiming primary-residence tax benefits in more than one state or county. Available now.',
```
Replace with:
```javascript
        'vert-01-desc':   'Cross-jurisdiction dual-claim detection — identifying owners simultaneously claiming primary-residence tax benefits in more than one jurisdiction. Available now.',
```

- [ ] **Step 2: Replace vert-02 keys with Pool Detection and add three new keys**

Find:
```javascript
        'vert-02-title':  'More products in development.',
        'vert-02-desc':   'Expanding to additional parcel compliance verticals. Reach out if you have a specific use case in mind.',
```
Replace with:
```javascript
        'vert-01-cta':    'request_a_demo',
        'vert-02-title':  'Pool Detection',
        'vert-02-desc':   'Satellite-based detection of unrecorded pool installations cross-referenced against permit history and tax roll records. Available now.',
        'vert-02-cta':    'request_a_demo',
        'vert-more':      '// Additional compliance verticals in development — reach out if you have a use case.',
```

- [ ] **Step 3: Search for remaining old references**

```bash
grep -n "verticals\|More products in development\|Expanding to additional\|one state or county" ~/lupa-website/index.html
```

Expected: zero matches (any `#verticals` or old copy should be gone). If matches are found, fix them before continuing.

- [ ] **Step 4: Full browser verification**

```bash
open ~/lupa-website/index.html
```

Check in order:
- Nav: "Products" anchor link visible between the location tag and "Request a Demo" — clicking it scrolls to the Products section
- Products section eyebrow: "Products"
- 01 Homestead Exemption Audit — full copy, animation plays on scroll, `> request_a_demo_` CTA
- 02 Pool Detection — secondary styling (smaller, dimmer CTA), no animation
- `// Additional compliance verticals in development` line at the bottom
- Open devtools console — zero JS errors

- [ ] **Step 5: Final commit**

```bash
cd ~/lupa-website
git add index.html
git commit -m "update i18n strings for products section and pool detection"
```
