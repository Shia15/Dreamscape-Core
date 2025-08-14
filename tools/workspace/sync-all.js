const path = require("path");
const { loadConfig, run } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const [repoKey, r] of Object.entries(cfg.repositories)) {
  const name = r.name || repoKey;
  const repoPath = path.resolve(root, r.path);
  console.log(`🔄 Sync ${name}`);
  run("git fetch --all", repoPath);
  run("git pull", repoPath);
}
console.log("✨ sync-all complete");
