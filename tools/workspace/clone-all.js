const fs = require("fs");
const path = require("path");
const { loadConfig, run } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const [repoKey, r] of Object.entries(cfg.repositories)) {
  const name = r.name || repoKey;
  const p = path.resolve(root, r.path);
  if (!fs.existsSync(p)) {
    console.log(`🌱 Cloning ${name} → ${p}`);
    run(`git clone ${r.url} "${p}"`, root);
  } else {
    console.log(`✅ Exists: ${name} at ${p}`);
  }
}
console.log("✨ clone-all complete");
