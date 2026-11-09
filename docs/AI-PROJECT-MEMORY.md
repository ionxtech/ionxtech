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
    <link rel="canonical" href="https://ionxtech.in/{path}">

    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:url" content="https://ionxtech.in/{path}">
    <meta property="og:image" content="https://ionxtech.in/assets/images/og-image.webp">
    <meta property="og:image:alt" content="{descriptive alt text}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://ionxtech.in/assets/images/og-image.webp">
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
| **No Eyebrow / Extra Section Headings** | Never add `<span class="mono-label">` or extra sub-headings above section titles or card headings on any page. Cards and sections open directly with their main heading. |
| **No emojis** | Never use emoji characters in page content. |
| **No em dashes** | Use commas, periods, or semicolons instead of `—`. |
| **No "demo" or mockup content** | Every piece of content must be real. No placeholder screenshots, fake testimonials, or lorem ipsum. |
| **Privacy policy content is sacred** | Do not modify the text of any privacy policy page unless the project owner explicitly provides new legal text. These are linked from Google Play Console. |
| **Contact email** | `hello@ionxtech.in` everywhere. |
| **Copyright line** | `© 2025 - 2026 ionXtech. All rights reserved.` |

---

## 7. SEO Architecture

| Feature | Implementation |
| :------ | :------------- |
| **JSON-LD Structured Data** | `Organization` schema on home page. `SoftwareApplication` + `FAQPage` schemas on each app detail page (injected both as static `<script>` tags in HTML and dynamically by `layout.js`). `Person` schema on team page. `ItemList` schema on apps directory. |
| **FAQ Rich Results** | `layout.js` automatically injects `FAQPage` JSON-LD for every FAQ list it renders (company FAQs and per-app FAQs). |
| **Canonical URLs** | Every page has `<link rel="canonical" href="https://ionxtech.in/...">`. |
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
| **No build step** | The site deploys as raw static files to Cloudflare (`ionxtech.in`). No webpack, no Vite, no Astro. |
| **NO automatic GitHub push** | **NEVER push to GitHub or create/merge pull requests automatically.** All changes must be built, tested, and validated locally ONLY. Pushing to GitHub requires explicit instruction and permission from the user. |
| **Serverless form storage** | No PHP or Node.js server. Contact Us and Waitlist forms post to a Cloudflare Worker (`assets/js/cloudflare-r2-worker.js`) bound to Cloudflare R2 (`IONX_BUCKET`) and Slack (`SLACK_WEBHOOK_URL`). |
| **Image filenames with spaces** | `QR Solution Logo.webp` and `QR Solution.webp` have spaces in their filenames. This is legacy and works, but new images should use hyphens. |
| **Logo filename casing** | The logo file is `IonXtech.webp` (capital I). This cannot be renamed as it's referenced externally. |
| **JS-injected header/footer** | Search engine crawlers that don't execute JS will not see the full navigation. This is a known trade-off for maintaining DRY code without a build system. Each page's static HTML includes enough content and internal links to partially compensate. |

---

## 10. Decision Log

### 2026-11-09 (Session 31)
- **404 Recovery Links and Nested-Path Assets:**
  - Changed the 404 page's navigation, stylesheets, scripts, icons, and `data-root` to root-relative URLs so a 404 served from a nested path such as `/.well-known/assetlinks.json` does not send users to nested `index.html` or `apps/` URLs or lose its styling.
  - Confirmed the assetlinks file was pushed to `feature/website-v2`, while the production deployment workflow runs only on `main`; the file must reach `main` for the live endpoint to update.

### 2026-11-09 (Session 30)
- **Android Digital Asset Links for Auto Call Scheduler:**
  - Added `.well-known/assetlinks.json` at the site root for `com.ionxtech.callscheduler`, declaring URL handling and login credential sharing for the supplied SHA-256 signing certificate fingerprint.

### 2026-11-09 (Session 29)
- **Home Page URL Shortener & Dynamic QR Generator Integration for SEO:**
  - Added a dedicated showcase card for **`ionXlinks — URL Shortener`** directly alongside **`Keka Work Time Tracker`** on the home page (`index.html`) in a symmetrical 2-column `.app-grid` under the section heading `Featured Chrome Extension & URL Shortener`.
  - Added direct external CTA `Launch ionXlinks ↗` linking to `https://links.ionxtech.in` and internal CTA `Learn More` linking to `services.html`.
  - Added `WebApplication` Schema.org JSON-LD structured data for `ionXlinks` in `index.html` to help Google and Bing index and associate the microservice with the primary domain knowledge graph.
  - Updated home page `<meta name="description">` and `<meta name="keywords">` to include `Keka Work Time Tracker`, `ionXlinks`, `URL shortener`, and `links.ionxtech.in`.
