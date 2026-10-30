# AI Instructions for ionXtech Website

> This document is the single source of truth for any AI coding assistant working on this project.
> Read this file **completely** before writing a single line of code.

---

## 1. Project Identity

| Field | Value |
| :---- | :---- |
| **Project** | ionXtech Official Website |
| **Domain** | `ionxtech.in` (`https://ionxtech.in`) |
| **Hosting** | Cloudflare Pages & DNS (connected to GitHub) |
| **Tech Stack** | Pure HTML5 + CSS3 + Vanilla JavaScript. **Zero npm dependencies, zero build step.** |
| **Hybrid Strategy** | The public marketing site is a static website hosted on Cloudflare at `ionxtech.in` (the one and only domain). Future interactive SaaS/console products may run on subdomains (e.g., `console.ionxtech.in`). |
| **Repository** | `c:\Users\Lenovo\ionxtech\ionxtech` |

### What ionXtech Is
ionXtech is an Indian technology startup headquartered in Indore, Madhya Pradesh. It publishes privacy-first Android utility apps on Google Play and is expanding into web infrastructure (hosting, domains, services). The website is its public-facing marketing, documentation, and legal compliance hub.

### The Five Divisions
| Division | Casing (exact) | Status |
| :------- | :------------- | :----- |
| Parent company | **ionXtech** | Active |
| Mobile apps | **ionXapps** | Live on Google Play |
| Web hosting | **ionXhosting** | Coming Soon |
| Domain management | **ionXdomains** | Coming Soon |
| Cloud & custom dev | **ionXservices** | Coming Soon |

### The Four Android Apps
| # | App Name | Package ID | Play Store Status |
| :- | :------- | :--------- | :---------------- |
| 1 | QR Solutions | `com.ionxtech.qrsolution` | Live |
| 2 | Privacy Display | `com.ionxtech.privacydisplay` | Live |
| 3 | Auto Call Scheduler | `com.ionxtech.autocallscheduler` | Live |
| 4 | LED Scroller | `com.ionxtech.ledscroller` | Live |

---

## 2. Absolute Rules (DO and DO NOT)

