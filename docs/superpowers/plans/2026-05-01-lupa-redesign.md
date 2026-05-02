# Lupa Intelligence Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `index.html` from a dark terminal aesthetic to a light, clean layout with designjoy-inspired fluid gradient cards for the pipeline steps, while keeping all content, the Three.js globe, and the EN/ES toggle intact.

**Architecture:** Single `index.html` — all styles inline in `<style>`, all JS inline in `<script type="module">`. No build step, no new files. The Three.js import map stays. Changes are purely CSS rewrites and HTML structure adjustments section by section.

**Tech Stack:** HTML/CSS/JS, Three.js (CDN via import map), Google Fonts (Inter + IBM Plex Mono), existing Google Analytics tag.

**Test command (run before and after each task):**
```bash
cd /Users/jeremymunson/lupa-website && python3 -m http.server 8081
# Open http://localhost:8081 in browser
```

---

## File Map

| File | What changes |
|---|---|
| `index.html` lines 19–20 | Google Fonts: add Inter, keep IBM Plex Mono |
| `index.html` lines 22–55 | `:root` tokens, `body`, remove `body::after` |
| `index.html` lines 57–134 | Nav: `.nav-cta` becomes pill button |
| `index.html` lines 135–238 | Hero: new `.hero-card` wrapper + stat row CSS |
| `index.html` lines 239–400 | Remove pipeline/proof CSS, add gradient card CSS |
| `index.html` lines 401–576 | Products: white rounded cards |
| `index.html` lines 577–764 | Buyers, CTA pill, Footer lighter |
| `index.html` lines 769–1005 | HTML body: hero, #how, #proof, products, cta, footer |
| `index.html` lines 1025–1110 | JS: update EN/ES CTA copy strings |

---

## Task 1: Global Styles — Tokens, Font, Body

**Files:**
- Modify: `index.html` lines 18–55 (`<link>` font tags + `:root` + `body`)

- [ ] **Step 1: Start the test server**

```bash
cd /Users/jeremymunson/lupa-website && python3 -m http.server 8081
```

Open `http://localhost:8081` in a browser tab — keep it open for the rest of the plan.

- [ ] **Step 2: Swap Google Fonts — add Inter, keep IBM Plex Mono**

Replace the existing single font `<link>` (line 20) with two links:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Replace `:root` tokens**

Replace the entire `:root { ... }` block (lines 22–31) with:

```css
:root {
    --bg:      #edeae5;
    --bg2:     #e5e2dc;
    --ink:     #1a1a1a;
    --dim:     #888888;
    --faint:   #d4d0ca;
    --amber:   #c47f17;
    --surface: #ffffff;
    --green:   #3DD68C;
    --red:     #E84040;
}
```

- [ ] **Step 4: Update `body` styles**

Replace the `body { ... }` block (lines 38–43) with:

```css
body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
}
```

- [ ] **Step 5: Remove the noise overlay**

Delete the entire `body::after { ... }` block (lines 45–55). It adds a grain texture that only works on dark backgrounds.

- [ ] **Step 6: Verify in browser**

Reload `http://localhost:8081`. The page background should now be warm grey `#edeae5`. Text will be dark. Typography switches to Inter. The page will look broken in many places — that is expected and will be fixed task by task.

- [ ] **Step 7: Commit**

```bash
cd /Users/jeremymunson/lupa-website
git add index.html
git commit -m "feat: global tokens light theme, swap to Inter font"
```

---

## Task 2: Nav Redesign

**Files:**
- Modify: `index.html` nav CSS (lines 57–134) and nav HTML (lines 769–780)

- [ ] **Step 1: Replace nav CSS**

Replace the entire nav CSS block (from `/* ── Nav ── */` through `.nav-products:hover { color: var(--ink); }`, approximately lines 57–134) with:

```css
/* ── Nav ── */
nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 52px;
    background: rgba(237,234,229,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--faint);
}

.nav-logo {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--ink);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-loc {
    font-size: 10px;
    color: var(--dim);
    letter-spacing: 0.04em;
}

.lang-toggle {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dim);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
}

.lang-toggle:hover { color: var(--ink); }

.nav-cta {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #fff;
    background: var(--ink);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 99px;
    transition: opacity 0.15s;
}

.nav-cta:hover { opacity: 0.75; }

.nav-products {
    font-size: 12px;
    font-weight: 500;
    color: var(--dim);
    text-decoration: none;
    transition: color 0.15s;
}

.nav-products:hover { color: var(--ink); }
```

- [ ] **Step 2: Verify nav in browser**