- **Automated Production Deployment & Slack Alert Pipeline (Consolidated Single Workflow):**
  - Copied the exact deployment notification mechanism from `C:\Users\Lenovo\ionxtech\URL-shortner\.github\workflows\deploy.yml`:
    - Evaluates `duration`, `failed_step`, and `reason` diagnostics in a dedicated summary step.
    - Generates Slack Block Kit payload via `cat > slack_deploy_payload.json` and posts directly via `curl -sS -X POST ... "$WEBHOOK"`.
    - Resolves the webhook in bash (`WEBHOOK="${SLACK_DEPLOY_WEBHOOK_URL:-$SLACK_WEBHOOK_URL}"`), completely eliminating expression-level boolean coercion errors.
    - Includes interactive buttons (`View Logs`, `Open Repo`, `Open ionXtech`).
  - Switched GitHub Pages `build_type` from `legacy` to `workflow` via GitHub API (`gh api -X PUT repos/ionxtech/ionxtech/pages -F "build_type=workflow"`).
  - Consolidated deployment into **one single pipeline** (`deploy.yml` with `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`, and IndexNow submission), eliminating the duplicate `pages-build-deployment` workflow run from the GitHub Actions tab.
- **Single-Screen No-Scroll Waitlist Pages (`domains.html` & `hosting.html`):**
  - Re-established `height: 100vh; height: 100dvh; overflow: hidden;` across `body.waitlist-page` in both `assets/css/style.css` and `assets/js/layout.js` (`renderWaitlistComingSoon`).
  - Optimized the vertical proportions to comfortably fit all screen heights without scrolling:
    - Infinity Loop SVG: `height: clamp(65px, 11vh, 110px); width: auto; max-width: min(260px, 70vw);`
    - Typography & Margins: Compact fluid clamp sizing for title, loop heading, subtitle, and CTA line.
    - Footer: Compact padding (`10px 0 8px`) with `flex-shrink: 0`.
    - Guarantees 100% visibility of the entire card (including the "Zero spam. Priority launch updates..." note) and footer without any overlap or scrollbar.
- **Mobile Footer Redesign (`@media (max-width: 768px)` in `assets/css/style.css` & `assets/js/layout.js`):**
  - Re-architected `.footer-horizontal` into a clean 2-column CSS Grid (`grid-template-areas: "brand socials" "tagline tagline" "nav nav"`):
    - Row 1: The `ionXtech` brand logo and text sit on the left, with the 4 social media buttons (`X`, `LinkedIn`, `Instagram`, `YouTube`) right-aligned on the exact same horizontal line.
    - Row 2: The company tagline sits underneath the brand header.
    - Row 3: `.footer-company-nav` displays all 5 links (`About`, `Our Team`, `Careers`, `FAQs`, and `Contact Us`) across one clean single horizontal line.
  - Aligned `.footer-bottom` elements (`© 2025 - 2026` on left, `ionXtech. All rights reserved.` on right).

