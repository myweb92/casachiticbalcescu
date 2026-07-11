const fs = require('fs');

// Patch App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /economy/g,
  'budget'
);
appContent = appContent.replace(
  /Economy/g,
  'Budget'
);
appContent = appContent.replace(
  /price:\s*\d+,?\s*/g,
  ''
);
// Remove triple room
appContent = appContent.replace(
  /,\s*\{\s*id:\s*'budget-triple'[\s\S]*?amenities:\s*\[[^\]]*\]\s*\}/g,
  ''
);

fs.writeFileSync('src/App.tsx', appContent);

// Patch RoomCard.tsx
let roomCardContent = fs.readFileSync('src/components/RoomCard.tsx', 'utf8');
roomCardContent = roomCardContent.replace(
  /\{\/\* Price Badge \*\/\}.*?<\/div>/s,
  ''
);
fs.writeFileSync('src/components/RoomCard.tsx', roomCardContent);

// Patch BookingModal.tsx
let bookingModalContent = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');
bookingModalContent = bookingModalContent.replace(
  /price:\s*\d+,?\s*/g,
  ''
);
bookingModalContent = bookingModalContent.replace(
  /Economy/g,
  'Budget'
);
bookingModalContent = bookingModalContent.replace(
  /economy/g,
  'budget'
);
fs.writeFileSync('src/components/BookingModal.tsx', bookingModalContent);

console.log('done');