Reload `http://localhost:8081`. Nav should show warm grey background, dark logo text with gold magnifying glass icon, and a black pill "Request a Demo" button on the right.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: nav light theme with pill CTA button"
```

---

## Task 3: Hero Card + Stat Row (remove standalone #proof)

**Files:**
- Modify: `index.html` hero CSS (lines 135–238), hero HTML (lines 783–799), proof CSS (lines 347–400), proof HTML (lines 856–881)

- [ ] **Step 1: Replace hero CSS**

Replace everything from `/* ── Hero — full-bleed canvas ── */` through `.hero-cta:hover { text-decoration: underline; }` and the `.scan-overlay-coords` block (approximately lines 135–237) with:

```css
/* ── Hero ── */
#hero {
    padding: 64px 52px 0;
}

.hero-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    min-height: 86vh;
    background: #0A0908;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

#scan-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        rgba(10,9,8,0.95) 0%,
        rgba(10,9,8,0.82) 42%,
        rgba(10,9,8,0.15) 78%,
        rgba(10,9,8,0.05) 100%
    );
}

.hero-content {
    position: relative;
    z-index: 2;
    padding: 0 52px 72px;
}

.hero-sys {
    font-size: 9px;
    letter-spacing: 0.22em;
    color: rgba(240,181,0,0.6);
    text-transform: uppercase;
    margin-bottom: 28px;
    font-family: 'IBM Plex Mono', monospace;
}

.hero-sys::before { content: '// '; }

h1.hero-headline {
    font-size: clamp(52px, 8.5vw, 120px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.035em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 32px;
}

h1.hero-headline em {
    font-style: italic;
    color: #F0B500;
    display: block;
}

.hero-sub {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    line-height: 1.8;
    max-width: 360px;
    margin-bottom: 40px;
}

.hero-cta-pill {
    display: inline-block;
    background: #fff;
    color: #1a1a1a;
    font-size: 13px;
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 99px;
    text-decoration: none;
    transition: opacity 0.15s;
}

.hero-cta-pill:hover { opacity: 0.85; }

.scan-overlay-coords {
    position: absolute;
    bottom: 28px;
    right: 40px;
    font-size: 9px;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.1em;
    color: rgba(240,181,0,0.3);
    text-align: right;
    line-height: 2.2;
    z-index: 2;
}

/* ── Hero stat row ── */
.hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px 0 0;
}

.hero-stat {
    background: var(--surface);
    border-radius: 14px;
    padding: 24px 20px;
}

.hero-stat-n {
    font-size: clamp(26px, 3.2vw, 42px);
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 8px;
}

.hero-stat-label {
    font-size: 11px;
    color: var(--ink);
    line-height: 1.6;
}

.hero-stat-src {
    display: block;
    font-size: 9px;
    color: var(--dim);
    margin-top: 3px;
}
```

- [ ] **Step 2: Replace hero HTML**

Replace the `<!-- ── Hero ── -->` section (lines 783–799) with:

```html
<!-- ── Hero ── -->
<section id="hero">
    <div class="hero-card">
        <canvas id="scan-canvas"></canvas>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="hero-sys" data-i18n="hero-sys">Parcel intelligence / active</div>
            <h1 class="hero-headline" data-i18n="hero-headline">
                We see what<br><em>others don't.</em>
            </h1>
            <p class="hero-sub" data-i18n="hero-sub">
                Cross-jurisdiction parcel data intelligence for county governments — built entirely on public records.
            </p>
            <a href="mailto:jeremy@lupaintel.com" class="hero-cta-pill" data-i18n="hero-cta">Request a Demo</a>
        </div>
        <div class="scan-overlay-coords" id="scan-coords">26.6406°N &nbsp;81.8723°W<br>SCANNING...</div>
    </div>
    <div class="hero-stats">
        <div class="hero-stat">
            <div class="hero-stat-n">570+</div>
            <div class="hero-stat-label">Confirmed dual-claim cases<span class="hero-stat-src">Cross-verified against public records in both jurisdictions</span></div>
        </div>
        <div class="hero-stat">
            <div class="hero-stat-n">1M+</div>
            <div class="hero-stat-label">Parcels analyzed<span class="hero-stat-src">8 counties · Florida + Indiana</span></div>
        </div>
        <div class="hero-stat">
            <div class="hero-stat-n">5</div>
            <div class="hero-stat-label">States cross-referenced<span class="hero-stat-src">FL · IN · IL · OH · NY</span></div>
        </div>
        <div class="hero-stat">
            <div class="hero-stat-n">100%</div>
            <div class="hero-stat-label">Public records — no paid sources<span class="hero-stat-src">County assessors · state cadastral · public portals</span></div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Update EN/ES translation strings for hero-cta**

In the `<script type="module">` block, find the `T` object and update both language keys:

```js
// In T.en:
'hero-cta': 'Request a Demo',

// In T.es:
'hero-cta': 'Solicitar una Demo',
```

