import { existsSync } from "fs";
import { resolve, join } from "path";
import { loadConfig, run, topoOrder } from "./_ws";

const root = process.cwd();
const cfg = loadConfig(root);

console.log("\n📦 Installing dependencies across workspace\n");

const reposInOrder = topoOrder(
  Object.entries(cfg.repositories).map(([repoKey, repo]) => ({
    ...repo,
    name: repo.name || repoKey
  }))
);

for (const r of reposInOrder) {
  const repoPath = resolve(root, r.path);
  const pkg = join(repoPath, "package.json");

  if (!existsSync(pkg)) {
    console.log(`⏭️  Skip ${r.name} (no package.json)`);
    continue;
  }

  console.log(`📦 Installing for ${r.name}...`);
  run("npm ci || npm install", repoPath);
}

console.log("\n✨ install-all complete\n");
