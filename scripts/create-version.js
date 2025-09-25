#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Get version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageJson.version;
const versionDir = path.join(distDir, `v${version}`);

console.log(`🚀 Creating version ${version}...`);

// Create versioned directory
if (!fs.existsSync(versionDir)) {
  fs.mkdirSync(versionDir, { recursive: true });
  console.log(`📁 Created version directory: v${version}`);
}

// Copy library files to versioned directory
const files = ['flowbitz.umd.js', 'flowbitz.es.js', 'flowbitz.umd.js.map'];
let copiedFiles = 0;

files.forEach(file => {
  const source = path.join(distDir, file);
  const dest = path.join(versionDir, file);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`✅ Copied ${file} to v${version}`);
    copiedFiles++;
  } else {
    console.warn(`⚠️  Source file not found: ${file}`);
  }
});

// Update latest symlink
const latestDir = path.join(distDir, 'latest');
if (fs.existsSync(latestDir)) {
  fs.rmSync(latestDir, { recursive: true });
  console.log('🔄 Removed old latest symlink');
}

// Create new latest symlink
try {
  fs.symlinkSync(`v${version}`, latestDir);
  console.log(`🔗 Created latest symlink → v${version}`);
} catch (error) {
  console.error('❌ Failed to create latest symlink:', error.message);
  process.exit(1);
}

// Create version info
const versionInfo = {
  version: version,
  timestamp: new Date().toISOString(),
  files: files.filter(file => fs.existsSync(path.join(distDir, file)))
};

fs.writeFileSync(
  path.join(versionDir, 'version.json'),
  JSON.stringify(versionInfo, null, 2)
);

console.log(`\n🎉 Version ${version} created successfully!`);
console.log(`📦 Files copied: ${copiedFiles}/${files.length}`);
console.log(`🌐 Version URL: https://www.flowbitz.dev/v${version}/flowbitz.umd.js`);
console.log(`🌐 Latest URL: https://www.flowbitz.dev/latest/flowbitz.umd.js`);
console.log(`\n💡 For users: <script src="https://www.flowbitz.dev/latest/flowbitz.umd.js"></script>`);
