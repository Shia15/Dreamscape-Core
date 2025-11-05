import { loadConfig, normalizeRepos } from "./_ws.js";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

// ESM replacement for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

for (const repo of normalizeRepos(cfg)) {
  const name = repo.name;
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
