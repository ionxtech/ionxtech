/**
 * ionXtech Cloudflare Worker for R2 Bucket Form Storage
 * Handles:
 *  1. Contact Us submissions from contact.html
 *  2. Waitlist signups from domains.html, hosting.html, and services.html
 *
 * Cloudflare Dashboard Setup:
 *  - R2 Bucket Binding Variable Name: IONX_BUCKET
 *  - Environment Variable / Secret (Optional): SLACK_WEBHOOK_URL
 */

const ALLOWED_ORIGINS = [
    "https://ionxtech.dpdns.org",
    "https://ionxtech.in",
    "https://www.ionxtech.in",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080"
];

function getCorsHeaders(request) {
    const origin = request.headers.get("Origin") || "";
    const isAllowed =
        ALLOWED_ORIGINS.includes(origin) ||
        origin.endsWith(".pages.dev") ||
        origin.endsWith("ionxtech.dpdns.org") ||
        origin.endsWith("ionxtech.com");
    const allowOrigin = isAllowed ? origin : "https://ionxtech.dpdns.org";
    return {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };
}

export default {
    async fetch(request, env, ctx) {
        const corsHeaders = getCorsHeaders(request);

        // 1. Handle CORS Preflight
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        if (request.method !== "POST") {
            return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
                status: 405,
                headers: corsHeaders
            });
        }

        try {
            const payload = await request.json();
            const timestamp = new Date().toISOString();
            const safeTime = timestamp.replace(/[:.]/g, "-");
            const type = payload.type === "waitlist" ? "waitlist" : "contact";

            const email = String(payload.email || "").trim().toLowerCase();
            if (!email || !email.includes("@")) {
                return new Response(JSON.stringify({ ok: false, error: "Valid email is required" }), {
                    status: 400,
                    headers: corsHeaders
                });
            }

            const safeEmail = email.replace(/[^a-z0-9@._-]/gi, "_");
            let objectKey = "";
            let record = {};

            if (type === "waitlist") {
                const division = String(payload.division || "general").replace(/[^a-z0-9_-]/gi, "");
                objectKey = `waitlist/${division}/${safeTime}_${safeEmail}.json`;
                record = {
                    type: "waitlist",
                    division: "ionX" + division,
                    email: email,
                    submittedAt: timestamp,
                    userAgent: request.headers.get("User-Agent") || "",
                    country: (request.cf && request.cf.country) || "Unknown"
                };
            } else {
                const name = String(payload.name || "").trim();
                const topic = String(payload.topic || "General").trim();
                const message = String(payload.message || "").trim();

                if (!name || !message) {
                    return new Response(JSON.stringify({ ok: false, error: "Name and message are required" }), {
                        status: 400,
                        headers: corsHeaders
                    });
                }

                objectKey = `contacts/${safeTime}_${safeEmail}.json`;
                record = {
                    type: "contact",
                    name: name,
                    email: email,
                    topic: topic,
                    message: message,
                    submittedAt: timestamp,
                    userAgent: request.headers.get("User-Agent") || "",
                    country: (request.cf && request.cf.country) || "Unknown"
                };
            }

            // Save JSON file to Cloudflare R2 Bucket (binding name: IONX_BUCKET)
            await env.IONX_BUCKET.put(objectKey, JSON.stringify(record, null, 2), {
                httpMetadata: { contentType: "application/json" }
            });

            // Send instant Slack notification if SLACK_WEBHOOK_URL is configured
            const slackWebhookUrl = env.SLACK_WEBHOOK_URL || "";
            if (slackWebhookUrl && slackWebhookUrl.startsWith("https://hooks.slack.com/")) {
                const slackText = type === "waitlist"
                    ? `*New Waitlist Signup — ${record.division}*\n• *Email:* ${record.email}\n• *Country:* ${record.country}\n• *Time:* ${record.submittedAt}\n• *R2 Key:* \`${objectKey}\``
                    : `*New Contact Inquiry — ionXtech*\n• *Name:* ${record.name}\n• *Email:* ${record.email}\n• *Topic:* ${record.topic}\n• *Country:* ${record.country}\n• *Time:* ${record.submittedAt}\n• *Message:*\n>${record.message.replace(/\n/g, "\n>")}\n• *R2 Key:* \`${objectKey}\``;

                ctx.waitUntil(
                    fetch(slackWebhookUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text: slackText })
                    }).catch(() => {})
                );
            }

            return new Response(JSON.stringify({ ok: true, key: objectKey }), {
                status: 200,
                headers: corsHeaders
            });
        } catch (err) {
            return new Response(JSON.stringify({ ok: false, error: "Invalid request payload" }), {
                status: 500,
                headers: corsHeaders
            });
        }
    }
};

