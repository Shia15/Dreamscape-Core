const fs = require("fs");
const path = require("path");
const { loadConfig } = require("./_ws");
const { execSync } = require("child_process");

const root = process.cwd();
const cfg = loadConfig(root);

console.log("\n🧠 AETHER Workspace Status");
console.log("==========================");
console.log("Workspace: AETHER Ecosystem");
console.log(`Root: ${path.relative(process.cwd(), root) || "."}\n`);

console.log("Repository Status:\n");

function hasChanges(repoPath) {
  try {
    const out = execSync("git status -s", { cwd: repoPath }).toString().trim();
    return out.length > 0 ? "Yes" : "No";
  } catch {
    return "Unknown";
  }
}

function getBranch(repoPath) {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: repoPath })
      .toString()
      .trim();
  } catch {
    return "N/A";
  }
}

const col = (s, n) => (s || "").toString().padEnd(n);

console.log(`${col("Repository", 20)}| ${col("State", 12)}| ${col("Branch", 12)}| Changes`);
console.log(`${"-".repeat(20)}|${"-".repeat(13)}|${"-".repeat(13)}|--------`);

for (const [repoKey, repo] of Object.entries(cfg.repositories)) {
  const name = repo.name || repoKey;
  const repoPath = path.resolve(root, repo.path);
  const cloned = fs.existsSync(path.join(repoPath, ".git"));
  const state = cloned ? "Cloned" : "Not Cloned";
  const branch = cloned ? getBranch(repoPath) : "N/A";
  const changes = cloned ? hasChanges(repoPath) : "No";

  console.log(`${col(name, 20)}| ${col(state, 12)}| ${col(branch, 12)}| ${changes}`);
}

console.log("\n⚑ Notes:");
console.log("• Clone missing repos: npm run workspace:clone-all");
console.log("• Install deps:        npm run workspace:install-all\n");
