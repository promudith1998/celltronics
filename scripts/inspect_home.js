const fs = require('fs');
const lines = fs.readFileSync('CellCentral_Prototype.html', 'utf8').split('\n');

for (let i = 673; i < 790; i++) {
  let l = lines[i];
  if (!l) continue;
  if (l.includes('data:image')) {
    l = l.replace(/src="data:image\/[^"]+"/g, 'src="[base64]"');
  }
  console.log(`${i + 1}: ${l}`);
}
