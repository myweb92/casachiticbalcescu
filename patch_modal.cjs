const fs = require('fs');

let content = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');

// The errors are on lines 44, 49, 165
// Let's just remove anything referring to `room.price`.
// Example: `€${room.price}/night` -> removed
content = content.replace(/€\$\{room\.price\}\/night/g, '');
content = content.replace(/price:\s*room\.price/g, '');
content = content.replace(/Total:\s*€\$\{room\.price\}/g, '');
content = content.replace(/room\.price/g, '0');

fs.writeFileSync('src/components/BookingModal.tsx', content);
