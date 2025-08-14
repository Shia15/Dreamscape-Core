# Dev Tools (AETHER Workspace)

## What you get
- `tools/workspace/dev-runner.js` — starts all repos with `npm run dev` in parallel using `concurrently`.

## Setup
1) Install dev dependency in your workspace root:
   npm install --save-dev concurrently

2) Add to `package.json` (workspace root):
   "scripts": {
     "workspace:dev": "node tools/workspace/dev-runner.js"
   }

3) Run:
   npm run workspace:dev

### Dealing with token-based predev scripts
If a repo's `predev` script fails due to missing API keys, either:
- add a guard at the top of that repo's token script:
    if (process.env.AETHER_SKIP_TOKEN_SYNC) process.exit(0);
- or temporarily comment out the `predev` line in that repo's `package.json`.
