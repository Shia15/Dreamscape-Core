# MARI-Core - GitHub Copilot Instructions

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

MARI-Core is the cognitive-emotional engine behind the AETHER system - a TypeScript/Node.js project that implements symbolic reasoning, emotional processing, and agent-based interactions.

## Working Effectively

### Setup and Dependencies
- Install dependencies: `npm ci` - takes 2 seconds. NEVER CANCEL.
- The project uses Node.js 18.x, 20.x, or 22.x (all supported in CI)
- Dependencies are minimal: @types/node and typescript

### Building the Project
- **CRITICAL**: The actual build command is `npx tsc`, NOT `npm run build`
- `npm run build` - just echoes success message (placeholder)
- `npx tsc` - compiles TypeScript to `/dist` folder - takes 2 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Check compilation: `npx tsc --noEmit` - validates TypeScript without output
- Output location: `/dist` folder contains compiled JavaScript

### Testing
- `npm test` - runs instantly (0.1 seconds) but is just an echo command placeholder
- Real validation: `npx tsc --noEmit` - checks TypeScript compilation
- Manual testing: Run the application scenarios below

### Running the Application
- **ALWAYS build first**: `npx tsc`
- Interactive CLI: `node dist/main.js` - provides conversational interface
- Flow simulation: `node dist/test/flowSim.js` - tests symbolic emotional processing
- Application starts instantly and processes symbolic emotional states

### Multi-Repository Workspace
- Workspace health: `npm run workspace:health` - checks entire AETHER ecosystem status
- Setup workspace: `npm run aether:setup` - clones and installs all related repos (aether-core, aether-frontend)
- Build all: `npm run aether:build` - builds all repos in dependency order
- Test all: `npm run aether:test` - runs tests across all repos

## Validation

### CRITICAL Validation Scenarios
After making changes, ALWAYS run these validation steps:

1. **TypeScript Compilation**: `npx tsc --noEmit` - must pass without errors
2. **Build Test**: `npx tsc` - must create `/dist` folder successfully
3. **CLI Interaction Test**: 
   ```bash
   echo "Hello AETHER" | node dist/main.js
   ```
   Expected output includes: mood routing, agent processing, memory recall

4. **Flow Simulation Test**:
   ```bash
   node dist/test/flowSim.js
   ```
   Expected output: mood evaluation, intent routing, agent responses

5. **Workspace Status**: `npm run workspace:health` - should show mari-core status

### Complete Validation Workflow
Run this complete sequence to validate all functionality:
```bash
# Clean build validation
rm -rf dist/
npx tsc --noEmit
npx tsc
ls dist/

# Application functionality tests
echo "Hello AETHER" | node dist/main.js
echo "I'm feeling creative and curious" | node dist/main.js
node dist/test/flowSim.js

# Workspace validation
npm run workspace:health
```

### Manual Validation Requirements
- Test the interactive CLI with various emotional inputs
- Verify mood routing works correctly (curiosity, awe, resonance, etc.)
- Check memory system stores and recalls inputs
- Ensure symbolic emotional processing produces coherent responses
- Confirm TypeScript compilation creates proper `/dist` structure

## Build Times and Timeouts

- **NEVER CANCEL** any build or test commands
- TypeScript compilation: ~2 seconds (set timeout to 30+ seconds for safety)
- Dependency installation: ~1 second (set timeout to 60+ seconds for safety)  
- Application startup: Instant
- Tests: 0.1 seconds (but are placeholder commands)
- Workspace health check: ~5 seconds (set timeout to 120+ seconds)

## Common Tasks

### Repository Structure
```
mari-core/
├── src/                    # TypeScript source
│   ├── agents/            # Agent scripts (Mnēsis, Aletheia, etc.)
│   ├── memory/            # Memory recall modules  
│   ├── emotion/           # Mood state logic and weighting
│   ├── controller/        # System flow orchestration
│   ├── main.ts           # CLI entry point
│   └── test/             # Flow simulations
├── dist/                  # Compiled JavaScript (created by tsc)
├── docs/                  # Architecture documentation
├── tools/workspace/       # Multi-repo management tools
├── package.json           # Contains workspace commands
└── tsconfig.json          # TypeScript configuration
```

### Key Technologies
- TypeScript 5.9.2+ 
- Node.js (18.x, 20.x, 22.x supported)
- Symbolic emotional processing
- Agent-based architecture
- Multi-repository workspace system

### Available npm Scripts
- `npm ci` - Install dependencies (2s)
- `npm run build` - Echo placeholder (instant)
- `npm test` - Echo placeholder (instant)  
- `npm run workspace:health` - Check workspace status
- `npm run aether:setup` - Setup full AETHER workspace
- `npm run aether:build` - Build all workspace projects
- `npm run aether:test` - Test all workspace projects

### Frequently Accessed Files
- `src/main.ts` - Main application entry point
- `src/emotion/moodTypes.ts` - Mood type definitions
- `src/controller/controller.ts` - System flow logic
- `docs/index.md` - Documentation hub
- `aether-workspace.json` - Multi-repo configuration
- `.github/workflows/node.js.yml` - CI pipeline

### CI/CD Pipeline
The GitHub Actions workflow:
- Tests on Node.js 18.x, 20.x, 22.x
- Runs `npm ci` to install dependencies
- Runs `npm run build` (echo command)
- No actual test execution (placeholder commands)

## Troubleshooting

### Common Issues
- **TypeScript errors**: Check encoding in source files (use proper quotes, not smart quotes)
- **Build not working**: Use `npx tsc` instead of `npm run build`
- **Missing dist folder**: Run `npx tsc` to compile
- **Workspace repos missing**: Run `npm run aether:setup` to clone related repos

### Debug Commands
- Check TypeScript: `npx tsc --noEmit`
- Verify files: `ls -la dist/` after building
- Test application: `echo "test input" | node dist/main.js`
- Check workspace: `npm run workspace:health`
- Environment check: `node --version && npm --version`

## Development Patterns

### Making Changes
1. Edit TypeScript files in `/src`
2. Run `npx tsc --noEmit` to check compilation
3. Run `npx tsc` to build
4. Test with CLI: `echo "test" | node dist/main.js`
5. Run flow simulation: `node dist/test/flowSim.js`
6. Verify workspace health: `npm run workspace:health`

### Code Style
- Follow existing symbolic naming patterns
- Use emotional/cognitive terminology in comments
- Maintain TypeScript strict mode compliance
- Include proper mood type definitions

### Agent Development
- Agents are in `/src/agents` directory
- Follow mood-based routing patterns  
- Use symbolic emotional logic flows
- Integrate with memory and emotion systems

This project focuses on symbolic AI, emotional processing, and multi-repository orchestration. Always validate functionality through the CLI interactions and flow simulations to ensure the cognitive-emotional engine works correctly.