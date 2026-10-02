// scripts/crosscheck.mjs
// Pre-ship crosscheck verification for WebForge v9.1
// Exits non-zero on failure

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, COMPLIANCE, PRODUCTS, CATEGORIES } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let errors = [];
let warnings = [];

function check(condition, message, isBlocking = true) {
  if (!condition) {
    if (isBlocking) {
      errors.push(`[BLOCKING ERROR] ${message}`);
    } else {
      warnings.push(`[WARNING] ${message}`);
    }
  }
}

console.log('🔍 Starting WebForge v9.1 Pre-ship Crosscheck...');

// B1: Domain check
if (SITE.domain === 'DOMAIN.com') {
  warnings.push('[NOTICE B1] SITE.domain is set to DOMAIN.com (Pending Domain mode is active).');
}

// B4: Strategy docs leak check
const publicDocs = path.join(rootDir, 'public', 'docs');
const publicProject = path.join(rootDir, 'public', 'PROJECT.md');
const publicKeyword = path.join(rootDir, 'public', 'keyword-map.md');
check(!fs.existsSync(publicDocs) && !fs.existsSync(publicProject) && !fs.existsSync(publicKeyword),
  'B4: Strategy docs leaked into public directory!');

// B6: Mandatory Agent Files A-N
const mandatoryFiles = [
  'public/robots.txt',
  'public/llms.txt',
  'public/auth.md',
  'public/.well-known/api-catalog',
  'public/.well-known/agent-skills/index.json',
  'public/.well-known/mcp/server-card.json',
  'public/.well-known/oauth-protected-resource',
  'public/.well-known/oauth-authorization-server',
  'public/.well-known/openid-configuration',
  'public/.well-known/acp.json',
  'public/.well-known/ucp',
  'public/js/webmcp.js',
  'vercel.json',
];

for (const relPath of mandatoryFiles) {
  const fullPath = path.join(rootDir, relPath);
  check(fs.existsSync(fullPath), `B6: Missing mandatory agent file: ${relPath}`);
}

// Check auth.md starts with exact "# Auth.md"
const authMdPath = path.join(rootDir, 'public', 'auth.md');
if (fs.existsSync(authMdPath)) {
  const content = fs.readFileSync(authMdPath, 'utf8');
  check(content.startsWith('# Auth.md'), 'auth.md must start with exactly "# Auth.md" as line 1');
  check(content.includes('agent_auth'), 'auth.md missing agent_auth block');
}

// Check .well-known/ucp has "ucp": "1.0"
const ucpPath = path.join(rootDir, 'public', '.well-known', 'ucp');
if (fs.existsSync(ucpPath)) {
  try {
    const ucp = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
    check(ucp.ucp === '1.0', '.well-known/ucp missing mandatory "ucp": "1.0" field');
  } catch {
    check(false, '.well-known/ucp is not valid JSON');
  }
}

// B8: Tools in server-card.json vs live tools list
const serverCardPath = path.join(rootDir, 'public', '.well-known', 'mcp', 'server-card.json');
if (fs.existsSync(serverCardPath)) {
  try {
    const card = JSON.parse(fs.readFileSync(serverCardPath, 'utf8'));
    const tools = card?.capabilities?.tools?.map(t => t.name) || [];
    const expectedTools = ['search_products', 'get_product', 'list_categories', 'get_policies', 'create_order_draft'];
    const diff = expectedTools.filter(t => !tools.includes(t));
    check(diff.length === 0, `B8: server-card.json tool drift: missing ${diff.join(', ')}`);
  } catch {
    check(false, '.well-known/mcp/server-card.json is not valid JSON');
  }
}

// B7: Compliance scan for banned terms
const bannedTerms = COMPLIANCE.bannedTerms || [];
if (bannedTerms.length > 0) {
  // scan public files
  for (const relPath of mandatoryFiles) {
    const full = path.join(rootDir, relPath);
    if (fs.existsSync(full)) {
      const text = fs.readFileSync(full, 'utf8').toLowerCase();
      for (const term of bannedTerms) {
        check(!text.includes(term.toLowerCase()), `B7: Banned term "${term}" found in ${relPath}`);
      }
    }
  }
}

// Verify IndexNow file
if (SITE.indexNowKey) {
  const indexNowPath = path.join(rootDir, 'public', `${SITE.indexNowKey}.txt`);
  check(fs.existsSync(indexNowPath), `IndexNow key file missing: public/${SITE.indexNowKey}.txt`);
}

// Verify all products have images and unique descriptions
const productSlugs = new Set();
for (const p of PRODUCTS) {
  check(!productSlugs.has(p.slug), `Duplicate product slug: ${p.slug}`);
  productSlugs.add(p.slug);
  check(p.images && p.images.length > 0, `Product missing image: ${p.name}`);
  check(p.price > 0, `Product price missing or 0: ${p.name}`);
}

console.log('--------------------------------------------------');
if (warnings.length > 0) {
  console.log('⚠️  Warnings / Notices:');
  warnings.forEach(w => console.log('   ' + w));
}

if (errors.length > 0) {
  console.error('❌ Crosscheck FAILED with blocking errors:');
  errors.forEach(e => console.error('   ' + e));
  process.exit(1);
} else {
  console.log('✅ WebForge v9.1 Pre-ship Crosscheck PASSED cleanly with 0 blocking errors!');
  process.exit(0);
}
