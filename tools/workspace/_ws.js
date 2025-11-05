/**
 * AETHER Workspace Core Utilities
 * Provides shared functions for reading config, running commands, and ordering repos.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

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
 * Normalises the repository definitions in the workspace config.
 * Supports both the legacy `repositories` object map and the newer `repos` array format.
 *
 * @param {Object} cfg - Raw workspace configuration.
 * @returns {Array<{name: string, path: string, [key: string]: any}>} Normalised repo entries.
 */
function normalizeRepos(cfg) {
  if (!cfg || typeof cfg !== "object") {
    return [];
  }

  if (Array.isArray(cfg.repos)) {
    return cfg.repos.map((repo, index) => ({
      ...repo,
      name: repo?.name || repo?.id || repo?.path || `repo${index + 1}`
    }));
  }

  if (cfg.repositories && typeof cfg.repositories === "object") {
    return Object.entries(cfg.repositories).map(([key, repo]) => ({
      ...repo,
      name: repo?.name || key
    }));
  }

  return [];
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

export { loadConfig, normalizeRepos, run, topoOrder };
