/**
 * AETHER Workspace Dev Runner
 * Starts all repos that define `npm run dev` in parallel.
 * - Reads workspace/config/workspace.json
 * - Detects each repo's package.json
 * - Spawns `npm run dev` for those that have it
 * - Uses `npx concurrently` to handle cross-platform parallelism
 *
 * Usage:
 *   node tools/workspace/dev-runner.js
 * (or via npm script: "workspace:dev": "node tools/workspace/dev-runner.js")
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const cfgPath = path.join(root, "workspace", "config", "workspace.json");

if (!fs.existsSync(cfgPath)) {
  console.error(`❌ Missing ${cfgPath}`);
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));

const commands = [];
for (const r of cfg.repos) {
  const repoPath = path.resolve(root, r.path);
  const pkgPath = path.join(repoPath, "package.json");
  if (!fs.existsSync(pkgPath)) continue;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.scripts && pkg.scripts.dev) {
    // Windows-safe: wrap command in quotes and cd then run
    commands.push(`cd "${repoPath}" && npm run dev`);
  }
}

if (commands.length === 0) {
  console.log("⚠️  No repos with a `dev` script found. Nothing to run.");
  process.exit(0);
}

// Ensure concurrently is available (local or via npx)
const cmd = `npx concurrently ${commands.map(c => `"${c}"`).join(" ")}`;
console.log("🚀 Launching dev servers in parallel...");
console.log(cmd, "\n");
const res = spawnSync(cmd, {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    // If some repos have fragile predev token scripts, allow skipping by setting this:
    // Repos can check: if (process.env.AETHER_SKIP_TOKEN_SYNC) process.exit(0);
    AETHER_SKIP_TOKEN_SYNC: process.env.AETHER_SKIP_TOKEN_SYNC || ""
  }
});

process.exit(res.status ?? 0);
