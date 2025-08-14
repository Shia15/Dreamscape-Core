const path = require("path");
const { loadConfig, run } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of cfg.repos) {
  const repoPath = path.resolve(root, r.path);
  console.log(`🔄 Sync ${r.name}`);
  run("git fetch --all", repoPath);
  run("git pull", repoPath);
}
console.log("✨ sync-all complete");
