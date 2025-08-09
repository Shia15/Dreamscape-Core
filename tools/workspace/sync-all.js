#!/usr/bin/env node

/**
 * 🔄 Sync All AETHER Repositories
 * Pulls latest changes from origin for all repositories
 */

const AetherWorkspace = require('./AetherWorkspace');

async function syncAll() {
  const workspace = new AetherWorkspace();
  
  console.log('🔄 Syncing AETHER Workspace');
  console.log('===========================');
  console.log('');

  for (const repoName of Object.keys(workspace.config.repositories)) {
    await workspace.syncRepository(repoName);
  }

  workspace.success('All repositories synced!');
  console.log('');
  console.log('Tip: Run "npm run workspace:status-all" to see the current state.');
}

syncAll().catch(console.error);