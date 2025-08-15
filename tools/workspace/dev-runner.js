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

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const cfgPath = path.join(root, "workspace", "config", "aether-workspace.json");

if (!fs.existsSync(cfgPath)) {
  console.error(`❌ Workspace config not found: ${cfgPath}`);
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const commands = [];

for (const [repoKey, repo] of Object.entries(cfg.repositories)) {
  const name = repo.name || repoKey;
  const repoPath = path.resolve(root, repo.path);
  const pkgPath = path.join(repoPath, "package.json");

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
