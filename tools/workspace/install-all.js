const fs = require("fs");
const path = require("path");
const { loadConfig, run, topoOrder } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of topoOrder(cfg.repos)) {
  const repoPath = path.resolve(root, r.path);
  const pkg = path.join(repoPath, "package.json");
  if (fs.existsSync(pkg)) {
    console.log(`📦 Install deps for ${r.name}`);
    run("npm ci || npm install", repoPath);
  } else {
    console.log(`⏭️  Skip ${r.name} (no package.json)`);
  }
}
console.log("✨ install-all complete");
