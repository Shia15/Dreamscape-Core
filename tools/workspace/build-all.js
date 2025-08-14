const fs = require("fs");
const path = require("path");
const { loadConfig, run, topoOrder } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of topoOrder(Object.entries(cfg.repositories).map(([repoKey, r]) => ({...r, name: r.name || repoKey})))) {
  const repoPath = path.resolve(root, r.path);
  const pkg = path.join(repoPath, "package.json");
  if (fs.existsSync(pkg)) {
    console.log(`🏗️  Build ${r.name}`);
    run("npm run build || echo no-build", repoPath);
  }
}
console.log("✨ build-all complete");