### 2026-11-08 (Session 28)
- **Keka Work Time Tracker Chrome Extension, Forest Green X Brand Logo, OG Link Previews, Standardized `/apps/{app}/privacy-policy.html` Routes, Mobile UI Fixes, Waitlist Footer Fix & `ionXlinks` Sitemap Integration:**
  - Added **Keka Work Time Tracker** (`https://github.com/ARSN72/WorkHour`) under a dedicated **Chrome Extensions** category on `/apps/` (`apps/index.html`, `assets/js/site-data.js`, `assets/js/layout.js`), created its dedicated detail page (`apps/keka-work-time-tracker/index.html`) and privacy policy (`apps/keka-work-time-tracker/privacy-policy.html`), and featured it on the home page (`index.html`) below the `15,000+` counter.
  - Updated the brand logo across the site to the Forest Green X Circle Logo (`assets/images/IonXtech.png` and `assets/images/IonXtech.webp`), generated branded 1200×630 Open Graph preview banners (`assets/images/og-image.png`, `.webp`), and updated all HTML `<head>` blocks to reference PNG Open Graph images and PNG/Apple Touch favicons for universal WhatsApp/Twitter/Telegram link previews.
  - Added official X profile (`https://x.com/ionxtech`) with the vector X logo (`assets/images/social-x.svg`) to the footer.
  - Standardized all app privacy policy URLs under `/apps/{app}/privacy-policy.html` (`apps/qr-solution/privacy-policy.html`, `apps/privacy-display/privacy-policy.html`, `apps/call-message-scheduler/privacy-policy.html`, `apps/led-scroller/privacy-policy.html`, `apps/keka-work-time-tracker/privacy-policy.html`) while keeping redirect stubs at the legacy `/privacy-policy/*.html` paths.
  - Fixed mobile responsiveness on `/apps/keka-work-time-tracker/` by closing an unclosed `@media (max-width: 768px)` block in `assets/css/style.css` and adding `min-width: 0` + `table-layout: fixed; overflow-wrap: anywhere` for `.spec-table`.
  - Fixed waitlist footer overlap on `domains.html` and `hosting.html` by changing `.waitlist-viewport` from `height: 100vh; overflow: hidden;` to `min-height: 100vh; overflow-y: auto;`.
  - Updated `services.html` (`ionXlinks - URL Shortener & Dynamic QR Generator` with real-user non-technical use-case cards and `Domain Name & Hosting Information`), `team.html` (removed subtitle and photo border), `about.html` (removed `PRINCIPLE 01`–`04` labels), and `careers.html` (removed numbered eyebrow labels, added a **Software Developer (Web & Cloud Services)** opening, and updated `165,000+` to `15,000+`).
  - Integrated the `ionXlinks` microservice (`https://links.ionxtech.in/`, `/login`, `/register`, `/forgot-password`) into `sitemap.xml` and `robots.txt`, and created matching `sitemap.xml` and `robots.txt` inside `C:\Users\Lenovo\ionxtech\URL-shortner\apps\dashboard\public\`.
  - Implemented **IndexNow** (`https://www.indexnow.org/documentation`) across both `ionxtech.in` and `links.ionxtech.in`:
    - Created root UTF-8 verification key files (`e4a9b2c7d8f1463095b8c2a7e1f4d609.txt`) in `c:\Users\Lenovo\ionxtech\ionxtech\` and `C:\Users\Lenovo\ionxtech\URL-shortner\apps\dashboard\public\`.
    - Created zero-dependency IndexNow submission script `assets/js/submit-indexnow.mjs` that parses `sitemap.xml`, groups URLs by host (`ionxtech.in` and `links.ionxtech.in`), and submits bulk JSON POST payloads to `https://api.indexnow.org/indexnow`.
    - Added GitHub Actions workflow `.github/workflows/indexnow.yml` to automatically notify IndexNow search engines on `main` branch updates or manual dispatch.

### 2026-10-31 (Session 27)
- **Mobile "View All Apps" Placement & 3-Line (`☰` -> `✕`) Mobile Navigation Toggle:**
  - Repositioned the **"View All Apps"** button on mobile (`max-width: 768px`) so it appears directly below the second Featured Android App card and above the **`15,000+`** overall users counter (`.home-view-all-mobile` in `index.html` and `assets/css/style.css`), while keeping it in `.section-header` on desktop (`.home-view-all-desktop`).
  - Replaced the text `"Menu"` / `"Close"` mobile nav toggle button with a clean CSS 3-line hamburger icon (`.nav-toggle-bars`) that smoothly morphs into an `✕` close sign when `.nav-toggle.open` is active (`assets/js/layout.js` and `assets/css/style.css`).

### 2026-10-31 (Session 26)
- **Navbar CTA Changed to "Try Our Apps", Auto Call Scheduler Play Store Link Fixed & App Install Counts Updated:**
  - Changed the header navbar CTA button in `buildHeaderHTML` (`assets/js/layout.js`) from `"Talk to Sales"` (`contact.html`) to **`"Try Our Apps"`** (`apps/`), matching the home page hero CTA.
  - Updated the Google Play Store download link and package ID for **Auto Call Scheduler** to `https://play.google.com/store/apps/details?id=com.ionxtech.callscheduler&hl=en_IN` (`com.ionxtech.callscheduler`) across `assets/js/site-data.js`, `index.html`, `apps/index.html`, `apps/call-message-scheduler/index.html`, and `privacy-policy/auto-call-scheduler.html`.
  - Updated app install counts in `assets/js/site-data.js` and `index.html`:
    - **QR Solutions:** `500+`
    - **Privacy Display:** `5,000+`
    - **Auto Call Scheduler:** `5,000+`
    - **LED Scroller:** `500+`

### 2026-10-30 (Session 25)
- **Permanent Rule Against Extra Eyebrow Headings, Hero Button Changed to "Try Our Apps", and `15,000+` Animated Users Counter Added on Home Page:**
  - Added permanent project rule in `docs/AI-INSTRUCTIONS.md` and `docs/AI-PROJECT-MEMORY.md`: never add `<span class="mono-label">` eyebrow labels or extra sub-headings above section/card headings on any page (also cleaned remaining ones from `about.html`, `team.html`, and `careers.html`).
  - Changed the main hero CTA button on `index.html` from `"Talk to Sales"` (`contact.html`) to **`"Try Our Apps"`** redirecting to `apps/` (`/apps/` directory page).
  - Moved the **Featured Android Apps** section slightly higher (`.home-apps-section`) and added a large, high-impact animated counter below the featured apps cards (`#home-user-counter` inside `.home-users-showcase`) that smoothly counts from `0` to **`15,000+`** overall users when scrolled into view (`initHomeUsersCounter` in `assets/js/layout.js`).

