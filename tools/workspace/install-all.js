import fs from "fs";
import path from "path";
import { loadConfig, normalizeRepos, run, topoOrder } from "./_ws.js";

const root = process.cwd();
const cfg = loadConfig(root);

for (const repo of topoOrder(normalizeRepos(cfg))) {
  const repoPath = path.resolve(root, repo.path);
  const pkgPath = path.join(repoPath, "package.json");

  if (!fs.existsSync(repoPath)) {
    console.log(`⏭️  Skipping ${repo.name} — directory not found (${repoPath})`);
    continue;
  }

  if (!fs.existsSync(pkgPath)) {
    console.log(`ℹ️  Skipping ${repo.name} — no package.json`);
    continue;
  }

  console.log(`\n📦 Installing dependencies for ${repo.name}`);
  try {
    run("npm install", repoPath);
  } catch {
    console.log(`⚠️  Installation failed for ${repo.name}`);
  }
}

console.log("\n✨ install-all complete\n");