### DO
- **Always read `docs/AI-PROJECT-MEMORY.md`** before making changes. It records every architectural decision and convention agreed upon with the project owner.
- **Mandatory Ownership - Keep Memory Updated:** Whenever you make ANY code, design, layout, or content modification in the project, **it is your direct ownership to immediately update `docs/AI-PROJECT-MEMORY.md`** under the Decision Log and relevant sections. This guarantees seamless knowledge transfer to subsequent developers and AI assistants.
- **Use the reusable component system.** Header, footer, app knowledge panels, FAQ lists, division rows, and metrics are all rendered by `layout.js` from `site-data.js`. Never hardcode these into individual pages.
- **Add new apps or content by editing `site-data.js` only.** The templates in `layout.js` will pick them up automatically.
- **Write SEO-complete HTML shells.** Every page must have its own `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags, `<link rel="canonical">`, and relevant JSON-LD structured data (`Organization`, `SoftwareApplication`, `FAQPage`, `Person`, etc.) directly in the HTML `<head>`, not injected by JavaScript.
- **Use `data-root` attribute** on the `<html>` element of every page so `layout.js` resolves asset and link paths correctly (`./`, `../`, `../../`).
- **Keep all images in WebP format** in `assets/images/`. Every `<img>` must have a descriptive `alt` attribute written for SEO (not just "logo" but "QR Solutions Android app icon by ionXtech for scanning and generating QR codes").
- **Preserve all existing privacy policy content exactly as-is** unless the project owner explicitly asks to change legal text. These policies are linked from Google Play Console and must remain accurate.
- **Test mobile responsiveness.** The CSS is designed for desktop-first with breakpoints at 960px, 768px, and 480px.

### DO NOT
- **Do NOT install npm, Node.js frameworks, React, Astro, or any build tooling.** This is a zero-dependency static site deployed directly to Cloudflare.
- **Do NOT use Lucide Icons, FontAwesome, or any icon library.** The design is intentionally icon-free and typographic.
- **Do NOT use emojis** anywhere in the rendered website.
- **Do NOT use em dashes (—).** Use commas, periods, or rewrite the sentence.
- **Do NOT use "liquid glass" / glassmorphism effects** (`backdrop-filter: blur`).
- **Do NOT use Inter, Geist, or Space Grotesk fonts.** The project uses **Plus Jakarta Sans** (body/headings) and **IBM Plex Mono** (technical labels/metadata).
- **Do NOT put 3 feature cards in a row.** Use 2-column or 4-column grids only.
- **Do NOT use bento grids, terminal window UI, or fake demo/mockup content.**
- **Do NOT use purple, black backgrounds, radial orbs, dot-grid backgrounds, sparkle icons, rainbow coloring, or animated arrows.**
- **Do NOT add hover scale/bounce animations.** Border-color change on hover for cards is acceptable.
- **Do NOT create dark mode.** The site is light-mode only with the Warm Paper & Ink palette.
- **Do NOT bypass or modify the reusable component architecture.** If you need a new component, add it to `layout.js` as a new `data-component` type.
- **Do NOT change the `CNAME` file** (`ionxtech.in`).
- **Do NOT hardcode header/footer HTML into page files.** Every page uses `<header></header>` and `<footer></footer>` as empty shells that `layout.js` fills.

---

## 3. Project Architecture

### File Structure
```
ionxtech/
├── index.html                           # Home page
├── about.html                           # About ionXtech
├── careers.html                         # Open positions
├── contact.html                         # Contact form & address
├── faqs.html                            # Company-wide FAQ page
├── team.html                            # Leadership profiles
├── terms.html                           # Terms of Use
├── 404.html                             # Custom 404 page
├── sitemap.xml                          # XML sitemap for crawlers
├── robots.txt                           # Crawler directives
├── CNAME                                # GitHub Pages custom domain
├── app-ads.txt                          # Google AdMob ads.txt
├── apps/
│   ├── index.html                       # Apps directory (all 4 apps)
│   ├── qr-solution/index.html           # Dedicated QR Solutions page
│   ├── privacy-display/index.html       # Dedicated Privacy Display page
│   ├── call-message-scheduler/index.html # Dedicated Auto Call Scheduler page
│   └── led-scroller/index.html          # Dedicated LED Scroller page
├── privacy-policy/
│   ├── index.html                       # Privacy policies hub
│   ├── qr-solution.html
│   ├── privacy-display.html
│   ├── auto-call-scheduler.html
│   └── led-scroller.html
├── assets/
│   ├── css/style.css                    # Single global stylesheet
│   ├── js/site-data.js                  # Centralized data store (THE source of truth)
│   ├── js/layout.js                     # Reusable component engine & header/footer
│   └── images/                          # All .webp/.svg images
├── docs/                                # Project documentation (this folder)
│   ├── AI-INSTRUCTIONS.md               # (this file)
│   ├── AI-PROJECT-MEMORY.md             # Architectural decisions & SOP memory
│   ├── README.md                        # How to run the project
│   └── update.md                        # Legacy improvement plan (archived)
└── tools/                               # Optional Python image utilities
    ├── convert_to_webp.py
    └── generate_og_variants.py
```

### The Three Core Files
| File | Role | When to Edit |
| :--- | :--- | :----------- |
| `assets/js/site-data.js` | **Central Data Store.** All app metadata, company info, FAQs, team bios, career listings, division definitions, and metrics live here as a `window.IONX_DATA` object. | When adding/changing apps, FAQs, team members, division info, or any content that appears on multiple pages. |
| `assets/js/layout.js` | **Reusable Component Engine.** Reads `IONX_DATA` and renders the shared header, footer, app knowledge panels, FAQ accordions, division rows, metrics strip, and privacy grids into any page that has the matching `data-component` attribute. | When adding a new reusable component type or changing the HTML structure of existing components. |
| `assets/css/style.css` | **Global Stylesheet.** Single CSS file with the full design system (colors, typography, layout grids, responsive breakpoints). No component-scoped CSS files. | When adding new CSS classes for new components, or adjusting responsive behavior. |

---

## 4. Design System

### Color Palette (Warm Minimalist Paper & Ink)
| Token | Hex | Usage |
| :---- | :-- | :---- |
| `--bg` | `#F8F7F4` | Page background (warm off-white paper) |
| `--surface` | `#FFFFFF` | Cards, panels, footer |
| `--surface-subtle` | `#F1EFEA` | Hover states, secondary backgrounds |
| `--text` | `#141413` | Primary headings and body text (carbon ink) |
| `--text-secondary` | `#4A4945` | Body paragraphs |
| `--text-muted` | `#76746E` | Labels, captions, metadata |
| `--border` | `#E2E0D8` | Standard 1px borders |
| `--accent` | `#1B4332` | Accent color (deep forest green) |