### 2026-10-30 (Session 24)
- **Contact Us & App Detail Eyebrow Labels Removed, Official Email Updated to `hello@ionxtech.in`, Stacked Footer Tagline & Badge Cleanup:**
  - Removed `<span class="mono-label">` eyebrow labels (`Message Form`, `Headquarters`, `Electronic Mail`, and `Self-Service Resources`) from the cards on `contact.html`.
  - Removed `<span class="mono-label">` eyebrow labels (`Product Documentation`, `Technical Profile`, `Data Governance`, `Knowledge Base & Search Console FAQ`, and `More from ionXtech`) from `renderAppDetailPage` in `assets/js/layout.js` across all 4 app detail pages.
  - Replaced `ionxtechsolution@gmail.com` with the official email `hello@ionxtech.in` across `contact.html`, `assets/js/site-data.js`, `index.html`, `careers.html`, `terms.html`, `privacy-policy/qr-solution.html`, `privacy-policy/privacy-display.html`, `privacy-policy/auto-call-scheduler.html`, and `privacy-policy/led-scroller.html`.
  - Positioned the footer tagline (*"Building reliable tech for modern Digital India"*) directly below the `ionXtech` logo/brand in `.footer-brand-wrap` (`flex-direction: column; align-items: flex-start`) in `assets/css/style.css` and `assets/js/layout.js`.
  - Removed the `POLICY` badge from the privacy policy app cards (`privacy-grid` in `assets/js/layout.js`) and removed the `FOUNDER & CEO` badge from `team.html`.

### 2026-10-30 (Session 23)
- **Header Navbar Logo Removal, Larger Wordmark, Right-Aligned Nav Links & Global Horizontal Divider Line Removal:**
  - Removed the `<img>` logo icon (`.brand-logo-img`) from the header navbar in `buildHeaderHTML` (`assets/js/layout.js`) and added `.navbar .brand-logo-img { display: none; }` in `assets/css/style.css` so the top-left brand link displays the clean `ionXtech` wordmark text only (footer brand logo remains intact).
  - Increased the header `ionXtech` brand wordmark size (`.navbar .brand-text`) to `1.65rem` (`font-weight: 800; letter-spacing: -0.04em; line-height: 1`) for stronger visual presence in the navbar.
  - Right-aligned the header navigation page buttons (`ionXapps`, `ionXdomains`, `ionXhosting`, `ionXservices`) by adding `margin-left: auto; justify-content: flex-end;` to `.nav-menu` in `assets/css/style.css` and `assets/js/layout.js` so the links sit flush on the right side next to the **Talk to Sales** CTA button.
  - Removed all full-width thin horizontal divider lines (`border-bottom`) across the entire website (`header`, `.page-header`, and `.section` in `assets/css/style.css` and `index.html`).

> Append new decisions here in reverse chronological order.

### 2026-10-30 (Session 21)
- **Single Production Domain (`ionxtech.in`) & Cloudflare Hosting Consolidation:**
  - Confirmed `https://ionxtech.in` (`ionxtech.in`) as the one and only production domain across all 20 HTML pages (`<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`), `assets/js/site-data.js` (`domain: "https://ionxtech.in"`), `assets/js/layout.js` (JSON-LD `author.url`), `CNAME`, `robots.txt`, and `sitemap.xml`.
  - Removed all legacy `ionxtech.dpdns.org` and `ionxtech.com` domain references across the codebase and documentation.
  - Updated `assets/js/cloudflare-r2-worker.js` CORS configuration (`ALLOWED_ORIGINS` and fallback origin) to `https://ionxtech.in` and `https://www.ionxtech.in` (alongside `*.pages.dev` and `localhost` for testing).
  - Updated `docs/AI-INSTRUCTIONS.md` and `docs/AI-PROJECT-MEMORY.md` to reflect that the site is hosted on **Cloudflare** at `ionxtech.in`.

### 2026-10-30 (Session 20)
- **Production Form CORS for `ionxtech.in`:**
  - Added `https://ionxtech.in` and `https://www.ionxtech.in` to the Cloudflare form Worker CORS allowlist so browser submissions from both production hostnames can reach R2.
  - Contact form Worker failures now show an error and retain the entered form values instead of unexpectedly opening a mail client. Direct support email remains available as a separate link.
  - The Worker script (`assets/js/cloudflare-r2-worker.js`) is deployed separately in Cloudflare Workers.

