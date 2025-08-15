const { loadConfig } = require("./_ws");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const root = process.cwd();
const cfg = loadConfig(root);
let healthy = true;

console.log("\n🩺 AETHER Workspace Health Check");
console.log("================================\n");

function hasChanges(repoPath) {
  try {
    return execSync("git status -s", { cwd: repoPath }).toString().trim().length > 0;
  } catch {
    return false;
  }
}

for (const [repoKey, repo] of Object.entries(cfg.repositories)) {
  const name = repo.name || repoKey;
  const repoPath = path.resolve(root, repo.path);
  const hasGit = fs.existsSync(path.join(repoPath, ".git"));

  if (!hasGit) {
    healthy = false;
    console.log(`❗ ${name}: not cloned (${repoPath})`);
    continue;
  }

  const dirty = hasChanges(repoPath);
  if (dirty) {
    healthy = false;
    console.log(`⚠️  ${name}: cloned but has uncommitted changes`);
  } else {
    console.log(`✅ ${name}: present and clean`);
  }
}

if (!healthy) {
  console.log("\n⚠️  Health check warnings found. You may need to run:");
  console.log("   npm run workspace:clone-all");
  console.log("   npm run workspace:status-all");
  process.exitCode = 1;
} else {
  console.log("\n🌈 Workspace looks healthy.");
}
