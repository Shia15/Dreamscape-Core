/**
 * AETHER Workspace Clone-All
 * Clones all repositories listed in aether-workspace.json if missing locally.
 *
 * Usage:
 *   node tools/workspace/clone-all.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadConfig, normalizeRepos, run } from "./_ws.js";

// ESM replacements for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const cfg = loadConfig(root);

console.log("\n🌱 AETHER Workspace: Clone All");
console.log("==============================");

for (const repo of normalizeRepos(cfg)) {
  const name = repo.name;
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
