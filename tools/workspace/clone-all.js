/**
 * AETHER Workspace Clone-All
 * Clones all repositories listed in aether-workspace.json if missing locally.
 *
 * Usage:
 *   node tools/workspace/clone-all.js
 */

const fs = require("fs");
const path = require("path");
const { loadConfig, run } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

console.log("\n🌱 AETHER Workspace: Clone All");
console.log("==============================");

for (const [repoKey, repo] of Object.entries(cfg.repositories)) {
  const name = repo.name || repoKey;
  const repoPath = path.resolve(root, repo.path);

  if (!repo.url) {
    console.warn(`⚠️  Skipping ${name} — no "url" specified in config`);
    continue;
  }

  if (!fs.existsSync(repoPath)) {
    console.log(`🌱 Cloning ${name} → ${repoPath}`);
    run(`git clone ${repo.url} "${repoPath}"`, root);
  } else {
    console.log(`✅ Exists: ${name} at ${repoPath}`);
  }
}

console.log("\n✨ clone-all complete");
