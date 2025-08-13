# 🌐 AETHER Multi-Repository Workspace

This directory contains tools and scripts for managing the AETHER ecosystem as a multi-repository workspace.

## 🚀 Quick Start

### 1. Setup Complete AETHER Workspace
```bash
npm run aether:setup
```
This will clone all AETHER repositories and install their dependencies.

### 2. Check Workspace Status
```bash
npm run aether:status
```
View the status of all repositories in the workspace.

### 3. Build All Projects
```bash
npm run aether:build
```
Builds all repositories in the correct dependency order.

### 4. Run All Tests
```bash
npm run aether:test
```
Runs tests across all repositories.

### 5. Start Development Environment
```bash
npm run workspace:dev
```
Starts development servers for all projects that have them configured.

## 📁 Workspace Structure

The AETHER workspace consists of these repositories:

- **mari-core** (this repo) - Cognitive-emotional engine and symbolic reasoning core
- **aether-core** - Primary orchestration and inference logic  
- **aether-frontend** - React/Tailwind interface system

## 🛠️ Available Commands

### Repository Management
- `npm run workspace:clone-all` - Clone all AETHER repositories
- `npm run workspace:install-all` - Install dependencies for all repos
- `npm run workspace:sync-all` - Pull latest changes from all repos
- `npm run workspace:status-all` - Check status of all repos

### Development
- `npm run workspace:build-all` - Build all repositories
- `npm run workspace:test-all` - Test all repositories
- `npm run workspace:dev` - Start all development servers

### Quick Actions
- `npm run aether:setup` - Complete workspace setup (clone + install)
- `npm run aether:build` - Build everything
- `npm run aether:test` - Test everything
- `npm run aether:status` - Show workspace status

## ⚙️ Configuration

The workspace is configured via `aether-workspace.json` which defines:

- Repository locations and URLs
- Build and test commands
- Development server ports
- Dependency relationships
- Build order

## 🔗 Repository Dependencies

```
mari-core (core)
    ↓
aether-core (orchestration)
    ↓
aether-frontend (interface)
```

Projects are built in dependency order to ensure proper linking.

## 🧠 Symbolic Workflow

This multi-repo setup enables:

- **Modular Development** - Each component can be developed independently
- **Coordinated Builds** - Dependencies are respected during builds
- **Unified Testing** - Run tests across the entire ecosystem
- **Synchronized Development** - Keep all repos in sync easily

## 🌟 Integration with Existing Tools

The workspace tools integrate with existing MARI-Core tooling:

- Symbolic commit scripts in `tools/push_scripts/`
- CI/CD pipelines in `.github/workflows/`
- Documentation structure in `docs/`

---

_Part of the AETHER cognitive system - where computational reasoning meets inner resonance._