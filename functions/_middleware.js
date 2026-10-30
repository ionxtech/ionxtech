/**
 * Cloudflare Pages Middleware for ionXtech Multi-Portal Subdomain Architecture
 *
 * Responsibilities:
 *  1. Read incoming hostname and match against centralized `portalRoutes`.
 *  2. Pass through static assets (`/assets/*`, `/favicon.ico`, `/robots.txt`, `/sitemap.xml`, etc.) without redirect loops.
 *  3. Pass through main site (`ionxtech.in`, `www.ionxtech.in`, `*.pages.dev`, `localhost`).
 *  4. Internally rewrite enabled subdomain portals (e.g., `domains.ionxtech.in/` -> `/domains.html`)
 *     while preserving the original browser URL, HTTP method, headers, body, and query string.
 *  5. Rewrite canonical and Open Graph URLs on rewritten HTML responses so each portal has its own canonical URL.
 *  6. Return a clean, branded 404 response for disabled or unconfigured subdomains without exposing internal routes.
 */

import {
    PRIMARY_DOMAIN,
    PRIMARY_ORIGIN,
    resolvePortalRoute,
    isPreviewOrLocalHost
} from "./config/routes.js";

const STATIC_ASSET_PREFIXES = [
    "/assets/",
    "/cdn-cgi/"
];

const SHARED_ROOT_FILES = new Set([
    "/robots.txt",
    "/sitemap.xml",
    "/app-ads.txt",
    "/favicon.ico",
    "/CNAME"
]);

const STATIC_FILE_EXTENSIONS = /\.(css|js|mjs|webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|otf|json|xml|txt|map|pdf|webmanifest)$/i;

/**
 * Determines whether a request path targets a static asset that should be served directly
 * from the root deployment without portal path rewriting.
 *
 * @param {string} pathname
 * @returns {boolean}
 */
function isStaticAssetPath(pathname) {
    if (!pathname) return false;
    if (SHARED_ROOT_FILES.has(pathname)) {
        return true;
    }
    for (let i = 0; i < STATIC_ASSET_PREFIXES.length; i++) {
        if (pathname.startsWith(STATIC_ASSET_PREFIXES[i])) {
            return true;
        }
    }
    if (STATIC_FILE_EXTENSIONS.test(pathname) && !pathname.toLowerCase().endsWith(".html")) {
        return true;
    }
    return false;
}

/**
 * Normalizes a URL pathname to prevent path traversal or malformed double slashes.
 *
 * @param {string} pathname
 * @returns {string}
 */
function sanitizePathname(pathname) {
    if (!pathname || typeof pathname !== "string") {
        return "/";
    }
    const collapsed = pathname.replace(/\/{2,}/g, "/");
    const segments = collapsed.split("/");
    const safeSegments = [];
    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (!seg || seg === ".") continue;
        if (seg === "..") {
            safeSegments.pop();
            continue;
        }
        safeSegments.push(seg);
    }
    return "/" + safeSegments.join("/");
}

/**
 * Renders a branded Warm Paper & Ink 404 / Portal Unavailable HTML response
 * for disabled or unconfigured subdomains.
 *
 * @param {string} title
 * @param {string} message
 * @param {number} status
 * @returns {Response}
 */
function buildPortalUnavailableResponse(title, message, status = 404) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ionXtech</title>
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#F8F7F4">
    <link rel="icon" type="image/webp" href="${PRIMARY_ORIGIN}/assets/images/IonXtech.webp">
    <link rel="stylesheet" href="${PRIMARY_ORIGIN}/assets/css/style.css?v=10">
</head>
<body>
    <main id="main" class="container" style="min-height: 85vh; padding: 80px 24px; display: flex; align-items: center; justify-content: center;">
        <div class="card" style="max-width: 540px; width: 100%; text-align: left;">
            <span class="badge">PORTAL UNAVAILABLE</span>
            <h1 style="margin-top: 12px; margin-bottom: 10px; font-size: 2rem;">${title}</h1>
            <p style="margin-bottom: 24px;">${message}</p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="${PRIMARY_ORIGIN}/" class="btn">Go to ionXtech.in</a>
                <a href="${PRIMARY_ORIGIN}/contact.html" class="btn btn-secondary">Contact Support</a>
            </div>
        </div>
    </main>
</body>
</html>`;

    return new Response(html, {
        status: status,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow"
        }
    });
}

/**
 * Rewrites `<link rel="canonical">` and `<meta property="og:url">` inside the HTML response
 * so that a portal served on `https://domains.ionxtech.in/` declares its own canonical URL
 * instead of `https://ionxtech.in/domains.html`.
 */
