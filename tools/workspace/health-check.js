#!/usr/bin/env node

/**
 * 🔍 AETHER Repository Health Check
 * Comprehensive health check for the entire AETHER workspace
 */

const AetherWorkspace = require('../workspace/AetherWorkspace');
const fs = require('fs');
const path = require('path');

class HealthCheck {
  constructor() {
    this.workspace = new AetherWorkspace();
    this.issues = [];
    this.warnings = [];
  }

  log(message, type = 'info') {
    const emoji = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    console.log(`${emoji} ${message}`);
  }

  addIssue(message) {
    this.issues.push(message);
    this.log(message, 'error');
  }

  addWarning(message) {
    this.warnings.push(message);
    this.log(message, 'warning');
  }

  async checkRepositoryHealth(repoName) {
    const repo = this.workspace.config.repositories[repoName];
    
    console.log(`\n🔍 Checking ${repoName}...`);
    
    // Check if repository exists
    if (!this.workspace.repositoryExists(repoName)) {
      this.addIssue(`Repository ${repoName} is not cloned`);
      return;
    }

    const repoPath = this.workspace.getRepositoryPath(repoName);
    
    // Check package.json exists
    const packageJsonPath = path.join(repoPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      this.addWarning(`No package.json found in ${repoName}`);
    } else {
      // Check node_modules
      const nodeModulesPath = path.join(repoPath, 'node_modules');
      if (!fs.existsSync(nodeModulesPath)) {
        this.addWarning(`Dependencies not installed for ${repoName}`);
      } else {
        this.log(`Dependencies installed for ${repoName}`);
      }
    }

    // Check git status
    try {
      const status = await this.workspace.getRepositoryStatus(repoName);
      if (status.hasChanges) {
        this.addWarning(`${repoName} has uncommitted changes`);
      } else {
        this.log(`${repoName} git status is clean`);
      }
    } catch (error) {
      this.addIssue(`Failed to check git status for ${repoName}: ${error.message}`);
    }

    // Check if build works
    try {
      console.log(`  Testing build for ${repoName}...`);
      await this.workspace.buildRepository(repoName);
      this.log(`Build successful for ${repoName}`);
    } catch (error) {
      this.addIssue(`Build failed for ${repoName}`);
    }
  }

  async checkWorkspaceConfiguration() {
    console.log('🔧 Checking workspace configuration...');
    
    // Check if workspace config exists
    if (!fs.existsSync(this.workspace.configPath)) {
      this.addIssue('Workspace configuration file not found');
      return;
    }

    this.log('Workspace configuration loaded');

    // Check build order makes sense
    const buildOrder = this.workspace.config.buildOrder;
    const repoNames = Object.keys(this.workspace.config.repositories);
    
    const missingFromBuildOrder = repoNames.filter(name => !buildOrder.includes(name));
    if (missingFromBuildOrder.length > 0) {
      this.addWarning(`Repositories not in build order: ${missingFromBuildOrder.join(', ')}`);
    }

    // Check dependency relationships
    for (const [repoName, repo] of Object.entries(this.workspace.config.repositories)) {
      for (const dep of repo.dependencies || []) {
        if (!repoNames.includes(dep)) {
          this.addIssue(`${repoName} depends on unknown repository: ${dep}`);
        }
      }
    }
  }

  async runHealthCheck() {
    console.log('🏥 AETHER Workspace Health Check');
    console.log('================================');
    
    await this.checkWorkspaceConfiguration();
    
    for (const repoName of Object.keys(this.workspace.config.repositories)) {
      await this.checkRepositoryHealth(repoName);
    }

    console.log('\n📊 Health Check Summary');
    console.log('=======================');
    
    if (this.issues.length === 0 && this.warnings.length === 0) {
      this.log('🎉 Workspace is healthy! All checks passed.');
    } else {
      console.log(`\nIssues found: ${this.issues.length}`);
      console.log(`Warnings: ${this.warnings.length}`);
      
      if (this.issues.length > 0) {
        console.log('\n🚨 Critical Issues:');
        this.issues.forEach(issue => console.log(`  • ${issue}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        this.warnings.forEach(warning => console.log(`  • ${warning}`));
      }

      console.log('\n💡 Suggested Actions:');
      if (this.issues.some(i => i.includes('not cloned'))) {
        console.log('  • Run: npm run workspace:clone-all');
      }
      if (this.warnings.some(w => w.includes('Dependencies not installed'))) {
        console.log('  • Run: npm run workspace:install-all');
      }
      if (this.warnings.some(w => w.includes('uncommitted changes'))) {
        console.log('  • Review and commit changes in affected repositories');
      }
    }

    if (this.issues.length > 0) {
      process.exit(1);
    }
  }
}

const healthCheck = new HealthCheck();
healthCheck.runHealthCheck().catch(console.error);