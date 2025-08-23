const path = require("path");
const { loadConfig, run, topoOrder } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

// Iterate repos in topological order if dependencies exist
for (const repo of topoOrder(
  Object.entries(cfg.repositories).map(([repoKey, repo]) => ({
    ...repo,
    name: repo.name || repoKey
  }))
)) {
  const repoPath = path.resolve(root, repo.path);
  console.log(`\n🔄 Syncing ${repo.name}...\n`);

  try {
    run("git fetch --all", repoPath);
    run("git pull", repoPath);
  } catch {
    console.log(`⚠️  Failed to sync ${repo.name}`);
  }
}

console.log("\n✨ sync-all complete\n");
