const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

assert.match(index, /id="taskForm"/);
assert.match(index, /id="taskList"/);
assert.match(index, /id="search"/);
assert.match(index, /app\.js/);
assert.match(index, /style\.css/);
assert.match(js, /localStorage/);
assert.match(js, /function render/);
assert.match(js, /function loadTasks/);
assert.match(js, /addEventListener/);
assert.ok(css.length > 500, 'CSS should not be empty');

console.log('All project structure and JavaScript checks passed.');