### Typography
| Font | Variable | Usage |
| :--- | :------- | :---- |
| Plus Jakarta Sans | `--font-sans` | All headings (800 weight) and body text (400-600 weight) |
| IBM Plex Mono | `--font-mono` | Mono labels, package IDs, badges, breadcrumbs, FAQ toggle characters |

### Responsive Breakpoints
| Breakpoint | Target |
| :--------- | :----- |
| `960px` | Tablet landscape, collapse 4-col to 2-col |
| `768px` | Tablet portrait & large phones, mobile nav drawer, 2-col to 1-col |
| `480px` | Small phones, full-width buttons and stacked layouts |

---

## 5. How to Add Common Things

### Add a New Android App
1. Add a new entry to the `apps` array in `site-data.js` with all required fields (copy an existing app as a template).
2. Create the dedicated page at `apps/{slug}/index.html` with `data-app-detail="{id}"` on `<main>`.
3. Create the privacy policy page at `privacy-policy/{slug}.html`.
4. Add both URLs to `sitemap.xml`.
5. The home page, apps directory, footer, and privacy hub will pick up the new app automatically.

### Add a New FAQ
- **Company FAQ:** Add to the `companyFaqs` array in `site-data.js`.
- **App-specific FAQ:** Add to the `faqs` array inside the specific app object in `site-data.js`.

### Add a New Team Member
Add a new entry to the `team` array in `site-data.js`.

### Change Which Apps Appear on the Home Page
Edit the `data-apps` attribute on the `app-knowledge-grid` div in `index.html`. It takes a comma-separated list of app IDs (e.g., `data-apps="privacy-display,call-message-scheduler"`).

### Add a New Reusable Component
1. Write the render function in `layout.js`.
2. Register it in the `renderReusableSections()` function with a `data-component="your-name"` query selector.
3. Place `<div data-component="your-name"></div>` in any HTML page to invoke it.

---

## 6. Brand Name Casing Rules

This is the **#1 most common mistake** AI assistants make on this project.

| Correct | WRONG |
| :------ | :---- |
| ionXtech | IonXtech, Ionxtech, IONXTECH, ionxTech, IonXTech |
| ionXapps | ionXApps, IonXApps, ionxapps |
| ionXhosting | ionXHosting, IonXHosting |
| ionXdomains | ionXDomains, IonXDomains |
| ionXservices | ionXServices, ionXServers, IonXServices |

**Rule:** The brand is always lowercase `ion`, uppercase `X`, then lowercase everything else. The only capital letter after `ionX` is never.

**Exception:** The image filename `IonXtech.webp` (the logo file) cannot be renamed because it is referenced across the project and in external systems. When setting the `alt` attribute for this image, still write the brand as `ionXtech`.

---

## 7. How to Run Locally

```bash
cd c:\Users\Lenovo\ionxtech\ionxtech
python -m http.server 8080
```
Open http://localhost:8080/ in a browser. Use Ctrl+Shift+R to bypass cache after changes.

---

## 8. Deployment

The production website is hosted on **Cloudflare** at `ionxtech.in` (`https://ionxtech.in`), which is the single official domain for **ionXtech**. Pushes to the connected GitHub repository automatically deploy static site changes to Cloudflare. Form submissions (`contact.html` and waitlist pages) are handled by the Cloudflare Worker (`assets/js/cloudflare-r2-worker.js`) bound to R2 (`IONX_BUCKET`) and Slack (`SLACK_WEBHOOK_URL`). No build step is required.