class CanonicalMetaRewriter {
    constructor(canonicalUrl) {
        this.canonicalUrl = canonicalUrl;
    }
    element(element) {
        const tagName = element.tagName.toLowerCase();
        if (tagName === "link" && element.getAttribute("rel") === "canonical") {
            element.setAttribute("href", this.canonicalUrl);
        } else if (tagName === "meta" && element.getAttribute("property") === "og:url") {
            element.setAttribute("content", this.canonicalUrl);
        }
    }
}

export async function onRequest(context) {
    const { request, next, env } = context;
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
    const pathname = sanitizePathname(url.pathname);

    // 1. Always allow static assets to load directly without rewriting
    if (isStaticAssetPath(pathname)) {
        return next();
    }

    // 2. Look up hostname in centralized portal configuration
    const route = resolvePortalRoute(hostname);

    // 3. Main website hostnames (ionxtech.in, www.ionxtech.in) or Pages preview / localhost
    if ((route && route.isMainSite) || isPreviewOrLocalHost(hostname)) {
        // Support clean /domains URL on main site or preview alongside /domains.html
        if (pathname === "/domains" || pathname === "/domains/") {
            const domainsUrl = new URL(request.url);
            domainsUrl.pathname = "/domains.html";
            const rewrittenMainReq = new Request(domainsUrl.toString(), request);
            return env && env.ASSETS
                ? env.ASSETS.fetch(rewrittenMainReq)
                : next(rewrittenMainReq);
        }
        return next();
    }

    // 4. Unknown subdomain under *.ionxtech.in or unmapped custom host
    if (!route) {
        if (hostname.endsWith("." + PRIMARY_DOMAIN)) {
            return buildPortalUnavailableResponse(
                "Portal Not Found",
                "The requested ionXtech subdomain does not exist or is not currently active. Return to the main ionXtech website below.",
                404
            );
        }
        return next();
    }

    // 5. Registered portal that is disabled (enabled: false)
    if (!route.enabled) {
        return buildPortalUnavailableResponse(
            `${route.name} is Coming Soon`,
            `The ${route.division || route.name} portal (${route.hostname}) is registered in our architecture and will be activated upon launch. Visit ionXtech.in for updates.`,
            404
        );
    }

    // 6. Enabled Subdomain Portal (e.g., domains.ionxtech.in -> /domains.html)
    // Prevent rewrite loops if the internal path already starts with the target route prefix
    const basePortalPrefix = route.path.replace(/\/$/, ""); // e.g. "/domains"
    const rewriteTarget = route.rewritePath || route.path; // e.g. "/domains.html"

    let targetPathname;
    if (pathname === "/" || pathname === "/index.html") {
        targetPathname = rewriteTarget;
    } else if (
        pathname === basePortalPrefix ||
        pathname === basePortalPrefix + "/" ||
        pathname === rewriteTarget
    ) {
        targetPathname = rewriteTarget;
    } else if (pathname.startsWith(basePortalPrefix + "/")) {
        // Already prefixed (e.g. /domains/subpage)
        targetPathname = pathname;
    } else {
        // Check if this is a shared root page link clicked from header/footer (e.g. /contact.html, /about.html, /apps/)
        // If not a nested portal asset, map under the portal prefix first, with fallback to root shared pages.
        targetPathname = basePortalPrefix + pathname;
    }

    const rewrittenUrl = new URL(request.url);
    rewrittenUrl.pathname = targetPathname;
    // Query parameters (rewrittenUrl.search) are automatically preserved on URL clone.

    const rewrittenRequest = new Request(rewrittenUrl.toString(), request);

    let response = env && env.ASSETS
        ? await env.ASSETS.fetch(rewrittenRequest)
        : await next(rewrittenRequest);

    // If a sub-route on the portal subdomain (e.g., domains.ionxtech.in/contact.html) 404s under /domains/contact.html,
    // gracefully fall back to the shared root page (/contact.html) or custom 404 page.
    if (response.status === 404 && pathname !== "/" && pathname !== "/index.html") {
        const rootFallbackResponse = await next();
        if (rootFallbackResponse.status !== 404) {
            response = rootFallbackResponse;
        }
    }

    // 7. Rewrite canonical URL and og:url in HTML responses so the portal uses its own subdomain canonical URL
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("text/html") && typeof HTMLRewriter !== "undefined") {
        const canonicalPath = (pathname === "/" || pathname === "/index.html") ? "/" : pathname;
        const canonicalUrl = `https://${route.hostname}${canonicalPath}`;
        return new HTMLRewriter()
            .on('link[rel="canonical"], meta[property="og:url"]', new CanonicalMetaRewriter(canonicalUrl))
            .transform(response);
    }

    return response;
}
