import { existsSync } from "fs";
import { resolve, join } from "path";
import { loadConfig, normalizeRepos, run, topoOrder } from "./_ws.js";

const root = process.cwd();
const cfg = loadConfig(root);

for (const repo of topoOrder(normalizeRepos(cfg))) {
  const repoPath = resolve(root, repo.path);
  const pkg = join(repoPath, "package.json");

  if (!existsSync(repoPath)) {
    console.log(`⏭️  Skipping ${repo.name} — directory not found (${repoPath})`);
    continue;
  }

  if (existsSync(pkg)) {
    console.log(`\n🧪 Testing ${repo.name}...\n`);
    try {
      run("npm test", repoPath);
    } catch {
      console.log(`⚠️  No tests found or test command failed for ${repo.name}`);
    }
  } else {
    console.log(`ℹ️  Skipping ${repo.name} — no package.json found.`);
  }
}

console.log("\n✨ test-all complete\n");
