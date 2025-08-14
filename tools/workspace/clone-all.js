const fs = require("fs");
const path = require("path");
const { loadConfig, run } = require("./_ws");

const root = process.cwd();
const cfg = loadConfig(root);

for (const r of Object.values(cfg.repositories)) {
  const p = path.resolve(root, r.path);
  if (!fs.existsSync(p)) {
    console.log(`🌱 Cloning ${r.name} → ${p}`);
    run(`git clone ${r.url} "${p}"`, root);
  } else {
    console.log(`✅ Exists: ${r.name} at ${p}`);
  }
}
console.log("✨ clone-all complete");
