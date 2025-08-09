#!/usr/bin/env node

/**
 * 🧪 Test All AETHER Repositories
 * Runs tests for all repositories in the workspace
 */

const AetherWorkspace = require('./AetherWorkspace');

async function testAll() {
  const workspace = new AetherWorkspace();
  
  console.log('🧪 Testing AETHER Workspace');
  console.log('===========================');
  console.log('');

  const results = [];
  
  for (const repoName of Object.keys(workspace.config.repositories)) {
    try {
      await workspace.testRepository(repoName);
      results.push({ repo: repoName, status: 'PASSED' });
    } catch (error) {
      results.push({ repo: repoName, status: 'FAILED' });
    }
  }

  console.log('');
  console.log('Test Results Summary:');
  console.log('====================');
  
  results.forEach(result => {
    const emoji = result.status === 'PASSED' ? '✅' : '❌';
    console.log(`${emoji} ${result.repo}: ${result.status}`);
  });
  
  const allPassed = results.every(r => r.status === 'PASSED');
  console.log('');
  
  if (allPassed) {
    workspace.success('All tests passed!');
  } else {
    workspace.error('Some tests failed!');
    process.exit(1);
  }
}

testAll().catch(console.error);