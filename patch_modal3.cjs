const fs = require('fs');
let content = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');

// remove empty Est. Total:
content = content.replace(/<div className="flex justify-between font-bold pt-1 text-sm border-t border-dotted border-neutral-200">\s*<span className="text-neutral-500 uppercase font-sans tracking-wide text-\[10px\] pt-0\.5">Est\. Total:<\/span>\s*<\/div>/g, '');

fs.writeFileSync('src/components/BookingModal.tsx', content);
