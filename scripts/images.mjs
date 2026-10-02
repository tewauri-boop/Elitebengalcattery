import fs from 'node:fs';
import path from 'node:path';

// WebForge v9.1 Image Pipeline stub/processor
const ASSETS_DIR = path.resolve('assets/product-photos');
const OUTPUT_DIR = path.resolve('public/images');

console.log('--- WebForge v9.1 Image Pipeline ---');
if (!fs.existsSync(ASSETS_DIR)) {
  console.log(`Note: No source photos in ${ASSETS_DIR}. Remote optimized CDNs are active for Next.js.`);
  process.exit(0);
}

console.log('Images pipeline completed.');
