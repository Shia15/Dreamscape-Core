#!/usr/bin/env node

/**
 * 📊 Check Status of All AETHER Repositories
 * Shows the current status of all repositories in the workspace
 */

const AetherWorkspace = require('./AetherWorkspace');

async function statusAll() {
  const workspace = new AetherWorkspace();
  
  console.log('📊 AETHER Workspace Status');
  console.log('==========================');
  console.log(`Workspace: ${workspace.config.name}`);
  console.log(`Root: ${workspace.config.workspaceRoot}`);
  console.log('');

  const statuses = [];
  
  for (const repoName of Object.keys(workspace.config.repositories)) {
    const repo = workspace.config.repositories[repoName];
    const status = await workspace.getRepositoryStatus(repoName);
    
    statuses.push({
      name: repoName,
      type: repo.type,
      exists: status.exists,
      branch: status.branch || 'N/A',
      status: status.status,
      hasChanges: status.hasChanges
    });
  }

  // Display status table
  console.log('Repository Status:');
  console.log('┌─────────────────┬─────────────┬────────────────┬───────────────────┬─────────────┐');
  console.log('│ Repository      │ Type        │ Status         │ Branch            │ Changes     │');
  console.log('├─────────────────┼─────────────┼────────────────┼───────────────────┼─────────────┤');
  
  statuses.forEach(repo => {
    const name = repo.name.padEnd(15);
    const type = repo.type.padEnd(11);
    const status = repo.status.padEnd(14);
    const branch = (repo.branch || 'N/A').padEnd(17);
    const changes = repo.hasChanges ? 'Yes' : 'No';
    const changesStr = changes.padEnd(11);
    
    console.log(`│ ${name} │ ${type} │ ${status} │ ${branch} │ ${changesStr} │`);
  });
  
  console.log('└─────────────────┴─────────────┴────────────────┴───────────────────┴─────────────┘');
  console.log('');

  // Summary
  const totalRepos = statuses.length;
  const clonedRepos = statuses.filter(s => s.exists).length;
  const reposWithChanges = statuses.filter(s => s.hasChanges).length;
  
  console.log('Summary:');
  console.log(`  Total repositories: ${totalRepos}`);
  console.log(`  Cloned: ${clonedRepos}/${totalRepos}`);
  console.log(`  With changes: ${reposWithChanges}`);
  
  if (clonedRepos < totalRepos) {
    console.log('');
    workspace.log('Some repositories are not cloned. Run: npm run workspace:clone-all', '💡');
  }
  
  if (reposWithChanges > 0) {
    console.log('');
    workspace.log('Some repositories have uncommitted changes.', '⚠️');
  }
}

statusAll().catch(console.error);