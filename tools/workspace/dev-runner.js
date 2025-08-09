#!/usr/bin/env node

/**
 * 🚀 AETHER Development Server Runner
 * Starts development servers for all repositories with dev ports
 */

const AetherWorkspace = require('./AetherWorkspace');
const { spawn } = require('child_process');

async function startDevServers() {
  const workspace = new AetherWorkspace();
  
  console.log('🚀 Starting AETHER Development Environment');
  console.log('==========================================');
  console.log('');

  const devRepos = Object.entries(workspace.config.repositories)
    .filter(([name, repo]) => repo.devPort)
    .sort(([, a], [, b]) => a.devPort - b.devPort);

  if (devRepos.length === 0) {
    workspace.log('No repositories with dev servers configured.', '⚠️');
    return;
  }

  const processes = [];

  for (const [repoName, repo] of devRepos) {
    if (!workspace.repositoryExists(repoName)) {
      workspace.error(`Repository ${repoName} not found, skipping...`);
      continue;
    }

    const repoPath = workspace.getRepositoryPath(repoName);
    workspace.log(`Starting dev server for ${repoName} on port ${repo.devPort}...`, '🚀');

    const child = spawn('npm', ['run', 'dev'], {
      cwd: repoPath,
      stdio: 'inherit',
      detached: false
    });

    processes.push({ name: repoName, port: repo.devPort, process: child });

    // Small delay between starting servers
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('');
  workspace.success('Development servers started!');
  console.log('');
  console.log('Development URLs:');
  processes.forEach(proc => {
    console.log(`  ${proc.name}: http://localhost:${proc.port}`);
  });
  console.log('');
  console.log('Press Ctrl+C to stop all development servers.');

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('');
    workspace.log('Shutting down development servers...', '🛑');
    
    processes.forEach(proc => {
      try {
        proc.process.kill('SIGTERM');
      } catch (error) {
        // Process might already be dead
      }
    });
    
    process.exit(0);
  });

  // Keep the process alive
  process.on('exit', () => {
    processes.forEach(proc => {
      try {
        proc.process.kill('SIGTERM');
      } catch (error) {
        // Process might already be dead
      }
    });
  });
}

startDevServers().catch(console.error);