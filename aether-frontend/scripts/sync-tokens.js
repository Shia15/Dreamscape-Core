#!/usr/bin/env node
/**
 * Sync Figma Tokens → Tailwind theme.extend
 * ----------------------------------------
 * Requires env vars:
 *   FIGMA_PAT   – personal access token
 *   FIGMA_FILE  – file ID or URL
 *   FIGMA_NODE  – (optional) node ID containing token JSON
 */
import fetch from 'node-fetch';
import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const PAT  = process.env.FIGMA_PAT;
const FILE = process.env.FIGMA_FILE?.replace(/^.*file\//,'').split('/')[0];
if (!PAT || !FILE) {
  console.error('FIGMA_PAT and FIGMA_FILE env vars required'); process.exit(1);
}

// 1. download file JSON
const res = await fetch(`https://api.figma.com/v1/files/${FILE}`, {
  headers: { 'X-Figma-Token': PAT }
});
if (!res.ok) throw new Error(await res.text());
const fileJson = await res.json();

// 2. locate tokens (assumes a top-level frame named “tokens”)
const tokensNode = Object.values(fileJson.document.children)
  .flat()
  .find(n => n.name?.toLowerCase() === 'tokens');
if (!tokensNode) throw new Error('No “tokens” frame found');

const tokenJson = JSON.parse(tokensNode.characters);

// 3. build Tailwind extend block
const tw = { colors:{}, spacing:{}, fontSize:{}, borderRadius:{}, boxShadow:{} };

Object.entries(tokenJson).forEach(([key, value]) => {
  if (key.startsWith('color.'))     tw.colors[key.split('.')[1]] = value;
  if (key.startsWith('spacing.'))   tw.spacing[key.split('.')[1]] = value;
  if (key.startsWith('fontSize.'))  tw.fontSize[key.split('.')[1]] = value;
  if (key.startsWith('radius.'))    tw.borderRadius[key.split('.')[1]] = value;
  if (key.startsWith('shadow.'))    tw.boxShadow[key.split('.')[1]] = value;
});

// 4. read existing config & replace "extend" block
const cfgPath = path.resolve(fileURLToPath(import.meta.url), '../../tailwind.config.cjs');
let cfg = await readFile(cfgPath, 'utf8');
cfg = cfg.replace(/extend:\s*{[\s\S]*?},?\s*\/\/ END TOKENS/m,
                  `extend: ${JSON.stringify(tw, null, 2)}, // END TOKENS`);

await writeFile(cfgPath, cfg);
console.log('✨ Tailwind tokens updated!');
// END TOKENS
// This script syncs Figma tokens to Tailwind CSS configuration.
// It fetches the tokens from a Figma file and updates the Tailwind config with them.
// Make sure to set the FIGMA_PAT and FIGMA_FILE environment variables before running.
// The tokens should be structured in a top-level frame named "tokens" in the Figma file.
// The script supports colors, spacing, font sizes, border radii, and box shadows.  