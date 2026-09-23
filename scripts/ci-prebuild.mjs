/**
 * Builds the OpenNext worker during `npm ci` on Cloudflare Workers Builds.
 *
 * Workers Builds runs an install and then a deploy command. Its default deploy
 * command, `npx wrangler deploy`, detects an OpenNext project and delegates to
 * `opennextjs-cloudflare deploy`, which requires `.open-next/` to already
 * exist. Nothing in that sequence builds it, so the deploy fails with
 * "Could not find compiled Open Next config" unless a build command is
 * configured in the dashboard.
 *
 * Running the build from postinstall removes that dependency: the default
 * deploy command works as-is.
 *
 * Skipped everywhere else, so local installs and other CI stay fast:
 *   - not CI                  -> skip
 *   - GitHub Actions          -> skip (that workflow only runs Playwright)
 *   - .open-next/ already there -> skip (a build command is configured)
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const onCI = process.env.CI === "true" || process.env.CI === "1";
const onGitHubActions = Boolean(process.env.GITHUB_ACTIONS);

if (!onCI || onGitHubActions) {
  process.exit(0);
}

if (existsSync(".open-next/worker.js")) {
  console.log("[ci-prebuild] .open-next already present, skipping");
  process.exit(0);
}

console.log("[ci-prebuild] building the OpenNext worker so `wrangler deploy` can find it");

try {
  execSync("npx opennextjs-cloudflare build", { stdio: "inherit" });
} catch {
  // Let the deploy step report the failure with its own diagnostics rather
  // than failing the install with a less useful error.
  console.error("[ci-prebuild] build failed; the deploy step will report why");
  process.exit(1);
}
