#!/usr/bin/env node

/**
 * 📥 Clone All AETHER Repositories
 * Clones all repositories defined in the workspace configuration
 */

const AetherWorkspace = require('./AetherWorkspace');

async function cloneAll() {
  const workspace = new AetherWorkspace();
  
  console.log('🌐 AETHER Multi-Repository Setup');
  console.log('================================');
  console.log(`Workspace: ${workspace.config.name}`);
  console.log(`Repositories: ${Object.keys(workspace.config.repositories).join(', ')}`);
  console.log('');

  for (const repoName of Object.keys(workspace.config.repositories)) {
    if (workspace.repositoryExists(repoName)) {
      workspace.log(`Repository ${repoName} already exists, skipping...`, '⚠️');
      continue;
    }
    
    await workspace.cloneRepository(repoName);
  }

  workspace.success('All repositories cloned!');
  console.log('');
  console.log('Next steps:');
  console.log('  npm run workspace:install-all  # Install dependencies');
  console.log('  npm run workspace:build-all    # Build all projects');
  console.log('  npm run workspace:status-all   # Check status');
}

cloneAll().catch(console.error);