#!/usr/bin/env node

/**
 * 📦 Install Dependencies for All AETHER Repositories
 * Installs npm dependencies for all repositories in the workspace
 */

const AetherWorkspace = require('./AetherWorkspace');

async function installAll() {
  const workspace = new AetherWorkspace();
  
  console.log('📦 Installing Dependencies for AETHER Workspace');
  console.log('===============================================');
  console.log('');

  for (const repoName of Object.keys(workspace.config.repositories)) {
    await workspace.installDependencies(repoName);
  }

  workspace.success('Dependencies installed for all repositories!');
}

installAll().catch(console.error);