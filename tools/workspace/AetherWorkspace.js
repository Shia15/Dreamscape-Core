#!/usr/bin/env node

/**
 * 🌐 AETHER Workspace Manager
 * Multi-repository coordination tool for the AETHER cognitive system
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

class AetherWorkspace {
  constructor() {
    this.configPath = path.join(__dirname, '../../aether-workspace.json');
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      console.error('❌ Failed to load workspace config:', error.message);
      process.exit(1);
    }
  }

  log(message, emoji = '🔷') {
    console.log(`${emoji} ${message}`);
  }

  error(message) {
    console.error(`❌ ${message}`);
  }

  success(message) {
    console.log(`✅ ${message}`);
  }

  async runCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      const child = spawn('bash', ['-c', command], { 
        cwd, 
        stdio: 'inherit',
        shell: true 
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
    });
  }

  getRepositoryPath(repoName) {
    const repo = this.config.repositories[repoName];
    if (!repo) {
      throw new Error(`Repository ${repoName} not found in workspace config`);
    }
    return path.resolve(repo.path);
  }

  repositoryExists(repoName) {
    try {
      const repoPath = this.getRepositoryPath(repoName);
      return fs.existsSync(repoPath) && fs.existsSync(path.join(repoPath, '.git'));
    } catch {
      return false;
    }
  }

  async cloneRepository(repoName) {
    const repo = this.config.repositories[repoName];
    const targetPath = path.dirname(this.getRepositoryPath(repoName));
    
    this.log(`Cloning ${repoName}...`, '📥');
    
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    try {
      await this.runCommand(`git clone ${repo.url} ${path.basename(repo.path)}`, targetPath);
      this.success(`Cloned ${repoName}`);
    } catch (error) {
      this.error(`Failed to clone ${repoName}: ${error.message}`);
    }
  }

  async installDependencies(repoName) {
    if (!this.repositoryExists(repoName)) {
      this.error(`Repository ${repoName} not found`);
      return;
    }

    const repoPath = this.getRepositoryPath(repoName);
    const packageJsonPath = path.join(repoPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      this.log(`No package.json found in ${repoName}, skipping...`, '⚠️');
      return;
    }

    this.log(`Installing dependencies for ${repoName}...`, '📦');
    
    try {
      await this.runCommand('npm ci || npm install', repoPath);
      this.success(`Dependencies installed for ${repoName}`);
    } catch (error) {
      this.error(`Failed to install dependencies for ${repoName}: ${error.message}`);
    }
  }

  async buildRepository(repoName) {
    if (!this.repositoryExists(repoName)) {
      this.error(`Repository ${repoName} not found`);
      return;
    }

    const repo = this.config.repositories[repoName];
    const repoPath = this.getRepositoryPath(repoName);

    this.log(`Building ${repoName}...`, '🔨');
    
    try {
      await this.runCommand(repo.buildCommand, repoPath);
      this.success(`Built ${repoName}`);
    } catch (error) {
      this.error(`Failed to build ${repoName}: ${error.message}`);
    }
  }

  async testRepository(repoName) {
    if (!this.repositoryExists(repoName)) {
      this.error(`Repository ${repoName} not found`);
      return;
    }

    const repo = this.config.repositories[repoName];
    const repoPath = this.getRepositoryPath(repoName);

    this.log(`Testing ${repoName}...`, '🧪');
    
    try {
      await this.runCommand(repo.testCommand, repoPath);
      this.success(`Tests passed for ${repoName}`);
    } catch (error) {
      this.error(`Tests failed for ${repoName}: ${error.message}`);
    }
  }

  async getRepositoryStatus(repoName) {
    if (!this.repositoryExists(repoName)) {
      return { exists: false, status: 'Not cloned' };
    }

    const repoPath = this.getRepositoryPath(repoName);
    
    try {
      const branch = execSync('git branch --show-current', { cwd: repoPath, encoding: 'utf8' }).trim();
      const status = execSync('git status --porcelain', { cwd: repoPath, encoding: 'utf8' }).trim();
      const hasChanges = status.length > 0;
      
      return {
        exists: true,
        branch,
        hasChanges,
        status: hasChanges ? 'Has changes' : 'Clean'
      };
    } catch (error) {
      return { exists: true, status: 'Error checking status' };
    }
  }

  async syncRepository(repoName) {
    if (!this.repositoryExists(repoName)) {
      this.error(`Repository ${repoName} not found`);
      return;
    }

    const repoPath = this.getRepositoryPath(repoName);

    this.log(`Syncing ${repoName}...`, '🔄');
    
    try {
      await this.runCommand('git fetch origin', repoPath);
      await this.runCommand('git pull origin $(git branch --show-current)', repoPath);
      this.success(`Synced ${repoName}`);
    } catch (error) {
      this.error(`Failed to sync ${repoName}: ${error.message}`);
    }
  }
}

module.exports = AetherWorkspace;