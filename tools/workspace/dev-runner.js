// Minimal placeholder: runs all package dev servers in parallel if they exist.
const { loadConfig, run } = require("./_ws");
const path = require("path");
const fs = require("fs");

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of cfg.repos) {
  const repoPath = path.resolve(root, r.path);
  const pkgPath = path.join(repoPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    if (pkg.scripts && pkg.scripts.dev) {
      console.log(`🚀 Starting dev for ${r.name}`);
      run("npm run dev", repoPath);
    } else {
      console.log(`⏭️  ${r.name} has no 'dev' script`);
    }
  }
}