- [ ] **Step 4: Remove standalone #proof section CSS**

Delete the `/* ── Proof / Scan Results ── */` block and the `.proof-grid`, `.proof-stat`, `.proof-n`, `.proof-label`, `.proof-src`, `.proof-note` rules (approximately lines 347–399). These numbers now live in `.hero-stats`.

- [ ] **Step 5: Remove standalone #proof section HTML**

Delete the entire `<!-- ── Proof / Scan Results ── -->` section (lines 856–881):
```html
<!-- ── Proof / Scan Results ── -->
<section id="proof">
    ...
</section>
```

- [ ] **Step 6: Remove proof-related EN/ES translation keys**

In the `T` object in the script, delete the `proof-eyebrow`, `proof-1-label`, `proof-2-label`, `proof-3-label`, `proof-4-label`, `proof-note` keys from both `T.en` and `T.es`.

- [ ] **Step 7: Verify in browser**

Reload `http://localhost:8081`. You should see:
- Globe fills a large dark rounded card
- White pill "Request a Demo" CTA inside the card
- Four white stat boxes (570+, 1M+, 5, 100%) below the card
- No separate "Scan Results" section

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat: hero becomes dark rounded card, stat row replaces proof section"
```

---

## Task 4: How It Works — Gradient Cards

**Files:**
- Modify: `index.html` — pipeline CSS (lines ~239–345) and `#how` HTML (lines ~802–854)

- [ ] **Step 1: Remove pipeline CSS, add gradient card CSS**

Delete the `/* ── Detection Pipeline ── */` block and all its rules (`.pipeline-header`, `.pipeline-title`, `.pipeline-ver`, `.layer-row`, `.layer-marker`, `.layer-body`, `.layer-name`, `.layer-desc`, `.tags`, `.tag`) — approximately lines 239–345.

Replace with:

```css
/* ── Gradient Cards (How It Works) ── */
#how { background: var(--bg); border-top: none; padding-top: 0; }

.grad-cards {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.grad-card {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px 36px;
}

.card-ingest {
    background:
        radial-gradient(ellipse at 18% 28%, #7c3aed 0%, transparent 52%),
        radial-gradient(ellipse at 76% 18%, #2563eb 0%, transparent 48%),
        radial-gradient(ellipse at 54% 82%, #0ea5e9 0%, transparent 50%),
        radial-gradient(ellipse at 84% 68%, #6d28d9 0%, transparent 38%),
        #1e1b4b;
}

.card-crossref {
    background:
        radial-gradient(ellipse at 14% 62%, #d97706 0%, transparent 48%),
        radial-gradient(ellipse at 72% 18%, #b45309 0%, transparent 44%),
        radial-gradient(ellipse at 52% 84%, #f59e0b 0%, transparent 52%),
        radial-gradient(ellipse at 84% 54%, #92400e 0%, transparent 38%),
        #451a03;
}

.card-deliver {
    background:
        radial-gradient(ellipse at 24% 24%, #dc2626 0%, transparent 48%),
        radial-gradient(ellipse at 72% 28%, #ea580c 0%, transparent 44%),
        radial-gradient(ellipse at 42% 76%, #f97316 0%, transparent 52%),
        radial-gradient(ellipse at 82% 68%, #b91c1c 0%, transparent 38%),
        #7c2d12;
}

/* Card floating content area */
.card-preview {
    position: absolute;
    top: 32px;
    left: 36px;
    right: 36px;
    bottom: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Card label */
.card-label {
    color: #fff;
    position: relative;
    z-index: 2;
}

.card-step {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 6px;
    font-family: 'IBM Plex Mono', monospace;
}

.card-title {
    font-size: clamp(18px, 2.4vw, 28px);
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
}

.card-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    line-height: 1.65;
    max-width: 540px;
}

/* ── Ingest: floating pill tags ── */
.tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 500px;
}

.grad-pill {
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.18);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 16px;
    border-radius: 99px;
}

/* ── Cross-reference: record panels ── */
.records-compare {
    display: flex;
    align-items: center;
    gap: 0;
}

.record-panel {
    background: rgba(0,0,0,0.28);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 18px 20px;
    width: 168px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.85);
    line-height: 2;
}

.record-panel .rec-label {
    font-size: 8px;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.38);
    margin-bottom: 8px;
    text-transform: uppercase;
}

.rec-key { color: rgba(255,255,255,0.42); }
.rec-flag { color: #fbbf24; font-weight: 700; }

.record-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 0 12px;
}

.connector-line-h {
    width: 32px;
    height: 1px;
    background: rgba(255,255,255,0.3);
}

.connector-badge {
    background: #fbbf24;
    color: #000;
    font-size: 7px;
    font-weight: 900;
    padding: 3px 7px;
    border-radius: 4px;
    letter-spacing: 0.08em;
    font-family: 'IBM Plex Mono', monospace;
    white-space: nowrap;
}

/* ── Deliver: leads list ── */
.leads-list {
    background: rgba(0,0,0,0.28);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 18px 22px;
    width: 310px;
    font-family: 'IBM Plex Mono', monospace;
}

.leads-header {
    font-size: 8px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
    margin-bottom: 12px;
}

.lead-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-top: 1px solid rgba(255,255,255,0.07);
    font-size: 10px;
    color: rgba(255,255,255,0.78);
}

.lead-rank {
    background: rgba(255,255,255,0.1);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.lead-name { flex: 1; }

.lead-badge {
    font-size: 8px;
    background: rgba(251,191,36,0.12);
    color: #fbbf24;
    border: 1px solid rgba(251,191,36,0.28);
    padding: 2px 8px;
    border-radius: 99px;
    font-weight: 700;
    letter-spacing: 0.06em;
    white-space: nowrap;
}
```

