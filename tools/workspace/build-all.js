#!/usr/bin/env node

/**
 * 🔨 Build All AETHER Repositories
 * Builds all repositories in the correct dependency order
 */

const AetherWorkspace = require('./AetherWorkspace');

async function buildAll() {
  const workspace = new AetherWorkspace();
  
  console.log('🔨 Building AETHER Workspace');
  console.log('============================');
  console.log(`Build order: ${workspace.config.buildOrder.join(' → ')}`);
  console.log('');

  for (const repoName of workspace.config.buildOrder) {
    await workspace.buildRepository(repoName);
  }

  workspace.success('All repositories built successfully!');
}

buildAll().catch(console.error);