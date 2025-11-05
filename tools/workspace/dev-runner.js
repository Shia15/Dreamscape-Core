/**
 * AETHER Workspace Dev Runner
 * Starts all repos that define `npm run dev` in parallel.
 *
 * Reads: workspace/config/aether-workspace.json
 * For each repo:
 *   - Detects package.json
 *   - Checks for "dev" script
 *   - Runs `npm run dev` in parallel via `npx concurrently`
 *
 * Usage:
 *   node tools/workspace/dev-runner.js
 *   (or via npm script: "workspace:dev": "node tools/workspace/dev-runner.js")
 */

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { loadConfig, normalizeRepos } from "./_ws.js";

// ESM replacements for __dirname/__filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const cfgPath = path.join(root, "workspace", "config", "aether-workspace.json");

if (!fs.existsSync(cfgPath)) {
  console.error(`❌ Workspace config not found: ${cfgPath}`);
  process.exit(1);
}

const cfg = loadConfig(root);
const commands = [];

for (const repo of normalizeRepos(cfg)) {
  const name = repo.name;
  const repoPath = path.resolve(root, repo.path);
  const pkgPath = path.join(repoPath, "package.json");

  if (!fs.existsSync(repoPath)) {
    console.log(`⏭️  Skip ${name} (directory not found)`);
    continue;
  }

  if (!fs.existsSync(pkgPath)) {
    console.log(`⏭️  Skip ${name} (no package.json)`);
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.scripts?.dev) {
    console.log(`✅ ${name}: will run "npm run dev"`);
    commands.push(`cd "${repoPath}" && npm run dev`);
  } else {
    console.log(`⏭️  Skip ${name} (no dev script)`);
  }
}

if (commands.length === 0) {
  console.log("⚠️  No repos found with a dev script. Exiting.");
  process.exit(0);
}

const cmd = `npx concurrently --kill-others --names "${commands
  .map((_, i) => `repo${i + 1}`)
  .join(",")}" "${commands.join('" "')}"`;

console.log("\n🚀 Launching dev servers in parallel...\n");
const res = spawnSync(cmd, {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    AETHER_SKIP_TOKEN_SYNC: process.env.AETHER_SKIP_TOKEN_SYNC || ""
  }
});

process.exit(res.status ?? 0);
