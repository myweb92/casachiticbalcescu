const fs = require('fs');
const data = fs.readFileSync('public/ccheader.jpg');
let count = 0;
for (let i = 0; i < Math.min(100, data.length - 2); i++) {
  if (data[i] === 0xEF && data[i+1] === 0xBF && data[i+2] === 0xBD) count++;
}
console.log('Replacement chars in first 100 bytes:', count);