- [ ] **Step 2: Replace #how HTML**

Replace the entire `<!-- ── Detection Pipeline ── -->` section (lines ~802–854) with:

```html
<!-- ── How It Works ── -->
<section id="how">
    <div class="section-wrap">
        <div class="eyebrow fade-up" data-i18n="how-eyebrow">How It Works</div>

        <div class="grad-cards">

            <!-- Card 1: Ingest -->
            <div class="grad-card card-ingest fade-up">
                <div class="card-preview">
                    <div class="tags-cloud">
                        <span class="grad-pill">County Assessors</span>
                        <span class="grad-pill">State Cadastral</span>
                        <span class="grad-pill">FL FDOR</span>
                        <span class="grad-pill">Business Registries</span>
                        <span class="grad-pill">Cook County</span>
                        <span class="grad-pill">Lee County</span>
                        <span class="grad-pill">Permit History</span>
                        <span class="grad-pill">Tax Rolls</span>
                        <span class="grad-pill">Public Records</span>
                    </div>
                </div>
                <div class="card-label">
                    <div class="card-step" data-i18n="card-step-01">01 — Ingest</div>
                    <div class="card-title" data-i18n="sat-name">Ingest</div>
                    <p class="card-desc" data-i18n="sat-desc">Pull public parcel records across jurisdictions — county assessors, state cadastral databases, business registries. No paid data sources required.</p>
                </div>
            </div>

            <!-- Card 2: Cross-reference -->
            <div class="grad-card card-crossref fade-up" style="transition-delay:.08s">
                <div class="card-preview">
                    <div class="records-compare">
                        <div class="record-panel">
                            <div class="rec-label">// Record A</div>
                            <div><span class="rec-key">OWNER&nbsp;</span>J. Smith</div>
                            <div><span class="rec-key">JURIS&nbsp;</span>LEE CO, FL</div>
                            <div><span class="rec-key">STATUS&nbsp;</span><span class="rec-flag">EXEMPT</span></div>
                        </div>
                        <div class="record-connector">
                            <div class="connector-line-h"></div>
                            <div class="connector-badge">MATCH</div>
                            <div class="connector-line-h"></div>
                        </div>
                        <div class="record-panel">
                            <div class="rec-label">// Record B</div>
                            <div><span class="rec-key">OWNER&nbsp;</span>J. Smith</div>
                            <div><span class="rec-key">JURIS&nbsp;</span>COOK CO, IL</div>
                            <div><span class="rec-key">STATUS&nbsp;</span><span class="rec-flag">EXEMPT</span></div>
                        </div>
                    </div>
                </div>
                <div class="card-label">
                    <div class="card-step" data-i18n="card-step-02">02 — Cross-reference</div>
                    <div class="card-title" data-i18n="str-name">Cross-reference</div>
                    <p class="card-desc" data-i18n="str-desc">Identify discrepancies between public signals and assessment records — across jurisdictions, permit history, satellite imagery, and tax rolls.</p>
                </div>
            </div>

            <!-- Card 3: Deliver -->
            <div class="grad-card card-deliver fade-up" style="transition-delay:.16s">
                <div class="card-preview">
                    <div class="leads-list">
                        <div class="leads-header">// Ranked leads · Lee County FL</div>
                        <div class="lead-row">
                            <div class="lead-rank">1</div>
                            <div class="lead-name">████████ · Parcel #12-44-24</div>
                            <div class="lead-badge">DUAL CLAIM</div>
                        </div>
                        <div class="lead-row">
                            <div class="lead-rank">2</div>
                            <div class="lead-name">████████ · Parcel #08-31-17</div>
                            <div class="lead-badge">DUAL CLAIM</div>
                        </div>
                        <div class="lead-row">
                            <div class="lead-rank">3</div>
                            <div class="lead-name">████████ · Parcel #22-19-05</div>
                            <div class="lead-badge">DUAL CLAIM</div>
                        </div>
                    </div>
                </div>
                <div class="card-label">
                    <div class="card-step" data-i18n="card-step-03">03 — Deliver</div>
                    <div class="card-title" data-i18n="deliver-name">Deliver</div>
                    <p class="card-desc" data-i18n="deliver-desc">Ranked investigative leads with source citations and verification links — ready for your audit team, independently verifiable against public records.</p>
                </div>
            </div>

        </div>
    </div>
</section>
```

