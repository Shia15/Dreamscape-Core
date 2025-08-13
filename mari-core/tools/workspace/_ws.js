const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function loadConfig(root) {
  const cfg = path.join(root, "workspace", "config", "workspace.json");
  if (!fs.existsSync(cfg)) {
    throw new Error(`Missing workspace config: ${cfg}`);
  }
  return JSON.parse(fs.readFileSync(cfg, "utf8"));
}

function run(cmd, cwd) {
  try {
    execSync(cmd, { stdio: "inherit", cwd });
  } catch (e) {
    console.error("⚠️  Command failed:", cmd);
    throw e;
  }
}

function topoOrder(repos) {
  const by = new Map(repos.map(r => [r.name, r]));
  const seen = new Set(), out = [];
  function visit(r) {
    if (!r || seen.has(r.name)) return;
    (r.dependsOn || []).forEach(d => visit(by.get(d)));
    seen.add(r.name);
    out.push(r);
  }
  repos.forEach(visit);
  return out;
}

module.exports = { loadConfig, run, topoOrder };
