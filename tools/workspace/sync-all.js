import fs from "fs";
import path from "path";
import { loadConfig, normalizeRepos, run, topoOrder } from "./_ws.js";

const root = process.cwd();
const cfg = loadConfig(root);

for (const repo of topoOrder(normalizeRepos(cfg))) {
  const repoPath = path.resolve(root, repo.path);
  const gitDir = path.join(repoPath, ".git");

  if (!fs.existsSync(gitDir)) {
    console.log(`\n⏭️  Skipping ${repo.name} — repository not cloned at ${repoPath}`);
    continue;
  }

  console.log(`\n🔄 Syncing ${repo.name}...\n`);

  try {
    run("git fetch --all", repoPath);
    run("git pull", repoPath);
  } catch {
    console.log(`⚠️  Failed to sync ${repo.name}`);
  }
}

console.log("\n✨ sync-all complete\n");