- [ ] **Step 3: Add card-step i18n keys to translations**

In the `T` object in the script, add these keys to both `T.en` and `T.es`:

```js
// T.en additions:
'card-step-01': '01 — Ingest',
'card-step-02': '02 — Cross-reference',
'card-step-03': '03 — Deliver',

// T.es additions:
'card-step-01': '01 — Ingesta',
'card-step-02': '02 — Cruce de Datos',
'card-step-03': '03 — Entrega',
```

- [ ] **Step 4: Verify in browser**

Reload `http://localhost:8081` and scroll to "How It Works". You should see three large gradient cards:
- Purple/blue card with floating pill tags
- Amber card with two record panels and a "MATCH" badge connector
- Red/orange card with a ranked leads list

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: pipeline section replaced with gradient cards"
```

---

## Task 5: Products Section — White Rounded Cards

**Files:**
- Modify: `index.html` products CSS (lines ~401–576) and products HTML (lines ~882–969)

- [ ] **Step 1: Replace products CSS**

Delete the entire `/* ── Products ── */` block and all sub-rules (`.vert-row`, `.vert-n`, `.vert-content`, `.vert-title`, `.vert-desc`, `.products-flagship`, `.products-secondary`, `.products-more`, `.anim-wrap`, `.anim-panels`, `.anim-panel`, `.anim-label`, `.anim-row`, `.anim-key`, `.anim-val`, `.pool-grid`, `.anim-connector`, `.anim-status`, `.anim-play ...`, `.vert-cta`, `.vert-cta--secondary`, `.product-layout`, `.product-anim-col`, `.product-text-col`).

Replace with:

```css
/* ── Products ── */
#products { background: var(--bg); border-top: none; }

.product-card {
    background: var(--surface);
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 14px;
    display: flex;
    gap: 48px;
    align-items: flex-start;
}

.product-card:last-of-type { margin-bottom: 0; }

.product-anim-col { flex: 1; min-width: 0; }
.product-text-col { flex: 1; min-width: 0; padding-top: 8px; }

.vert-n {
    font-size: clamp(48px, 6vw, 72px);
    font-weight: 800;
    color: var(--faint);
    line-height: 1;
    letter-spacing: -0.04em;
    margin-bottom: 10px;
    user-select: none;
}

.vert-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
}

.vert-desc {
    font-size: 13px;
    color: var(--dim);
    line-height: 1.8;
    max-width: 420px;
    margin-bottom: 20px;
}

.products-more {
    font-size: 12px;
    color: var(--dim);
    margin-top: 20px;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.06em;
}

/* Animation panels — keep existing logic, restyle container */
.anim-wrap { margin: 0 0 20px; }

.anim-panels {
    display: flex;
    align-items: center;
    max-width: 100%;
}

.anim-panel {
    background: var(--bg);
    border: 1px solid var(--faint);
    border-radius: 10px;
    padding: 16px 18px;
    font-size: 10px;
    font-family: 'IBM Plex Mono', monospace;
    line-height: 2;
    flex: 1;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    color: var(--ink);
}

.anim-panel--left  { transform: translateX(-16px); transition-delay: 0ms; }
.anim-panel--right { transform: translateX(16px);  transition-delay: 500ms; }

.anim-label {
    font-size: 8px;
    letter-spacing: 0.18em;
    color: var(--dim);
    margin-bottom: 6px;
}

.anim-row { display: flex; gap: 10px; }

.anim-key {
    color: var(--amber);
    min-width: 52px;
    font-size: 9px;
    letter-spacing: 0.08em;
    flex-shrink: 0;
}

.anim-val { color: var(--ink); }

.pool-grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--dim);
    margin: 6px 0 2px;
    line-height: 1.4;
}

.pool-grid em {
    font-style: normal;
    color: var(--amber);
}

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
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.16em;
    color: var(--amber);
    margin-top: 12px;
    opacity: 0;
    transition: opacity 0.4s ease;
    transition-delay: 900ms;
    text-align: center;
}

