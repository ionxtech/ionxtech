# AI Project Memory for ionXtech Website

> This file is the **living memory** of every architectural decision, convention, and standard operating procedure established during the development of the ionXtech website.
>
> **Every AI coding assistant must read this file before making changes.**
> When a new decision is made, it must be appended to the relevant section below.

---

## Table of Contents
1. [Reusable Module Architecture](#1-reusable-module-architecture)
2. [Data-Driven Content System](#2-data-driven-content-system)
3. [Page Creation SOP](#3-page-creation-sop)
4. [Home Page Decisions](#4-home-page-decisions)
5. [Design System Decisions](#5-design-system-decisions)
6. [Brand & Content Rules](#6-brand--content-rules)
7. [SEO Architecture](#7-seo-architecture)
8. [What Was Removed & Why](#8-what-was-removed--why)
9. [Known Constraints](#9-known-constraints)
10. [Decision Log](#10-decision-log)

---

## 1. Reusable Module Architecture

The project uses a **component injection pattern** where HTML pages contain empty shell elements with `data-component` attributes, and `layout.js` fills them with rendered HTML from centralized data.

### How It Works
```
HTML page has: <div data-component="app-knowledge-grid"></div>
                         ↓
layout.js finds all [data-component] elements on DOMContentLoaded
                         ↓
Reads matching data from window.IONX_DATA (site-data.js)
                         ↓
Renders HTML string and injects via innerHTML
```

### Registered Components

| `data-component` value | What it renders | Data source in `site-data.js` |
| :---------------------- | :-------------- | :---------------------------- |
| `app-knowledge-grid` | App knowledge panel cards (2-column grid). Supports `data-apps="id1,id2"` filter attribute. | `IONX_DATA.apps[]` |
| `divisions-grid` | Division rows (ionXtech, ionXapps, ionXhosting, etc.) as a vertical list | `IONX_DATA.divisions[]` |
| `principles-grid` | 4-column engineering principles boxes | `IONX_DATA.principles[]` |
| `company-faqs` | FAQ accordion list. Supports `data-limit="5"` to show a subset. | `IONX_DATA.companyFaqs[]` |
| `privacy-grid` | Privacy policy directory cards for each app | `IONX_DATA.apps[]` |
| `metrics-strip` | 4-number metrics bar (e.g., "165K+ installs") | `IONX_DATA.company.metrics[]` |
| `waitlist-coming-soon` | Coming Soon waitlist card with animated infinity loop (`∞`) and email signup (`data-division="domains\|hosting\|services"`) | `IONX_DATA.divisions[]` |

### Dedicated App Page Renderer
Any `<main>` tag with `data-app-detail="{app-id}"` triggers the full app detail page renderer, which builds the entire page body (hero, specs, features, FAQs, related apps) from the matching app entry in `IONX_DATA.apps[]`.

### Header & Footer
- Every page has `<header></header>` and `<footer></footer>` as empty elements.
- `layout.js` fills them with the full navigation and footer HTML.
- Path resolution uses the `data-root` attribute on `<html>` (e.g., `data-root="./"`, `data-root="../"`, `data-root="../../"`).
- The header automatically highlights the current page's nav link based on URL path matching.
- Mobile nav uses a `Menu`/`Close` text toggle button (no hamburger icon).

### Card-Link Delegation
Any element with class `card-link` and attribute `data-page="some/url/"` becomes fully clickable. Clicking anywhere on the card navigates to the URL, except clicks on `<a>` or `<button>` elements inside it (those follow their own href). Keyboard `Enter`/`Space` also works.

---

## 2. Data-Driven Content System

### The Single Source of Truth: `site-data.js`

All content that appears on more than one page is stored in `window.IONX_DATA`. This object contains:

| Property | Type | Description |
| :------- | :--- | :---------- |
| `company` | Object | Company name, email, address, logo path, social links, tagline, hero subtitle, rotating words, metrics |
| `divisions` | Array | The 5 ionX divisions (tech, apps, hosting, domains, services) with their display title, status badge, and description |
| `principles` | Array | 4 engineering principles (Local-First Privacy, Zero-Bloat Performance, Transparent Permissions, Long-Term Reliability) |
| `apps` | Array | Full metadata for each of the 4 Android apps. Each entry includes: `id`, `order`, `name`, `tagline`, `category`, `packageId`, `rating`, `ratingValue`, `ratingCount`, `downloads`, `dataPolicy`, `offlineSupport`, `androidVersion`, `logo`, `logoAlt`, `banner`, `bannerAlt`, `pageSlug`, `privacySlug`, `playStoreUrl`, `shortDescription`, `overview[]`, `features[]`, `specs[]`, `faqs[]` |
| `companyFaqs` | Array | 12 company-wide FAQ items (question + answer) |
| `team` | Array | Team member entries with name, role, photo, bio, highlights, linkedin |
| `careers` | Object | Intro text, email, and `openRoles[]` array |

### SOP: How to Add or Modify Content
1. **Edit `site-data.js` only** for content changes.
2. **Never duplicate data** across HTML files. If the same text appears on the home page and an app detail page, it should come from `site-data.js`.
3. **Static SEO fallback HTML** in page files exists only for search engine crawlers that don't execute JavaScript. When `layout.js` runs, it replaces this fallback content. Both versions should display the same information.

---

## 3. Page Creation SOP

When creating any new page, follow this exact template:

```html
<!DOCTYPE html>
<html lang="en" data-root="{relative-path-to-root}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Page Title} - ionXtech</title>
    <meta name="description" content="{Unique 150-160 char description with target keywords}">
    <meta name="theme-color" content="#F8F7F4">
    <link rel="canonical" href="https://ionxtech.dpdns.org/{path}">

    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:url" content="https://ionxtech.dpdns.org/{path}">
    <meta property="og:image" content="https://ionxtech.dpdns.org/assets/images/og-image.webp">
    <meta property="og:image:alt" content="{descriptive alt text}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://ionxtech.dpdns.org/assets/images/og-image.webp">
    <meta name="twitter:image:alt" content="{descriptive alt text}">

    <link rel="icon" type="image/webp" href="{rootPath}assets/images/IonXtech.webp">
    <link rel="stylesheet" href="{rootPath}assets/css/style.css">

    <!-- JSON-LD structured data if applicable -->
</head>
<body>

    <header></header>

    <main id="main">
        <div class="page-header">
            <div class="container">
                <h1>{Page Heading}</h1>
                <p>{Subtitle}</p>
            </div>
        </div>

        <!-- Page content sections here -->
    </main>

    <footer></footer>

    <script src="{rootPath}assets/js/site-data.js"></script>
    <script src="{rootPath}assets/js/layout.js"></script>
</body>
</html>
```

### Checklist for Every New Page
- [ ] `data-root` attribute set correctly on `<html>`
- [ ] Unique `<title>` tag (ends with ` - ionXtech`)
- [ ] Unique `<meta name="description">` (150-160 chars, keyword-rich)
- [ ] `<link rel="canonical">` with full URL
- [ ] Open Graph tags (title, description, url, image, image:alt)
- [ ] Twitter Card tags
- [ ] `<link rel="icon">` pointing to `IonXtech.webp`
- [ ] `<link rel="stylesheet">` pointing to `style.css`
- [ ] Empty `<header></header>` and `<footer></footer>` shells
- [ ] `<main id="main">` for skip-link accessibility target
- [ ] Breadcrumb navigation inside `.page-header`
- [ ] Both `site-data.js` and `layout.js` loaded at bottom of `<body>`
- [ ] URL added to `sitemap.xml`
- [ ] Brand name casing verified (ionXtech, ionXapps, etc.)

---

## 4. Home Page Decisions

These decisions were made explicitly by the project owner. Do not revert them.

| Decision | Date | Details |
| :------- | :--- | :------ |
| Remove "SOFTWARE & INFRASTRUCTURE STUDIO" badge | 2026-10-27 | The hero eyebrow label was removed entirely. No replacement text. |
| Remove pillar selector buttons | 2026-10-27 | The 5 interactive `pillar-pill` buttons (ionXtech, ionXapps, ionXhosting, ionXdomains, ionXservices) below the hero heading were removed. The word rotation is now automatic only, no user interaction. |
| Hero heading format: `ionX` + rotating word | 2026-10-27 | The main heading shows `ionX` in carbon ink followed by the rotating word in accent green. Words cycle: `tech → apps → hosting → domains → services`. The animation is a 260ms opacity+translateY fade. Users with `prefers-reduced-motion` get instant text swap. |
| Show only 2 apps on home page | 2026-10-27 | Only Privacy Display and Auto Call Scheduler are featured on the home page. Controlled by `data-apps="privacy-display,call-message-scheduler"` attribute. All 4 apps still appear on the `/apps/` directory page. |
| Remove "How We Build Software" section from home | 2026-10-27 | The engineering principles grid was removed from the home page. It still exists on the About page. |
| Add metrics strip | 2026-10-27 | 4 key metrics displayed below the hero: "165K+ Installs", "4 Production apps", "100% offline core features", "0 Personal data sold". Data stored in `IONX_DATA.company.metrics[]`. |
| Add closing CTA band | 2026-10-27 | Dark background banner at the bottom of the home page with "Contact Us" and "Join the Team" buttons. Uses `.cta-band` CSS class. |
| Division display as horizontal rows | 2026-10-27 | The 5 divisions are shown as a numbered vertical list (`.division-row` with 4-column CSS grid: index, name, description, status badge) instead of spec-box cards. |

---

## 5. Design System Decisions

| Decision | Date | Details |
| :------- | :--- | :------ |
| Color palette: Warm Paper & Ink | 2026-10-27 | Off-white `#F8F7F4` background, pure white `#FFFFFF` cards, carbon `#141413` text, deep forest `#1B4332` accent. No purple, no black backgrounds, no gradients. |
| Light mode only | 2026-10-27 | No dark mode toggle. No `[data-theme="dark"]` support. Single light theme. |
| Typography: Plus Jakarta Sans + IBM Plex Mono | 2026-10-27 | Jakarta Sans for all headings (weight 800) and body (400-600). Plex Mono for technical labels, badges, breadcrumbs, and FAQ toggles. Loaded via Google Fonts CDN. |
| No icon libraries | 2026-10-27 | No FontAwesome, no Lucide, no SVG icon sets. The design is purely typographic. FAQ toggle uses `+`/`-` characters from Plex Mono. |
| Card hover: border-color only | 2026-10-27 | Cards change `border-color` to `var(--text)` on hover. No scale, no translateY, no box-shadow animation. |
| Buttons: solid rectangles | 2026-10-27 | Primary button is `var(--text)` background with white text. Secondary is white background with border. Both have `border-radius: 6px`. No pill-shape (`border-radius: 9999px`). |
| Grid rules | 2026-10-27 | 2-column (`.grid-2`, `.app-grid`) or 4-column (`.grid-4`) grids only. Never 3 columns. |

---

## 6. Brand & Content Rules

| Rule | Details |
| :--- | :------ |
| **Name casing** | `ionXtech`, `ionXapps`, `ionXhosting`, `ionXdomains`, `ionXservices`. Only the `X` is capitalized. See `AI-INSTRUCTIONS.md` section 6 for the full table. |
| **No emojis** | Never use emoji characters in page content. |
| **No em dashes** | Use commas, periods, or semicolons instead of `—`. |
| **No "demo" or mockup content** | Every piece of content must be real. No placeholder screenshots, fake testimonials, or lorem ipsum. |
| **Privacy policy content is sacred** | Do not modify the text of any privacy policy page unless the project owner explicitly provides new legal text. These are linked from Google Play Console. |
| **Contact email** | `ionxtechsolution@gmail.com` everywhere. |
| **Copyright line** | `© 2025 - 2026 ionXtech. All rights reserved.` |

---

## 7. SEO Architecture

| Feature | Implementation |
| :------ | :------------- |
| **JSON-LD Structured Data** | `Organization` schema on home page. `SoftwareApplication` + `FAQPage` schemas on each app detail page (injected both as static `<script>` tags in HTML and dynamically by `layout.js`). `Person` schema on team page. `ItemList` schema on apps directory. |
| **FAQ Rich Results** | `layout.js` automatically injects `FAQPage` JSON-LD for every FAQ list it renders (company FAQs and per-app FAQs). |
| **Canonical URLs** | Every page has `<link rel="canonical" href="https://ionxtech.dpdns.org/...">`. |
| **Sitemap** | `sitemap.xml` at project root lists all 17+ pages with priority and change frequency. Must be updated when pages are added. |
| **robots.txt** | Allows all crawlers, points to sitemap. |
| **Alt text standard** | Every image `alt` attribute is a full descriptive sentence for SEO, not just the app name. Example: "QR Solutions Android app icon by ionXtech for scanning and generating QR codes". |
| **Static fallback HTML** | Each page includes enough static HTML content in the body for crawlers that don't run JS. `layout.js` enhances this content when it runs. |

---

## 8. What Was Removed & Why

This section documents features from the original website that were explicitly removed and should **never be re-added**.

| Removed Feature | Why | Date |
| :-------------- | :-- | :--- |
| FontAwesome icon library | Replaced with pure typographic design, no icons | 2026-10-27 |
| `[data-theme="dark"]` dark mode | Project owner chose light-mode only | 2026-10-27 |
| Purple/magenta color palette (`#8b5cf6`, `#d946ef`) | Replaced with Warm Paper & Ink palette | 2026-10-27 |
| Radial gradient orbs (`.hero::before`, `.hero::after`) | Removed as visual clutter | 2026-10-27 |
| Dot-grid background (`background-image: radial-gradient`) | Removed for clean paper aesthetic | 2026-10-27 |
| `backdrop-filter: blur()` glassmorphism | Banned from the project | 2026-10-27 |
| Card hover `translateY(-8px) scale(1.02)` animations | Replaced with border-color change only | 2026-10-27 |
| Pill-shaped buttons (`border-radius: 9999px`) | Replaced with `6px` rounded rectangles | 2026-10-27 |
| Gradient top-border on cards | Removed entirely | 2026-10-27 |
| `gradientFlow` keyframe animation on hero h1 | Replaced with simple word rotation | 2026-10-27 |
| Theme toggle button (sun/moon icon) | No dark mode, so no toggle | 2026-10-27 |
| Hero pillar selector pills | Removed from home page, word rotation is automatic only | 2026-10-27 |
| "How We Build Software" section on home page | Removed from home page only (still on About page) | 2026-10-27 |
| "SOFTWARE & INFRASTRUCTURE STUDIO" badge on home hero | Removed entirely | 2026-10-27 |
| `mailto:` links for contact | Replaced with contact form + fallback | 2026-10-27 |

---

## 9. Known Constraints

| Constraint | Details |
| :--------- | :------ |
| **No build step** | The site deploys as raw static files to GitHub Pages. No webpack, no Vite, no Astro. |
| **No server-side code** | No PHP, no Node.js server, no API endpoints. Contact form uses a client-side Formspree integration (currently set to a placeholder endpoint). |
| **Image filenames with spaces** | `QR Solution Logo.webp` and `QR Solution.webp` have spaces in their filenames. This is legacy and works, but new images should use hyphens. |
| **Logo filename casing** | The logo file is `IonXtech.webp` (capital I). This cannot be renamed as it's referenced externally. |
| **JS-injected header/footer** | Search engine crawlers that don't execute JS will not see the full navigation. This is a known trade-off for maintaining DRY code without a build system. Each page's static HTML includes enough content and internal links to partially compensate. |

---

## 10. Decision Log

> Append new decisions here in reverse chronological order.

### 2026-10-28 (Session 19)
- **Git Branching, GitHub Push & Cloudflare Pages Deployment Documentation (`docs/README.md`):**
  - Updated `docs/README.md` with step-by-step instructions on creating a new Git branch (`git checkout -b ...`), staging/committing changes, pushing to GitHub (`git push -u origin ...`), merging to `main`, and deploying on Cloudflare Pages Free Tier.
  - Updated `getCorsHeaders` in `assets/js/cloudflare-r2-worker.js` to automatically allow `*.pages.dev`, `*.ionxtech.dpdns.org`, and `*.ionxtech.com` origins.

### 2026-10-28 (Session 18)
- **Cloudflare R2 Bucket Integration for Contact Us & Waitlist Forms:**
  - Created the Cloudflare Worker script at `assets/js/cloudflare-r2-worker.js` using native R2 binding (`IONX_BUCKET`) to store Contact Us messages (`contacts/{timestamp}_{email}.json`) and Waitlist signups (`waitlist/{division}/{timestamp}_{email}.json`) without exposing credentials in frontend code, plus instant Slack notifications via `env.SLACK_WEBHOOK_URL`.
  - Added `IONX_DATA.company.r2WorkerEndpoint` (`https://ionxtech-forms.ionxtechsolution.workers.dev/`) in `assets/js/site-data.js`.
  - Wired `contact.html` and `renderWaitlistComingSoon` in `assets/js/layout.js` to `POST` JSON payloads to `r2WorkerEndpoint` with automatic `mailto:` / `localStorage` fallback when offline or before endpoint configuration.

### 2026-10-28 (Session 17)
- **Removed "Official Android Utility" Tag & Updated "All Apps" Button on App Detail Pages:**
  - Removed `<span class="badge badge-accent">Official Android Utility</span>` from `renderAppDetailPage` in `assets/js/layout.js` across all 4 individual app pages (`apps/qr-solution/`, `apps/privacy-display/`, `apps/call-message-scheduler/`, `apps/led-scroller/`).
  - Updated the button text in the "Explore Other Applications" section header from `"View All 4 Apps"` to `"All Apps"`.

### 2026-10-28 (Session 16)
- **Single-Viewport No-Scroll Waitlist Pages, Compact Loop Animation & Theme Confirmation Modal (`domains.html`, `hosting.html`, `services.html`):**
  - Configured `body.waitlist-page` on desktop (`min-width: 992px`) with `height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;` so header, waitlist card, and footer fit on a single screen without scrolling.
  - Removed the `COMING SOON` badge from all three waitlist pages.
  - Scaled the infinity loop (`∞`) animation to `500px x 250px` (`width="500" height="250"`), centered horizontally with open borderless alignment and explicit inline + stylesheet center alignment (`text-align: center`, `margin: 0 auto`) on every heading, paragraph, form, and note element so all waitlist content sits centered on the page.
  - Placed *"Enter your email below to join the waitlist and be the first to know when we launch."* on its own dedicated line (`.waitlist-cta-line`) below the division description with balanced vertical spacing.
  - Made the email input compact (`width: 230px; height: 36px; font-size: 0.86rem`) inside `.waitlist-input-shell` alongside a matching compact `36px` **Join Waitlist** button (`btn-sm`).
  - Removed the static inline "You're on the waitlist!" status box so it never appears prematurely, and replaced it with a theme-styled modal popup (`showWaitlistPopup` in `assets/js/layout.js` / `.waitlist-modal` in `assets/css/style.css`) that only opens when a user submits their email.

### 2026-10-28 (Session 15)
- **Waitlist Coming Soon Pages & Infinity Loop ("Stay in the Loop") Animation (`domains.html`, `hosting.html`, `services.html`):**
  - Created reusable component `data-component="waitlist-coming-soon"` (`renderWaitlistComingSoon` and `initInfinityLoopAnimations` in `assets/js/layout.js`).
  - Built a vector SVG figure-eight infinity loop (`∞`) track (`#2B2B29`) with a glowing red orb (`#FF0000` with SVG Gaussian blur filter) that smoothly travels along the infinity path at 60fps via `requestAnimationFrame` and `getPointAtLength()`.
  - Updated `domains.html` (**ionXdomains**), `hosting.html` (**ionXhosting**), and `services.html` (**ionXservices**) to present the "Stay in the loop" email waitlist card.
  - Submitting an email stores the waitlist entry per division in `localStorage` (`ionx_waitlist_{division}`) and displays an inline confirmation banner telling the user they are on the waitlist and in the loop for launch.

### 2026-10-28 (Session 14)
- **Removed App Number Badges, Category Labels, and Click Hint Footer from All App Cards (`renderKnowledgePanelCard`):**
  - Removed `<span class="badge">APP 01</span>` (and `APP 02`, `APP 03`, `APP 04`) from `renderKnowledgePanelCard` in `assets/js/layout.js` and static HTML fallback in `apps/index.html`.
  - Removed `<span class="app-category">` (`Productivity & Utilities`, `Security & Privacy Utility`, etc.) above app titles on all cards on `/apps/` and individual app pages.
  - Removed `<div class="kp-click-hint">` (`Click panel for full specs & FAQs` / `View Details`) from the bottom of all app cards.

### 2026-10-28 (Session 13)
- **Removed Page Header Breadcrumbs & Eyebrow Labels Across All Inner Pages:**
  - Removed `<nav class="breadcrumb">` (`Home / ...`) and top `<span class="mono-label">` eyebrow labels from `.page-header` across all inner pages (`apps/index.html`, `domains.html`, `hosting.html`, `services.html`, `about.html`, `team.html`, `careers.html`, `faqs.html`, `contact.html`, `terms.html`, `privacy-policy/*`, and `renderAppDetailPage` in `assets/js/layout.js`).
  - Added `.breadcrumb, .page-header .mono-label { display: none !important; }` in `assets/css/style.css`, DOM cleanup in `assets/js/layout.js`, and `?v=3` cache-busting query strings to CSS/JS assets across all HTML files so individual app pages (`apps/qr-solution/`, `apps/privacy-display/`, `apps/call-message-scheduler/`, `apps/led-scroller/`) and `/apps/` immediately load the updated layout without stale browser cache.
  - Every inner page now opens directly with the main `<h1>` page title and descriptive subtitle.

### 2026-10-28 (Session 12)
- **CTA Band to Footer Spacing Fix:**
  - Added explicit gap between the closing CTA band and the footer so the sections no longer visually merge on desktop or mobile.
  - Set `.cta-band` to include a bottom margin and reduced the footer top margin to maintain a cleaner transition and consistent breathing room.

### 2026-10-28 (Session 11)
- **Mobile Footer Legal Row Spacing Fix:**
  - Adjusted the mobile footer layout so the legal copyright text no longer collides with the social icon cluster on narrow screens.
  - Added a dedicated stacked mobile footer flow: `.footer-horizontal` becomes column-based, `.footer-bottom` stacks vertically, and the rights text aligns left with clean spacing.
  - This preserves the desktop legal row layout while preventing overlap and cramped spacing on phones.

### 2026-10-28 (Session 10)
- **Horizontal Single-Row Footer & Authentic Social Media Icons:**
  - Removed the vertical "Applications" column from the footer.
  - Converted the footer into a streamlined horizontal bar (`.footer-horizontal`):
    - **Left:** Brand logo + title + tagline.
    - **Center:** Company navigation links arranged horizontally (`About`, `Our Team`, `Careers`, `FAQs`, `Contact Us`).
    - **Right:** Official SVG social media icons.
  - Replaced placeholder icons with verified, official SVG paths for:
    - **LinkedIn:** `https://in.linkedin.com/company/ionxtechnology`
    - **Instagram:** `https://www.instagram.com/ionxtech/`
    - **YouTube:** `https://www.youtube.com/@ionXtechsolution`
  - Removed outdated Facebook & X icons from the active set.

### 2026-10-28 (Session 9)
- **FAQ Section Cleaned from Homepage:**
  - Removed FAQ section from `index.html`. FAQs now reside completely and exclusively on the dedicated `faqs.html` page (which also contains the complete structured FAQPage schema markup).
- **Footer Structure & Social Column Overhaul:**
  - Removed the `Legal & Privacy` column and link list entirely from the footer.
  - Replaced it with an active **"Connect"** column displaying official social media icons (LinkedIn, X, Instagram, Facebook).
  - Removed dividing border lines: removed `border-top` from the footer and removed the dividing border line above the copyright text in `.footer-bottom`.
- **Integrated Bottom Scroll-Snap View:**
  - When reaching the final scroll step on desktop, the page smoothly glides to show the **"Building something with ionXtech?"** CTA band together with the clean footer in one view.

### 2026-10-28 (Session 8)
- **Removal of "The ionX Family" Section from Homepage:**
  - Completely removed the 5-division showcase list (*"The ionX Family / One company, five divisions"*) from `index.html`.
  - The divisions remain accessible through the dedicated navbar links (`ionXapps`, `ionXdomains`, `ionXhosting`, `ionXservices`) and on `about.html`.
  - The desktop snap scroll sequence now glides directly: **Hero** -> **Featured Android Apps** -> **FAQs** -> **Closing CTA**.

### 2026-10-28 (Session 7)
- **Responsive Device-Adaptive Viewport-Snapping Experience on Homepage:**
  - **Device Validation:**
    - Checks `(min-width: 992px) and (hover: hover) and (pointer: fine)` so mobile phones and touch tablets get the natural native continuous-scroll experience without unexpected snapping.
    - On desktop/computer screens, activates an enhanced presentation view.
  - **Single-Scroll Section Navigation (`initDesktopScrollSnap` in `layout.js`):**
    - The hero screen opens cleanly occupying the full viewport height (`calc(100vh - 68px)`), showing only the brand, heading, dynamic word rotator, and "Talk to Sales" CTA.
    - A single wheel flick or arrow key press smoothly glides the screen directly to the next landmark: first to **Featured Android Apps** (so the user sees the showcase screen perfectly framed), then to **The ionX Family**, **FAQs**, and the **Closing CTA**.
    - Scroll-jack protection and velocity debouncing (700ms throttle) prevent jarring multi-section skips on sensitive trackpads.

### 2026-10-28 (Session 6)
- **Dual Card Style Architecture (Home Page vs. ionXapps Catalog):**
  - **Home Page (`data-variant="home"`):**
    - Displays the high-end professional showcase card format: large 68px logo, 1.55rem bold title, star rating infographic (`★★★★★ 4.5 • 5K+ Downloads`), and clean one-liner tagline.
    - Action buttons changed to: **"Download app"** (primary, links to Google Play) and **"View App"** (secondary, navigates directly to the dedicated app details page).
    - Heading set to: **"Featured Android Apps"**.
  - **ionXapps Catalog (`/apps/`):**
    - Reverted to the comprehensive technical Knowledge Panel format: APP numbers, Category tag, Package ID, Data Architecture, Offline mode indicator, specs table, Google Play button, and Privacy Policy button.

### 2026-10-27 (Session 5)
- **App Showcase Cards Redesigned for High-End Professional Presentation:**
  - Removed technical clutter from app cards: "APP 01" badge, category pill (e.g. "Security & Privacy Utility"), data architecture item, package ID, offline mode item, and footer hints ("Click panel for full specs & FAQs" / "View Details").
  - Increased app logo size to `68px x 68px` with proportional larger title typography (`1.55rem`, weight 800) for balanced visual hierarchy.
  - Replaced raw text ratings (`4.5 / 5.0`) with an elegant infographic rating strip featuring gold star ratings (`★★★★★` / `★★★★☆`), numeric score, and install count badge (e.g. `★★★★★ 4.5 • 5,000+ Downloads`).
  - Switched the card summary to clean, one-liner product taglines.
- **Section Heading Update:**
  - Replaced the eyebrow label and sub-paragraph with a single clean, confident heading: **"Built for privacy and productivity"**.

### 2026-10-27 (Session 4)
- **Header Navigation Streamlining:**
  - Removed secondary links (`Home`, `FAQs`, `Our Team`, `Careers`, `About`, `Contact Us`, `Explore Apps`) from the primary navbar.
  - Set navbar links strictly to the product divisions: **`ionXapps`**, **`ionXdomains`**, **`ionXhosting`**, and **`ionXservices`**.
  - Replaced the primary CTA button in the header with **"Talk to Sales"** pointing to `contact.html`.
- **Dedicated Pages Created for Infrastructure Divisions:**
  - `domains.html` (for **ionXdomains**).
  - `hosting.html` (for **ionXhosting**).
  - `services.html` (for **ionXservices**).
  - All three added to `sitemap.xml`.
- **Dynamic Text Styling in Content:**
  - `.hero-rotating-word` styled with `text-transform: lowercase` and `border-bottom: none` / `text-decoration: none`. All dynamic words trailing `ionX` display cleanly in lowercase without underline.
- **Hero & Content Updates:**
  - Tagline updated to: *"Building reliable tech for modern Digital India"*.
  - Removed "Explore Our Apps" button; replaced "Talk to Our Team" with a single primary **"Talk to Sales"** button.
  - Removed the 4-number metrics strip from the home page.

### 2026-10-27 (Session 3)
- **Mandatory Ownership Rule - Continuous Memory Maintenance:** Whenever any developer or AI assistant makes code, layout, style, content, or architectural modifications, they own the responsibility of immediately documenting the changes in `docs/AI-PROJECT-MEMORY.md` to ensure seamless knowledge transfer.
- **Hybrid Multi-Architecture Strategy Approved (Approach 1 - Subdomain Isolation):**
  - **Marketing & Public Documentation:** Keeps the current zero-dependency, ultra-fast static HTML/CSS/JS architecture on CDN/GitHub Pages (`ionxtech.com` / `ionxtech.dpdns.org`). Zero server maintenance, 100% uptime, maximum SEO.
  - **Dynamic Products (ionXhosting, ionXdomains, ionXservices console):** Will be built as independent Next.js / Node.js web applications hosted on the user's dedicated VPS under subdomains (e.g., `console.ionxtech.com` or `app.ionxtech.com`), decoupled from the static marketing site.
  - **Decoupled Security & Reliability:** Any VPS restart, maintenance, or high CPU spike in the customer backend will never impact the public-facing marketing site, app landing pages, or Google Play store references.

### 2026-10-27 (Session 2)
- **Home page restructured to MNC-level presentation:** removed studio badge, removed pillar pills, hero heading now shows `ionX` + auto-rotating word (tech/apps/hosting/domains/services), added metrics strip (165K+, 4, 100%, 0), only Privacy Display and Auto Call Scheduler shown on home, "How We Build Software" removed from home, added dark closing CTA band, divisions shown as horizontal row list.
- **Brand casing finalized across entire project:** all instances of `ionXApps`, `ionXHosting`, `ionXDomains`, `ionXServers` replaced with `ionXapps`, `ionXhosting`, `ionXdomains`, `ionXservices`. "Servers" division renamed to "services" (ionXservices).
- **Divisions expanded from 4 to 5:** added `ionXtech` as the parent company division (index 01).
- **`data-apps` filter attribute added to `app-knowledge-grid` component:** allows pages to specify which apps to show by ID.
- **Metrics strip component added:** `data-component="metrics-strip"` reads from `IONX_DATA.company.metrics[]`.
- **Division row layout added:** `division-list` and `division-row` CSS classes for the horizontal list format. Responsive down to single-column on mobile.
- **CTA band component added:** `.cta-band` CSS class for dark-background closing sections.

### 2026-10-27 (Session 1)
- **Full website rebuild from scratch.** Previous codebase used FontAwesome, purple/black theme, glassmorphism, and inline styles. Replaced with zero-dependency minimalist architecture.
- **Reusable UI system established:** `site-data.js` (data) + `layout.js` (templates) + `style.css` (design system). This trio is the foundation of the entire project.
- **Design system chosen:** Warm Minimalist Paper & Ink. Plus Jakarta Sans + IBM Plex Mono. Light mode only.
- **SEO infrastructure built:** sitemap.xml, robots.txt, JSON-LD schemas, canonical URLs, full OG/Twitter meta tags, descriptive alt text on all images.
- **All 4 app detail pages created** with dedicated FAQ sections and SoftwareApplication + FAQPage structured data.
- **All privacy policy pages restyled** with new design system while preserving original legal text.
- **Contact form added** with topic selector and mailto fallback for when Formspree is not configured.
- **docs/ folder created** with AI-INSTRUCTIONS.md and AI-PROJECT-MEMORY.md for onboarding future AI assistants.

