/**
 * AETHER Workspace Core Utilities
 * Provides shared functions for reading config, running commands, and ordering repos.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Loads the workspace configuration file.
 * @param {string} root - The root directory of the workspace.
 * @returns {Object} The parsed configuration object.
 * @throws Will throw an error if the config file does not exist or is invalid JSON.
 */
function loadConfig(root) {
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

/**
 * Runs a shell command synchronously in a given directory.
 * @param {string} cmd - The command to run.
 * @param {string} cwd - The working directory.
 * @param {boolean} [silent=false] - If true, suppresses stdout/stderr output.
 */
function run(cmd, cwd, silent = false) {
  try {
    execSync(cmd, { stdio: silent ? "pipe" : "inherit", cwd });
  } catch (error) {
    console.error(`⚠️ Command failed: ${cmd}`);
    throw error;
  }
}

/**
 * Returns repositories in topological order based on dependencies.
 * @param {Array<{name: string, dependsOn?: string[]}>} repos - List of repo objects.
 * @returns {Array} Ordered list of repos.
 */
function topoOrder(repos) {
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

module.exports = {
  loadConfig,
  run,
  topoOrder,
};
