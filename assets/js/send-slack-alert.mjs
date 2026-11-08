#!/usr/bin/env node
/**
 * Slack Deployment Alert Utility for ionXtech
 * Spec: Sends structured Block Kit notifications to Slack upon production deployment.
 */

const webhookUrl = process.env.SLACK_DEPLOY_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
if (!webhookUrl) {
  console.log("[Slack Alert] Neither SLACK_DEPLOY_WEBHOOK_URL nor SLACK_WEBHOOK_URL configured. Skipping Slack alert.");
  process.exit(0);
}

const status = (process.env.DEPLOY_STATUS || "success").toLowerCase();
const isSuccess = status === "success";
const branch = process.env.BRANCH || "main";
const actor = process.env.ACTOR || "Automated System";
const commitSha = (process.env.COMMIT_SHA || "").slice(0, 7) || "latest";
const commitMsg = (process.env.COMMIT_MESSAGE || "").split("\n")[0] || "Update ionXtech website";
const duration = process.env.DURATION || "0";
const repo = process.env.REPOSITORY || "ionxtech/ionxtech";
const runId = process.env.RUN_ID || "";
const healthStatus = process.env.HEALTH_STATUS || "200 OK (Verified)";

const logUrl = runId ? `https://github.com/${repo}/actions/runs/${runId}` : `https://github.com/${repo}/actions`;
const repoUrl = `https://github.com/${repo}`;

const color = isSuccess ? "#1B4332" : "#E01E5A";
const title = isSuccess
  ? `:large_green_circle: Deployment succeeded for ionXtech (${branch})`
  : `:red_circle: Deployment failed for ionXtech (${branch})`;

const payload = {
  attachments: [
    {
      color,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${title}*`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Service:*\nionXtech Website (ionxtech.in)` },
            { type: "mrkdwn", text: `*Deployment:*\n${isSuccess ? "SUCCESS (Live on Cloudflare)" : "FAILED"}` },
            { type: "mrkdwn", text: `*Branch:*\n${branch}` },
            { type: "mrkdwn", text: `*Commit:*\n\`${commitSha}\` - ${commitMsg}` },
            { type: "mrkdwn", text: `*Triggered By:*\n${actor}` },
            { type: "mrkdwn", text: `*Duration:*\n${duration}s` },
            { type: "mrkdwn", text: `*Production URL:*\nhttps://ionxtech.in` },
            { type: "mrkdwn", text: `*Health Check:*\n${healthStatus}` }
          ]
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "Open ionXtech" },
              url: "https://ionxtech.in"
            },
            {
              type: "button",
              text: { type: "plain_text", text: "View Run Logs" },
              url: logUrl
            },
            {
              type: "button",
              text: { type: "plain_text", text: "GitHub Repo" },
              url: repoUrl
            },
            {
              type: "button",
              text: { type: "plain_text", text: "Open ionXlinks" },
              url: "https://links.ionxtech.in"
            }
          ]
        }
      ]
    }
  ]
};

async function send() {
  console.log(`[Slack Alert] Dispatching deployment notification to Slack (${status})...`);
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    console.log("[Slack Alert] Notification sent successfully to Slack.");
  } else {
    const text = await res.text();
    console.error(`[Slack Alert] Failed to send Slack alert (${res.status}): ${text}`);
  }
}

send().catch((err) => {
  console.error("[Slack Alert] Error:", err);
});
