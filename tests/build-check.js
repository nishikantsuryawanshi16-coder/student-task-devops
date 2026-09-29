const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
for (const file of ['index.html', 'style.css', 'app.js']) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
    throw new Error(`Missing or empty build file: ${file}`);
  }
}
console.log('Build check passed: all deployable files are present.');
