const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

console.log(`[prepare-gh-pages] Preparing GitHub Pages export with basePath: "${basePath}"...`);

if (!fs.existsSync(outDir)) {
  console.error(`[prepare-gh-pages] Error: out directory "${outDir}" does not exist.`);
  process.exit(1);
}

// 1. Ensure .nojekyll exists
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
console.log('  ✓ Created .nojekyll');

// 2. If basePath is set, ensure any root /assets/ paths in HTML/JS/CSS files are prefixed
if (basePath) {
  function processFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        processFiles(fullPath);
      } else if (/\.(html|js|css|json|xml|txt)$/i.test(entry.name)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        // Escape basePath for regex
        const escapedBasePath = basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match /assets/ NOT preceded by basePath or a domain
        const regex = new RegExp(`(?<!${escapedBasePath})/(assets/[^"'\`\\s\\)<>]+)`, 'g');

        if (regex.test(content)) {
          content = content.replace(regex, `${basePath}/$1`);
          modified = true;
        }

        // Also match relative "assets/ or 'assets/ in JS bundles
        const unslashedRegex = new RegExp(`(["'\`])assets/`, 'g');
        if (unslashedRegex.test(content)) {
          content = content.replace(unslashedRegex, `$1${basePath}/assets/`);
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
        }
      }
    }
  }

  processFiles(outDir);
  console.log(`  ✓ Prefixed asset references with "${basePath}"`);
}

// 3. Ensure 404.html exists for GitHub Pages routing fallback
const indexHtmlPath = path.join(outDir, 'index.html');
const notFoundHtmlPath = path.join(outDir, '404.html');
if (fs.existsSync(indexHtmlPath) && !fs.existsSync(notFoundHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
  console.log('  ✓ Created 404.html fallback from index.html');
}

console.log('[prepare-gh-pages] Export is ready for GitHub Pages deployment.');
