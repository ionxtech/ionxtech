/**
 * Cloudflare Pages Middleware
 * Intercepts incoming requests at edge and enforces 301 redirects.
 */
export async function onRequest(context) {
    const url = new URL(context.request.url);

    // Redirect domains.ionxtech.in to canonical https://ionxtech.in/domains
    if (url.hostname === "domains.ionxtech.in") {
        return Response.redirect("https://ionxtech.in/domains", 301);
    }

    return context.next();
}