### 2026-10-28 (Session 19)
- **Git Branching, GitHub Push & Cloudflare Pages Deployment Documentation (`docs/README.md`):**
  - Updated `docs/README.md` with step-by-step instructions on creating a new Git branch (`git checkout -b ...`), staging/committing changes, pushing to GitHub (`git push -u origin ...`), merging to `main`, and deploying on Cloudflare Pages Free Tier.
  - Updated `getCorsHeaders` in `assets/js/cloudflare-r2-worker.js` to automatically allow `*.pages.dev` and approved ionXtech origins.

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

### 2026-11-08 (Session 34)
- **Waitlist Page Footer Overlap Fixed (`domains.html`, `hosting.html`, `layout.js`, `style.css`):**
  - Replaced `height: 100vh; overflow: hidden;` and `main { min-height: 0 }` on `body.waitlist-page` in both [`assets/css/style.css`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/css/style.css) and `renderWaitlistComingSoon` in [`assets/js/layout.js`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/js/layout.js) with `min-height: 100vh; overflow-y: auto;` and `main { flex: 1 0 auto; padding: 16px 0 32px; }`.
  - Adjusted `.infinity-loop-svg` `max-height` from `230px` to `190px` so the waitlist card and `"Zero spam. Priority launch updates for ionXdomains / ionXhosting."` text always sit cleanly above the footer without overlapping on any screen height.
- **Mobile Responsiveness Fixed for App Detail Pages (`style.css`):**
  - Fixed a missing closing brace `}` on the `@media (max-width: 768px)` block at line 1366 of [`assets/css/style.css`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/css/style.css) that was preventing the `@media (max-width: 960px)`, `768px`, and `480px` responsive rules from applying properly.
  - Added `min-width: 0` to `.app-detail-columns > *`, `.app-grid > *`, and `.app-specs-strip > *`, and added `table-layout: fixed; word-break: break-word; overflow-wrap: anywhere` to `.spec-table` so long URLs like `https://github.com/ARSN72/WorkHour` on `/apps/keka-work-time-tracker/` wrap cleanly without horizontal mobile overflow.
  - Improved `.app-detail-top` and `.app-detail-actions` stacking on mobile screens.
- **Software Developer Role & User Count Updated on Careers (`careers.html`, `about.html`, `site-data.js`):**
  - Added a new **Software Developer (Web & Cloud Services)** opening card above the Android Application Engineering Intern opening on [`careers.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/careers.html).
  - Updated the user count from `165,000+` to `15,000+` across [`careers.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/careers.html), [`about.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/about.html), and [`assets/js/site-data.js`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/js/site-data.js).
- **Our Team (`team.html` & `style.css`):**
  - Removed the subtitle line `"Founder and Chief Executive Officer, ionXtech"` under Arshan Mansuri's heading.
  - Removed the border (`border: none; background: transparent`) around `.team-photo`.
- **Brand Logo Border Removed (`style.css`):**
  - Removed the square border and background from `.brand-logo-img` (`border: none; background: transparent; border-radius: 50%`) so `IonXtech.webp` displays cleanly as a circle.
- **Keka Work Time Tracker Added to Home Page (`index.html` & `layout.js`):**
  - Added a **"Featured Chrome Extension"** section directly below the `15,000+` counter on [`index.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/index.html) showcasing **Keka Work Time Tracker** (`data-apps="keka-work-time-tracker"`), without a secondary "View All Tools" header button.
  - Updated `renderHomeShowcaseCard` in [`assets/js/layout.js`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/js/layout.js) to support Chrome extension metadata and action buttons on the home page.
