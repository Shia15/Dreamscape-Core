import { existsSync } from "fs";
import { resolve, join } from "path";
import { loadConfig, run, topoOrder } from "./_ws";

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of topoOrder(Object.entries(cfg.repositories).map(([repoKey, r]) => ({...r, name: r.name || repoKey})))) {
  const repoPath = resolve(root, r.path);
  const pkg = join(repoPath, "package.json");
  if (existsSync(pkg)) {
    console.log(`📦 Install deps for ${r.name}`);
    run("npm ci || npm install", repoPath);
  } else {
    console.log(`⏭️  Skip ${r.name} (no package.json)`);
  }
}
console.log("✨ install-all complete");