.anim-play .anim-panel--left  { opacity: 1; transform: translateX(0); }
.anim-play .anim-connector    { width: 40px; }
.anim-play .anim-panel--right { opacity: 1; transform: translateX(0); }
.anim-play .anim-status       { opacity: 1; }

.vert-cta {
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    background: var(--ink);
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 99px;
    transition: opacity 0.15s;
}

.vert-cta:hover { opacity: 0.75; }

.vert-cta--secondary {
    background: transparent;
    color: var(--dim);
    border: 1px solid var(--faint);
}

.vert-cta--secondary:hover { color: var(--ink); border-color: var(--ink); opacity: 1; }
```

- [ ] **Step 2: Replace products HTML**

Replace the entire `<!-- ── Products ── -->` section (lines ~882–969) with:

```html
<!-- ── Products ── -->
<section id="products">
    <div class="section-wrap">
        <div class="eyebrow fade-up" data-i18n="vert-eyebrow">Products</div>

        <!-- Product 1: Homestead Exemption Audit -->
        <div class="product-card fade-up">
            <div class="product-anim-col">
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
            </div>
            <div class="product-text-col">
                <div class="vert-n">01</div>
                <div class="vert-title" data-i18n="vert-01-title">Homestead Exemption Audit</div>
                <p class="vert-desc" data-i18n="vert-01-desc">Cross-jurisdiction dual-claim detection — identifying owners simultaneously claiming primary-residence tax benefits in more than one jurisdiction. Available now.</p>
                <a href="mailto:jeremy@lupaintel.com" class="vert-cta" data-i18n="vert-01-cta">Request a Demo</a>
            </div>
        </div>

        <!-- Product 2: Pool Detection -->
        <div class="product-card fade-up" style="transition-delay:.08s">
            <div class="product-anim-col">
                <div class="anim-wrap" id="pool-anim">
                    <div class="anim-panels">
                        <div class="anim-panel anim-panel--left">
                            <div class="anim-label">// AERIAL SCAN · NAIP 0.6m</div>
                            <div class="pool-grid">
                                <span>▓▓▒░░░▒▓▓</span>
                                <span>▓▒░<em>◉◉◉</em>░▒▓</span>
                                <span>▓▒░<em>◉◉◉</em>░▒▓</span>
                                <span>▓▓▒░░░▒▓▓</span>
                            </div>
                            <div class="anim-row" style="margin-top:8px"><span class="anim-key">CONF</span><span class="anim-val">0.97</span></div>
                            <div class="anim-row"><span class="anim-key">TYPE</span><span class="anim-val">IN-GROUND</span></div>
                            <div class="anim-row"><span class="anim-key">PERMIT</span><span class="anim-val">ISSUED</span></div>
                        </div>
                        <div class="anim-connector"></div>
                        <div class="anim-panel anim-panel--right">
                            <div class="anim-label">// TAX ROLL</div>
                            <div class="anim-row"><span class="anim-key">POOL R</span><span class="anim-val">—</span></div>
                            <div class="anim-row"><span class="anim-key">POOL CAGE</span><span class="anim-val">—</span></div>
                            <div class="anim-row"><span class="anim-key">STATUS</span><span class="anim-val">NOT ASSESSED</span></div>
                        </div>
                    </div>
                    <div class="anim-status">// UNRECORDED IMPROVEMENT DETECTED</div>
                </div>
            </div>
            <div class="product-text-col">
                <div class="vert-n">02</div>
                <div class="vert-title" data-i18n="vert-02-title">Pool Detection</div>
                <p class="vert-desc" data-i18n="vert-02-desc">Satellite-based detection of unrecorded pool installations cross-referenced against permit history and tax roll records. Available now.</p>
                <a href="mailto:jeremy@lupaintel.com" class="vert-cta vert-cta--secondary" data-i18n="vert-02-cta">Request a Demo</a>
            </div>
        </div>

        <p class="products-more fade-up" data-i18n="vert-more">// Additional compliance verticals in development — reach out if you have a use case.</p>
    </div>
</section>
```

- [ ] **Step 3: Update product CTA translation strings**

In the `T` object, update both languages:

```js
// T.en:
'vert-01-cta': 'Request a Demo',
'vert-02-cta': 'Request a Demo',

// T.es:
'vert-01-cta': 'Solicitar una Demo',
'vert-02-cta': 'Solicitar una Demo',
```

- [ ] **Step 4: Verify in browser**

Scroll to Products. You should see two white rounded cards, each with the animation panel on the left and text/CTA on the right. Animation panels should trigger on scroll with amber highlight colors.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: products section white rounded cards"
```

---

## Task 6: Buyers + CTA + Footer

**Files:**
- Modify: `index.html` buyers/CTA/footer CSS (lines ~577–764) and HTML (lines ~971–1017)

