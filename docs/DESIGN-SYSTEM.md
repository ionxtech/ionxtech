# ionXtech Website Design System

This document summarizes the visual direction and page patterns for AI agents and contributors working on the ionXtech website. The implementation source of truth is `assets/css/style.css`; shared page components are rendered by `assets/js/layout.js` using content from `assets/js/site-data.js`.

## Visual Direction

Use the existing Warm Paper & Ink design system. The site should feel light, calm, clear, and content-focused, with a restrained editorial technology aesthetic. Prioritize readable typography, generous spacing, clear hierarchy, and practical navigation over decoration.

## Color Tokens

| Token | Value | Use |
| :--- | :--- | :--- |
| `--bg` | `#F8F7F4` | Main page background |
| `--surface` | `#FFFFFF` | Cards and raised surfaces |
| `--surface-subtle` | `#F1EFEA` | Subtle fills and hover states |
| `--surface-muted` | `#EAE7DF` | Muted surface areas |
| `--text` | `#141413` | Headings and primary text |
| `--text-secondary` | `#4A4945` | Body text |
| `--text-muted` | `#76746E` | Supporting labels and metadata |
| `--border` | `#E2E0D8` | Standard borders |
| `--border-strong` | `#C5C2B8` | Emphasized borders |
| `--accent` | `#1B4332` | Brand accent, forest green |
| `--accent-subtle` | `#E8F0EC` | Subtle accent background |
| `--accent-border` | `#B7D1C4` | Subtle accent border |

Use CSS variables from `:root` instead of introducing one-off colors. The design is light-mode only.

## Typography and Shape

- Use Plus Jakarta Sans for headings and body text.
- Use IBM Plex Mono sparingly for technical labels and metadata.
- Keep headings direct and strong, with a clear page-level `h1` and orderly `h2`/`h3` sections.
- Existing radius tokens are 6px, 10px, and 14px. Prefer compact shapes over pill-shaped controls.
- The main content container uses a maximum width of 1120px.

## Page and Content Flow

- Every page uses the shared header and footer. Keep their empty HTML shells and let `layout.js` render them.
- The homepage flow is: brand hero, featured Android apps, featured Chrome extension and ionXlinks URL shortener, closing contact CTA, shared footer.
- Inner pages open with a clear page title and supporting description, followed by scannable content and relevant actions.
- App pages consistently present product information, features, specifications, FAQs, and related links.
- Use two-column or four-column card grids. Do not use three feature cards in one row.
- Keep content data-driven in `site-data.js` when it is shared or rendered by reusable components.

## Responsive Design

Design and verify desktop, tablet, and phone layouts. Important CSS breakpoints include 960px, 768px, and 480px; component-specific rules may also use 992px or 899px. Check the relevant selectors in `style.css` before changing responsive behavior.

## Constraints

- Do not add dark mode, purple or black page backgrounds, gradients, radial orbs, dot grids, bento layouts, or decorative glass effects.
- Do not add icon libraries, hover scale/bounce effects, or animated arrows.
- Do not add eyebrow labels or extra subheadings above section and card headings.
- Preserve the exact brand casing: `ionXtech`, `ionXapps`, `ionXhosting`, `ionXdomains`, and `ionXservices`.
- Preserve privacy policy text unless the project owner explicitly asks to change it.
- Keep the implementation aligned with the static HTML, CSS, and vanilla JavaScript architecture. Do not introduce a framework or build step.

## Before Editing

Read `docs/AI-INSTRUCTIONS.md` and `docs/AI-PROJECT-MEMORY.md`. Reuse existing CSS variables and components, update project memory for changes, and validate the affected pages at desktop and mobile sizes.