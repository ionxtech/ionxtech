/**
 * Centralized Multi-Portal Routing Configuration for ionXtech
 *
 * Maps incoming hostnames to internal routes within the single Cloudflare Pages deployment.
 * Enable a portal by setting `enabled: true` once its target page/directory is ready.
 */

export const PRIMARY_DOMAIN = "ionxtech.in";
export const PRIMARY_ORIGIN = "https://ionxtech.in";

export const portalRoutes = {
    "ionxtech.in": {
        path: "/",
        rewritePath: "/",
        enabled: true,
        isMainSite: true,
        name: "Main Website",
        description: "Main company website"
    },
    "www.ionxtech.in": {
        path: "/",
        rewritePath: "/",
        enabled: true,
        isMainSite: true,
        name: "Main Website",
        description: "Main company website"
    },
    "domains.ionxtech.in": {
        path: "/domains",
        rewritePath: "/domains.html",
        enabled: true,
        isMainSite: false,
        name: "Domains Portal",
        division: "ionXdomains",
        description: "Domain management portal"
    },
    "hosting.ionxtech.in": {
        path: "/hosting",
        rewritePath: "/hosting.html",
        enabled: false,
        isMainSite: false,
        name: "Hosting Portal",
        division: "ionXhosting",
        description: "Hosting portal"
    },
    "services.ionxtech.in": {
        path: "/services",
        rewritePath: "/services.html",
        enabled: false,
        isMainSite: false,
        name: "Services Portal",
        division: "ionXservices",
        description: "Services portal"
    },
    "apps.ionxtech.in": {
        path: "/apps",
        rewritePath: "/apps/index.html",
        enabled: false,
        isMainSite: false,
        name: "Applications Portal",
        division: "ionXapps",
        description: "Applications directory"
    },
    "api.ionxtech.in": {
        path: "/api",
        rewritePath: "/api",
        enabled: false,
        isMainSite: false,
        name: "API Gateway",
        description: "API gateway (future integration)"
    },
    "console.ionxtech.in": {
        path: "/console",
        rewritePath: "/console",
        enabled: false,
        isMainSite: false,
        name: "Admin Console",
        description: "Admin dashboard"
    },
    "developers.ionxtech.in": {
        path: "/developers",
        rewritePath: "/developers",
        enabled: false,
        isMainSite: false,
        name: "Developer Portal",
        description: "Developer portal"
    },
    "docs.ionxtech.in": {
        path: "/docs",
        rewritePath: "/docs",
        enabled: false,
        isMainSite: false,
        name: "Documentation Portal",
        description: "Documentation portal"
    },
    "support.ionxtech.in": {
        path: "/support",
        rewritePath: "/support",
        enabled: false,
        isMainSite: false,
        name: "Support Portal",
        description: "Customer support"
    },
    "status.ionxtech.in": {
        path: "/status",
        rewritePath: "/status",
        enabled: false,
        isMainSite: false,
        name: "Service Status",
        description: "Service status page"
    }
};

/**
 * Helper to look up a hostname in the centralized route table.
 * Normalizes case and strips trailing dots.
 *
 * @param {string} hostname
 * @returns {object|null}
 */
export function resolvePortalRoute(hostname) {
    if (!hostname || typeof hostname !== "string") {
        return null;
    }
    const cleanHost = hostname.trim().toLowerCase().replace(/\.$/, "");
    if (Object.prototype.hasOwnProperty.call(portalRoutes, cleanHost)) {
        return {
            hostname: cleanHost,
            ...portalRoutes[cleanHost]
        };
    }
    return null;
}

/**
 * Checks whether a hostname is a local development or Cloudflare Pages preview host.
 *
 * @param {string} hostname
 * @returns {boolean}
 */
export function isPreviewOrLocalHost(hostname) {
    if (!hostname || typeof hostname !== "string") {
        return false;
    }
    const cleanHost = hostname.trim().toLowerCase().replace(/\.$/, "");
    return (
        cleanHost === "localhost" ||
        cleanHost === "127.0.0.1" ||
        cleanHost.endsWith(".pages.dev")
    );
}

