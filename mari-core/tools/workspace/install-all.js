// _ws.mjs
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function loadConfig(root) {
  const configPath = path.join(root, "workspace", "config", "aether-workspace.json");

  if (!fs.existsSync(configPath)) {
    throw new Error(`Workspace config not found: ${configPath}`);
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (err) {
    throw new Error(`Failed to parse workspace config: ${err.message}`);
  }
}

export function run(cmd, cwd, silent = false) {
  try {
    execSync(cmd, { stdio: silent ? "pipe" : "inherit", cwd });
  } catch (error) {
    console.error(`⚠️ Command failed: ${cmd}`);
    throw error;
  }
}

export function topoOrder(repos) {
  const repoMap = new Map(repos.map((r) => [r.name, r]));
  const visited = new Set();
  const ordered = [];

  function visit(repo) {
    if (!repo || visited.has(repo.name)) return;
    (repo.dependsOn || []).forEach((dep) => visit(repoMap.get(dep)));
    visited.add(repo.name);
    ordered.push(repo);
  }

  repos.forEach(visit);
  return ordered;
}
