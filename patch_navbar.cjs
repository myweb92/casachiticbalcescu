const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace Phone icon and phone number sizing, and add social icons
// Find the exact line:
content = content.replace(
  /<a\s+href="tel:\+40731002138"\s+className={`flex items-center gap-1\.5 text-\[10px\] font-sans font-semibold uppercase tracking-wider transition-colors duration-300 \$\{\s+isScrolled \? 'text-\[#1A1A1A\] hover:text-\[#A67C52\]' : 'text-neutral-200 hover:text-white'\s+\}`}/,
  `<div className="flex items-center gap-3">
              <a href="https://wa.me/40731002138" target="_blank" rel="noopener noreferrer" className={\`transition-colors duration-300 \${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}\`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              </a>
              <a href="#" className={\`transition-colors duration-300 \${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}\`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={\`transition-colors duration-300 \${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}\`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="tel:+40731002138"
                className={\`flex items-center gap-1.5 text-sm font-sans font-bold tracking-wider transition-colors duration-300 \${
                  isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'
                }\`}`
);

// We need to also close the div.
content = content.replace(
  /<Phone size=\{13\} className="text-\[#A67C52\]" \/> \+40 731 002 138\s+<\/a>/,
  '<Phone size={15} className="text-[#A67C52]" /> +40 731 002 138\n              </a>\n            </div>'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
