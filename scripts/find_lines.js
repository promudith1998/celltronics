const fs = require('fs');
const lines = fs.readFileSync('CellCentral_Prototype.html', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('topbar') || l.includes('header class="site"') || l.includes('id="page-home"')) {
    console.log(`${i + 1}: ${l.trim().substring(0, 80)}`);
  }
});
