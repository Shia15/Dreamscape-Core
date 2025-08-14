// Minimal placeholder health check
const { loadConfig } = require("./_ws");
const path = require("path");
const fs = require("fs");

const root = process.cwd();
const cfg = loadConfig(root);
let ok = true;

for (const r of Object.values(cfg.repositories)) {
  const repoPath = path.resolve(root, r.path);
  const hasGit = fs.existsSync(path.join(repoPath, ".git"));
  if (!hasGit) {
    ok = false;
    console.log(`❗ ${r.name}: not cloned (${repoPath})`);
  } else {
    console.log(`✅ ${r.name}: present`);
  }
}

if (!ok) {
  console.log("\n⚠️  Health check warnings found. Run:");
  console.log("   npm run workspace:clone-all");
  process.exitCode = 1;
} else {
  console.log("\n🌈 Workspace looks healthy.");
}