- [ ] **Step 1: Replace buyers, CTA, and footer CSS**

Delete the `/* ── Buyers ── */`, `/* ── CTA ── */`, and `/* ── Footer ── */` blocks and replace with:

```css
/* ── Buyers ── */
#buyers { background: var(--bg); border-top: none; }

.buyer-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 52px;
    align-items: start;
    padding: 36px 0;
    border-top: 1px solid var(--faint);
}

.buyer-row:last-child { border-bottom: 1px solid var(--faint); }

.buyer-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    padding-top: 2px;
    letter-spacing: -0.01em;
}

.buyer-desc {
    font-size: 13px;
    color: var(--dim);
    line-height: 1.8;
}

/* ── CTA ── */
#cta {
    background: var(--ink);
    border-top: none;
    padding: 100px 60px;
    border-radius: 20px;
    margin: 0 52px 52px;
}

.cta-inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 60px;
}

.cta-headline {
    font-size: clamp(26px, 3.8vw, 52px);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.08;
    color: #fff;
    margin-bottom: 16px;
    max-width: 520px;
}

.cta-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    line-height: 1.8;
    max-width: 380px;
}

.cta-cmd { flex-shrink: 0; }

.cta-pill {
    display: inline-block;
    background: #fff;
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 700;
    padding: 14px 28px;
    border-radius: 99px;
    text-decoration: none;
    transition: opacity 0.15s;
}

.cta-pill:hover { opacity: 0.85; }

/* ── Footer ── */
footer {
    padding: 22px 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-logo {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 8px;
}

.footer-r {
    font-size: 11px;
    color: var(--dim);
    line-height: 1.9;
    text-align: right;
}
```

- [ ] **Step 2: Replace buyers, CTA, and footer HTML**

Replace the `<!-- ── Buyers ── -->` section through `</footer>` (lines ~971–1017) with:

```html
<!-- ── Buyers ── -->
<section id="buyers">
    <div class="section-wrap">
        <div class="eyebrow fade-up" data-i18n="buyers-eyebrow">Who We Serve</div>

        <div class="buyer-row fade-up">
            <div class="buyer-name" data-i18n="buyer-1-name">County Property Appraisers</div>
            <p class="buyer-desc" data-i18n="buyer-1-desc">Homestead and exemption compliance across large parcel portfolios — without adding staff.</p>
        </div>

        <div class="buyer-row fade-up" style="transition-delay:.08s">
            <div class="buyer-name" data-i18n="buyer-2-name">State Revenue Agencies</div>
            <p class="buyer-desc" data-i18n="buyer-2-desc">Cross-county exemption stacking detection and statewide audit program support.</p>
        </div>

        <div class="buyer-row fade-up" style="transition-delay:.16s">
            <div class="buyer-name" data-i18n="buyer-3-name">Municipal Assessors</div>
            <p class="buyer-desc" data-i18n="buyer-3-desc">Permit compliance, unpermitted construction detection, and assessment gap recovery.</p>
        </div>
    </div>
</section>

<!-- ── CTA ── -->
<section id="cta">
    <div class="cta-inner fade-up">
        <div>
            <h2 class="cta-headline" data-i18n="cta-headline">Ready to see what your records already know?</h2>
            <p class="cta-sub" data-i18n="cta-sub">We run a pilot audit of your jurisdiction. You see what we find.</p>
        </div>
        <div class="cta-cmd">
            <a href="mailto:jeremy@lupaintel.com" class="cta-pill" data-i18n="cta-link">Request a Demo</a>
        </div>
    </div>
</section>

<!-- ── Footer ── -->
<footer>
    <div class="footer-logo">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5" cy="6.5" r="4.5" stroke="#F0B500" stroke-width="1.5"/><line x1="10.25" y1="10.25" x2="14" y2="14" stroke="#F0B500" stroke-width="1.5" stroke-linecap="round"/></svg>
        Lupa Intelligence
    </div>
    <div class="footer-r">
        <span data-i18n="footer-tagline">Parcel Intelligence Platform</span><br>
        jeremy@lupaintel.com · 719-761-4236<br>
        © 2026 Lupa Intelligence
    </div>
</footer>
```

- [ ] **Step 3: Update CTA translation keys**

In the `T` object, update both languages:

```js
// T.en:
'cta-link': 'Request a Demo',

// T.es:
'cta-link': 'Solicitar una Demo',
```

- [ ] **Step 4: Verify in browser**