- **About & Careers Cards Cleaned Up (`layout.js` & `careers.html`):**
  - Removed `PRINCIPLE 01` – `PRINCIPLE 04` `.spec-index` labels from the 4 Engineering Principles cards in `layout.js` (`[data-component="principles-grid"]`).
  - Removed `01 / REAL PRODUCTION IMPACT` and `02 / CRAFTSMANSHIP & CLARITY` `.spec-index` labels from [`careers.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/careers.html).
- **Services Page Overhaul (`services.html`):**
  - Updated the service heading to **`ionXlinks - URL Shortener & Dynamic QR Generator`**.
  - Removed the technical Cloudflare edge routing sentence and replaced the 4 technical sub-cards with everyday user-friendly use cases (*Share Clean, Short Links*, *Custom Named Links*, *Ready-to-Print QR Codes*, *Safe & Private by Default*).
  - Replaced the *Custom APIs & Microservices* card with a **Domain Name & Hosting Information** card.
- **Privacy Policy Architecture Restructured (`apps/{app}/privacy-policy.html`):**
  - Co-located every app's privacy policy directly inside its own `apps/{app}/` folder alongside `index.html`:
    - `apps/qr-solution/privacy-policy.html`
    - `apps/privacy-display/privacy-policy.html`
    - `apps/call-message-scheduler/privacy-policy.html`
    - `apps/led-scroller/privacy-policy.html`
    - `apps/keka-work-time-tracker/privacy-policy.html`
  - Updated `privacySlug` across [`assets/js/site-data.js`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/js/site-data.js), [`apps/index.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/apps/index.html), [`privacy-policy/index.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/privacy-policy/index.html), and [`sitemap.xml`](file:///c:/Users/Lenovo/ionxtech/ionxtech/sitemap.xml) to point to `apps/{app}/privacy-policy.html`.

### 2026-11-08 (Session 33)
- **Official X (Twitter) Profile Added to Footer:**
  - Replaced [`assets/images/social-x.svg`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/social-x.svg) with the official 24×24 vector X brand icon (`fill="currentColor"`), matching the styling of `social-linkedin.svg`, `social-instagram.svg`, and `social-youtube.svg`.
  - Added X (`https://x.com/ionxtech`) to `IONX_DATA.company.socials` in [`assets/js/site-data.js`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/js/site-data.js) and `sameAs` in [`index.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/index.html) Organization JSON-LD schema, rendering the X link and icon in the reusable footer across all pages.
- **Website Brand Logo Updated to Forest Green X Circle Logo:**
  - Replaced [`assets/images/IonXtech.webp`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/IonXtech.webp) and [`assets/images/IonXtech.png`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/IonXtech.png) with high-resolution 512×512 assets generated from `"C:\Users\Lenovo\Downloads\Forest Green X Circle Logo.png"`.
  - Updated [`assets/images/favicon.svg`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/favicon.svg) to render the Forest Green X Circle vector mark instead of the legacy purple `#6366f1` icon.
- **Open Graph Link Preview & Social Icon Fix (WhatsApp / Social Crawlers):**
  - **Root Cause Identified:** Previously, [`assets/images/og-image.webp`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/og-image.webp) and `og-image.png` were a blank solid `#6366f1` purple rectangle leftover from the legacy site, causing WhatsApp and social platforms to display a solid purple box with no logo when sharing `ionxtech.in`. Additionally, many mobile link previewers prefer `image/png` over `.webp` for `og:image`.
  - **Branded Preview Cards Generated:** Generated new 1200×630 (`og-image.png` & `.webp`), 600×315 (`og-image-small.png` & `.webp`), and 600×600 (`og-image-square.png` & `.webp`) preview cards featuring the Forest Green X Circle Logo, **ionXtech** typography, division subtitle, and `ionxtech.in` badge on the Warm Minimalist Paper (`#F8F7F4`) background.
  - **Meta Tags & Favicons Updated Across All 22 HTML Pages:** Pointed `og:image` and `twitter:image` to `https://ionxtech.in/assets/images/og-image.png` (busting WhatsApp's `.webp` cache and ensuring universal crawler compatibility) and added `<link rel="icon" type="image/png">` and `<link rel="apple-touch-icon">` alongside the WebP icon.

### 2026-11-08 (Session 32)
- **Dedicated App Details Page for Keka Work Time Tracker:**
  - Created [`apps/keka-work-time-tracker/index.html`](file:///c:/Users/Lenovo/ionxtech/ionxtech/apps/keka-work-time-tracker/index.html) with full static SEO metadata, Open Graph tags, JSON-LD `SoftwareApplication` (BrowserExtension) and `FAQPage` schemas.
  - Linked to hydration runtime via `<main id="main" data-app-detail="keka-work-time-tracker">`.
  - Added URL to [`sitemap.xml`](file:///c:/Users/Lenovo/ionxtech/ionxtech/sitemap.xml) (`https://ionxtech.in/apps/keka-work-time-tracker/`).
- **Official Extension Logo Updated:**
  - Processed user download `icon128.png` and generated [`assets/images/KekaWorkHourLogo.webp`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/KekaWorkHourLogo.webp) and `KekaWorkHourLogo.png`.
- **New Brand Website Logo Replaced Across Entire Site:**
  - Processed user download `IonXTech Green Circle Logo.png` and generated high-resolution 512x512 circular [`assets/images/IonXtech.webp`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/IonXtech.webp) and `IonXtech.png`.
  - Replaced the previous square logo directly at the canonical image asset location, instantly updating the navbar header, footer, favicon, and brand marks across all 20+ site pages.
- **Dynamic Extension Rendering in `layout.js`:**
  - Extended `renderAppDetailPage` to detect `isExtension` (`platform === "chrome-extension"`).
  - Configured extension-appropriate actions ("GitHub Repository ↗" and "Documentation"), metadata strip ("Platform: Chrome Extension", "Target Portal: Keka HRMS", "Compatibility: Chrome 88+"), and privacy disclosure without Android Play Store assumptions.
  - Extended `injectAppSchema` to dynamically output `BrowserExtension` and `operatingSystem: "Chrome, Chromium-based browsers"`.
- **Card Navigation Wired on `/apps/` (`apps/index.html`):**
  - Updated Keka card `data-page="keka-work-time-tracker/"` and `site-data.js` `pageSlug: "apps/keka-work-time-tracker/"` so clicking the card navigates directly to the new dedicated app page just like the other 4 Android apps.

### 2026-11-08 (Session 31)
- **Keka Work Time Tracker Chrome Extension Added to Apps Directory:**
  - **New Extension Registered:** Added `Keka Work Time Tracker` (`id: "keka-work-time-tracker"`), an open-source Chrome extension for tracking active work hours and break deductions on the Keka HR portal, linking directly to GitHub (`https://github.com/ARSN72/WorkHour`).
  - **Asset Created:** Created web-optimized 512x512 logo assets [`KekaWorkHourLogo.webp`](file:///c:/Users/Lenovo/ionxtech/ionxtech/assets/images/KekaWorkHourLogo.webp) and `KekaWorkHourLogo.png`.
  - **Directory Categorization on `/apps/` (`apps/index.html`):** Restructured the applications page into two clean sections: **Android Applications** (the 4 Google Play apps) and **Chrome Extensions** (Keka Work Time Tracker). Both sections use `data-component="app-knowledge-grid"` with dedicated `data-apps` filters.
  - **Template Adaptability in `layout.js`:** Enhanced `renderKnowledgePanelCard` to detect Chrome extensions (`app.platform === "chrome-extension"`) and adapt the knowledge panel metadata (Platform, Target Portal, Repository, Local Storage Architecture) and primary action button (`GitHub Repository ↗`). Also updated card-link delegation to cleanly open external GitHub URLs in a new tab.

### 2026-11-04 (Session 30)
- **ionXservices Transformed from Coming Soon to Production Services Page:**
  - **Removed Waitlist Loop:** Converted `services.html` from `<body class="waitlist-page">` and `data-component="waitlist-coming-soon"` to a full-fledged production landing page adhering to the Paper & Ink design aesthetic.
  - **Clean Minimalist Card for ionXlinks:** Built a clean, focused showcase card on `services.html` detailing the URL Shortener utility with direct action button redirecting to `https://links.ionxtech.in`. Removed tag badges (`LIVE SERVICE`, `links.ionxtech.in`, `Cloudflare Edge`), removed index numbers (`01`, `02`, `03`, `04`) from sub-cards, and removed the direct URL line for a clutter-free presentation.
  - **Architecture & Offerings Grids:** Added 4-column capabilities (`.grid-4`) and 2-column cloud engineering services (`.grid-2`: Custom APIs & microservices, managed VPS infrastructure).
  - **Single Source of Truth Updated:** Updated `IONX_DATA.divisions` in `assets/js/site-data.js` to mark `ionXservices` as `Live Service` with updated description, while keeping `ionXdomains` and `ionXhosting` on their respective waitlists.

### 2026-11-03 (Session 29)
- **Auto Call Scheduler New Logo Integration:**
  - Replaced the Auto Call Scheduler app icon with the user-provided high-resolution asset (`Automated Green Communication Clock.png`), processed into 512x512 WebP (`CallMessageLogo.webp`) and PNG (`CallMessageLogo.png`).
  - Updated all references across `site-data.js`, `index.html`, `/apps/call-message-scheduler/index.html`, `/privacy-policy/auto-call-scheduler.html`, and `/privacy-policy/index.html` with cache-busting `?v=2`.
- **Card App Icon Redesign (Eliminating Clumsy Framed Box):**
  - **Removed Inset Box & Borders:** Stripped away the inner padding (`padding: 6px/8px -> 0`) and the hard outer border (`border: 1px solid var(--border) -> border: none; background: var(--surface)`), eliminating the ugly "framed picture inside a card" look.
  - **Modern App Squircle Shape:** Applied smooth squircle curvature (`border-radius: 14px` for 56px icons, `16px` for 68px showcase icons, and `18px` for 76px detail hero icons).
  - **Edge-to-Edge Fill:** Set `object-fit: cover` so the artwork naturally and crisply occupies the entire app tile geometry.
  - **Physical Elevation & Micro-interaction:** Added soft ambient drop shadows (`box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.06)`) with a subtle tactile lift on card hover (`translateY(-2px)`), making app cards look like authentic Google Play tiles.

### 2026-10-31 (Session 28)
- **Footer Brand Tagline Update:**
  - Replaced `"Building reliable tech for modern Digital India"` with `"Building reliable tech for modern Digital Needs"` in `assets/js/site-data.js` (`IONX_DATA.company.tagline` and `heroSubtitle`), updating the footer text across all pages.
- **Hero CTA to Featured Apps Spacing Calibration:**
  - Calibrated the distance between the primary `"Try Our Apps"` button in the Hero section and the `"Featured Android Apps"` heading on mobile screens (`max-width: 899px`).
  - Added `padding-bottom: 20px;` to `body.home-page .hero` and set `body.home-page .home-apps-section` to `padding-top: 36px !important;` (56px combined spacing), giving generous, clear breathing room and eliminating awkward collision between the button and heading.
- **Mobile Homepage "View All Apps" Button & Spacing Optimization:**
  - **Single Button on Mobile:** Completely removed the upper "View All Apps" button in the section header on mobile/tablet viewports (`max-width: 899px`) using `.home-view-all-desktop, .section-header .home-view-all-desktop { display: none !important; }`. Desktop view keeps the upper button in `.section-header`.
  - **Refined Mobile Action Button Placement & Spacing:** Positioned the sole mobile "View All Apps" button between the second showcase app card and the active users counter with balanced spacing (`margin: 20px 0 24px`, full-width, `padding: 13px 24px`, weight 600).
  - **Counter Showcase Harmonization:** Adjusted `.home-users-showcase` mobile margin to `margin-top: 12px !important; padding-top: 6px !important;` so the 15,000+ counter sits at an aesthetically balanced distance from the button.
  - **Redundant Style Safety:** Declared in `assets/css/style.css` and reinforced directly within `index.html` head to prevent stale browser CSS caching issues.

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

### 2026-11-09 (Session 6)
- **Google OAuth Compliance & Master Legal Documentation:**
  - Expanded `privacy-policy/index.html` from a basic directory card list into the comprehensive Master Privacy Policy for ionXtech, digital services, and Google OAuth integrations.
  - Added mandatory **Google API Services User Data Policy / Limited Use Disclosure** explicitly adhering to Google requirements for OAuth verification.
  - Included detailed Google OAuth scopes handling (name, email, profile picture), zero data monetization disclosure, and user data deletion/revocation instructions (`myaccount.google.com/permissions` and `privacy@ionxtech.in`).
  - Created root `privacy.html` mirroring `privacy-policy/index.html` with canonical link to prevent 404 on `/privacy` / `/privacy.html`.
  - Updated `terms.html` to formal "Terms of Service" governing Google OAuth authentication, session security, and third-party API compliance.
  - Added persistent `Privacy Policy` and `Terms of Service` links to `.footer-bottom` across all desktop and mobile pages.
- **CI/CD Pipeline Consolidation & GitHub Pages Automation Fix:**
  - Resolved duplicate workflow runs on deployment (`pages build and deployment` + `deploy.yml`). Switched GitHub Pages deployment source from `build_type: legacy` to `build_type: workflow` via GitHub API, ensuring only a single deployment workflow runs on push to `main`.
  - Fixed Slack deployment alert failure (`curl: (3) URL rejected: Port number was not a decimal number between 0 and 65535`):
    - Re-set GitHub Actions secret `SLACK_DEPLOY_WEBHOOK_URL` cleanly using `--body` to eliminate carriage returns introduced by PowerShell pipeline streaming.
    - Sanitized the webhook URL defensively in bash (`tr -d '\r\n ' | xargs`).
    - Parameterized all GitHub Actions contextual fields (`COMMIT_MSG`, `ACTOR`, `BRANCH`, etc.) through workflow step `env` mapping to avoid bash argument injection and quoting errors.
    - Updated Slack alert block fields: replaced bulky `Details / Reason:` and `Failed Step:` with compact and informative `Production URL: https://ionxtech.in` and `Health Check: 200 OK (Live on Cloudflare)` with live curl HTTP status evaluation.
- **Mobile Footer Redesign:**
  - Placed `ionXtech` brand logo and social links side-by-side on the top row (`grid-template-areas: "brand socials" "tagline tagline" "nav nav"`).
  - Aligned mobile footer navigation links (`About`, `Our Team`, `Careers`, `FAQs`, `Contact Us`) onto a single horizontal line with `flex-wrap: nowrap` and `overflow-x: auto`.
- **Zero-Scroll Waitlist Layout (`domains.html`, `hosting.html`):**
  - Optimized viewport dimensions and responsive spacing so waitlist pages display entirely within a single viewport without scrolling on desktop screens.
- **Homepage Product Showcase Alignment:**
  - Balanced 2-column showcase pairing Keka Work Time Tracker with ionXlinks (URL Shortener).

### 2026-11-08 (Session 5)
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
  - **Marketing & Public Documentation:** Hosted as a zero-dependency static HTML/CSS/JS site on **Cloudflare** at the official domain `ionxtech.in` (`https://ionxtech.in`).
  - **Dynamic Products (ionXhosting, ionXdomains, ionXservices console):** Will be built as independent Next.js / Node.js web applications hosted on the user's dedicated VPS under subdomains (e.g., `console.ionxtech.in` or `app.ionxtech.in`), decoupled from the static marketing site.
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

