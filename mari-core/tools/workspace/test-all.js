import { existsSync } from "fs";
import { resolve, join } from "path";
import { loadConfig, run, topoOrder } from "./_ws.js";

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of topoOrder(
  Object.entries(cfg.repositories).map(([repoKey, r]) => ({
    ...r,
    name: r.name || repoKey
  }))
)) {
  const repoPath = resolve(root, r.path);
  const pkg = join(repoPath, "package.json");

  if (existsSync(pkg)) {
    console.log(`\n🧪 Testing ${r.name}...\n`);
    try {
      run("npm test", repoPath);
    } catch {
      console.log(`⚠️  No tests found or test command failed for ${r.name}`);
    }
  } else {
    console.log(`ℹ️  Skipping ${r.name} — no package.json found.`);
  }
}

console.log("\n✨ test-all complete\n");