Scroll through Buyers, CTA, and Footer:
- Buyers: dark ink text on warm grey, clean two-column grid
- CTA: dark rounded card with white headline and white pill button
- Footer: ink-colored Lupa logo with gold magnifying glass icon, grey contact details on right

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: buyers, CTA dark card, footer light treatment"
```

---

## Task 7: Mobile Responsive

**Files:**
- Modify: `index.html` — the `@media (max-width: 900px)` block (lines ~716–763)

- [ ] **Step 1: Replace the mobile media query**

Delete the entire existing `@media (max-width: 900px)` block and replace with:

```css
@media (max-width: 900px) {
    nav { padding: 0 20px; }
    .nav-loc { display: none; }

    #hero { padding: 56px 16px 0; }
    .hero-card { min-height: 75vh; border-radius: 16px; }
    .hero-content { padding: 0 24px 56px; }
    h1.hero-headline { font-size: clamp(44px, 12vw, 72px); }
    .scan-overlay-coords { display: none; }

    .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .hero-stat { padding: 18px 14px; }

    .section-wrap { padding: 72px 20px; }

    .grad-card { min-height: 320px; padding: 20px 22px; border-radius: 16px; }
    .card-preview { left: 22px; right: 22px; bottom: 100px; }
    .card-title { font-size: 18px; }
    .card-desc { font-size: 12px; }

    .tags-cloud { gap: 6px; }
    .grad-pill { font-size: 11px; padding: 5px 12px; }

    .records-compare { gap: 0; }
    .record-panel { width: 130px; padding: 12px 14px; font-size: 9px; }

    .leads-list { width: 100%; max-width: 280px; }

    .product-card { flex-direction: column; gap: 24px; padding: 24px 22px; border-radius: 16px; }

    .buyer-row { grid-template-columns: 1fr; gap: 6px; }

    #cta { margin: 0 16px 32px; padding: 56px 28px; border-radius: 16px; }
    .cta-inner { flex-direction: column; align-items: flex-start; gap: 32px; }

    footer { padding: 20px 20px; flex-direction: column; gap: 10px; text-align: center; }
    .footer-r { text-align: center; }
}
```

- [ ] **Step 2: Verify mobile in browser**

In Chrome DevTools, toggle the device toolbar (Cmd+Shift+M) and set to iPhone 14 Pro (393px wide). Check:
- Hero card fills width with rounded corners, text readable
- Stat row becomes 2×2 grid
- Gradient cards stack cleanly
- Product cards stack (anim panel on top, text below)
- CTA card full width

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: mobile responsive for redesigned layout"
```

---

## Task 8: Cleanup — Remove Orphaned CSS

**Files:**
- Modify: `index.html` — scan for any CSS rules referencing removed classes

- [ ] **Step 1: Grep for orphaned class references**

```bash
cd /Users/jeremymunson/lupa-website
grep -n "\.hero-cta\b\|\.terminal-link\|\.layer-\|\.pipeline-\|\.proof-\|\.buyer-price\|\.vert-row\|\.section-wrap" index.html
```

Any lines returned that are still in the `<style>` block (not in HTML or JS) are orphaned CSS rules — delete them.

- [ ] **Step 2: Verify EN/ES toggle still works**

Click the `ES` button in the nav. All text should switch to Spanish. Click `EN` — switches back. Check hero headline, product CTAs, and CTA section.

- [ ] **Step 3: Verify globe still works**

Scroll back to top. The globe should rotate, anomaly markers should pulse, and the scan-coords HUD should cycle through city names.

- [ ] **Step 4: Verify product animations still trigger**

Scroll slowly past the Products section. Both animation panels should slide in on scroll.

- [ ] **Step 5: Final commit**

```bash
git add index.html
git commit -m "feat: cleanup orphaned CSS, full redesign complete"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Light background `#edeae5` | Task 1 |
| Inter font, IBM Plex Mono retained for panels | Task 1 |
| Amber accent `#c47f17` | Task 1 |
| Nav: pill CTA button | Task 2 |
| Gold magnifying glass SVG unchanged | Task 6 (SVG markup preserved verbatim) |
| Hero: globe as dark rounded card | Task 3 |
| Stat row below hero (570+, 1M+, 5, 100%) | Task 3 |
| `#proof` removed | Task 3 |
| 3 gradient cards for pipeline | Task 4 |
| Products: white rounded cards + animations kept | Task 5 |
| Who We Serve: same content, clean type | Task 6 |
| CTA: dark card with pill button | Task 6 |
| Footer: lighter treatment | Task 6 |
| EN/ES toggle preserved | Tasks 3, 5, 6 (translation keys updated) |
| Three.js globe unchanged | No-touch (CSS wrapping only) |
| Google Analytics tag unchanged | Not touched |
| Mobile responsive | Task 7 |
| No noise texture | Task 1 |
| No terminal cursor blink on CTAs | Tasks 2, 3, 5, 6 (`.hero-cta` replaced with `.hero-cta-pill` etc.) |
