
import fs from "fs";
import path from "path";
import { loadConfig, normalizeRepos, run, topoOrder } from "./_ws.js";

const root = process.cwd();
const cfg = loadConfig(root);

for (const repo of topoOrder(normalizeRepos(cfg))) {
  const repoPath = path.resolve(root, repo.path);
  const pkg = path.join(repoPath, "package.json");

  if (!fs.existsSync(repoPath)) {
    console.log(`⏭️  Skipping ${repo.name} — directory not found (${repoPath})`);
    continue;
  }

  if (fs.existsSync(pkg)) {
    console.log(`🏗️  Build ${repo.name}`);
    run("npm run build || echo no-build", repoPath);
  } else {
    console.log(`ℹ️  Skipping ${repo.name} — no package.json`);
  }
}
console.log("✨ build-all complete");
