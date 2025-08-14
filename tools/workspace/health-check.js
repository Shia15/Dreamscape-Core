// Minimal placeholder health check
const { loadConfig } = require("./_ws");
const path = require("path");
const fs = require("fs");

const root = process.cwd();
const cfg = loadConfig(root);
let ok = true;

for (const [repoKey, r] of Object.entries(cfg.repositories)) {
  const name = r.name || repoKey;
  const repoPath = path.resolve(root, r.path);
  const hasGit = fs.existsSync(path.join(repoPath, ".git"));
  if (!hasGit) {
    ok = false;
    console.log(`❗ ${name}: not cloned (${repoPath})`);
  } else {
    console.log(`✅ ${name}: present`);
  }
}

if (!ok) {
  console.log("\n⚠️  Health check warnings found. Run:");
  console.log("   npm run workspace:clone-all");
  process.exitCode = 1;
} else {
  console.log("\n🌈 Workspace looks healthy.");
}
