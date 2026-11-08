#!/usr/bin/env node
/**
 * IndexNow Bulk & Single URL Submission Utility for ionXtech
 * Spec: https://www.indexnow.org/documentation
 *
 * Usage:
 *   Submit all URLs from sitemap.xml:
 *     node assets/js/submit-indexnow.mjs
 *
 *   Submit specific URL(s):
 *     node assets/js/submit-indexnow.mjs https://ionxtech.in/ https://ionxtech.in/apps/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const INDEXNOW_KEY = "e4a9b2c7d8f1463095b8c2a7e1f4d609";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITEMAP_PATH = path.resolve(__dirname, "../../sitemap.xml");

function extractUrlsFromSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)];
  return matches.map((m) => m[1].trim());
}

function groupUrlsByHost(urls) {
  const groups = new Map();
  for (const rawUrl of urls) {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname;
    if (!groups.has(host)) {
      groups.set(host, []);
    }
    groups.get(host).push(parsed.toString());
  }
  return groups;
}

async function submitHostBatch(host, urlList) {
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList,
  };

  console.log(`\n[IndexNow] Submitting ${urlList.length} URL(s) for host "${host}"...`);
  console.log(`[IndexNow] Key Location: ${keyLocation}`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await response.text().catch(() => "");
  if (response.status === 200 || response.status === 202) {
    console.log(
      `[IndexNow] SUCCESS (${response.status} ${response.statusText}) — ${urlList.length} URL(s) accepted for ${host}.`
    );
  } else {
    console.error(
      `[IndexNow] FAILED (${response.status} ${response.statusText}) for ${host}: ${bodyText}`
    );
    process.exitCode = 1;
  }
}

async function main() {
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));
  const urls = cliUrls.length > 0 ? cliUrls : extractUrlsFromSitemap(SITEMAP_PATH);

  if (urls.length === 0) {
    console.error("[IndexNow] No URLs found to submit.");
    process.exit(1);
  }

  const hostGroups = groupUrlsByHost(urls);
  for (const [host, urlList] of hostGroups.entries()) {
    await submitHostBatch(host, urlList);
  }
}

main().catch((err) => {
  console.error("[IndexNow] Unexpected error:", err);
  process.exit(1);
});
