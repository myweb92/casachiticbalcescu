const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');

// Remove priceTotal calculation
content = content.replace(/const priceTotal = 0 \* nights;/g, '');
content = content.replace(/const priceTotal.*?;/g, '');

// Remove price UI
content = content.replace(/— €\{0\}\/night/g, '');
content = content.replace(/<div className="flex justify-between font-bold text-sm border-t border-\[#DED9D2\] pt-3 mt-4">[\s\S]*?<\/div>/, '');
content = content.replace(/<div className="flex justify-between items-center text-xs mt-3 bg-\[#F5F2ED\] p-3">[\s\S]*?<\/div>/, '');
content = content.replace(/<span className="text-\[#A67C52\]">€\{priceTotal\}.*?<\/span>/g, '');

fs.writeFileSync('src/components/BookingModal.tsx', content);
