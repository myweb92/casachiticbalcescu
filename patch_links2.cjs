const fs = require('fs');

const url = "https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron";

// 1. RoomCard.tsx
let roomCardContent = fs.readFileSync('src/components/RoomCard.tsx', 'utf8');
roomCardContent = roomCardContent.replace(
  /<button\s+onClick=\{\(\) => onBook\(room\.id\)\}\s+className="bg-\[#A67C52\] hover:bg-\[#8E6A46\] text-white font-sans font-bold text-\[10px\] tracking-widest uppercase py-2\.5 transition-all cursor-pointer"\s+id=\{`room-book-btn-\$\{room\.id\}`\}\s*>\s*Book Stay\s*<\/button>/,
  `<a href="${url}" target="_blank" rel="noopener noreferrer" className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-[10px] tracking-widest uppercase py-2.5 transition-all cursor-pointer inline-flex items-center justify-center" id={\`room-book-btn-\${room.id}\`}>Book Stay</a>`
);
fs.writeFileSync('src/components/RoomCard.tsx', roomCardContent);

// 2. Navbar.tsx
let navbarContent = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navbarContent = navbarContent.replace(
  /<button\s+onClick=\{onOpenBooking\}\s+className="bg-\[#A67C52\] hover:bg-\[#8E6A46\] text-white text-\[10px\] font-bold uppercase tracking-widest px-6 py-2\.5 transition-colors cursor-pointer"\s+id="navbar-desktop-booking-btn"\s*>\s*Book Now\s*<\/button>/g,
  `<a href="${url}" target="_blank" rel="noopener noreferrer" className="bg-[#A67C52] hover:bg-[#8E6A46] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 transition-colors cursor-pointer inline-block" id="navbar-desktop-booking-btn">Book Now</a>`
);
navbarContent = navbarContent.replace(
  /<button\s+onClick=\{onOpenBooking\}\s+className="bg-\[#A67C52\] hover:bg-\[#8E6A46\] text-white text-\[9px\] font-sans font-bold uppercase tracking-widest px-4 py-2 transition-colors cursor-pointer"\s+id="navbar-mobile-booking-btn"\s*>\s*Book Now\s*<\/button>/g,
  `<a href="${url}" target="_blank" rel="noopener noreferrer" className="bg-[#A67C52] hover:bg-[#8E6A46] text-white text-[9px] font-sans font-bold uppercase tracking-widest px-4 py-2 transition-colors cursor-pointer inline-block" id="navbar-mobile-booking-btn">Book Now</a>`
);
fs.writeFileSync('src/components/Navbar.tsx', navbarContent);

// 3. App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /<button\s+onClick=\{\(\) => openBookingModal\(''\)\}\s+className="w-full sm:w-auto bg-\[#A67C52\] hover:bg-\[#8E6A46\] text-white font-sans font-bold text-xs tracking-\[0\.2em\] uppercase px-8 py-4 rounded-none transition-all hover:scale-\[1\.02\] active:scale-\[0\.98\] cursor-pointer"\s+id="hero-book-now-btn"\s*>\s*Book Your Stay\s*<\/button>/g,
  `<a href="${url}" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-none transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block text-center" id="hero-book-now-btn">Book Your Stay</a>`
);
fs.writeFileSync('src/App.tsx', appContent);

console.log('done');
