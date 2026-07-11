const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Replace "Explore" column and its content
const exploreColRegex = /\{\/\* Column 2: Navigation Links \*\/\}.*?<\/div>\s*\{\/\* Column 3: Contact details \*\/\}/s;
content = content.replace(exploreColRegex, '{/* Column 3: Contact details */}');

// Adjust Column 3 width from lg:col-span-3 to lg:col-span-4 to fill up space
content = content.replace(/className="lg:col-span-3 space-y-4"\s*>\s*<h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">\s*Contact Us/s, 
  'className="lg:col-span-4 space-y-4">\n            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">\n              Contact Us');

// Replace the Question form with a direct mailto link
const questionFormRegex = /<form onSubmit=\{handleSubmitInquiry\}.*?<\/form>\s*\{isSent.*?<\/p>\s*\}/s;
const mailtoLink = `<a
                href="mailto:office@casachiticbalcescu.ro"
                className="w-full bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-[10px] tracking-widest uppercase py-3 flex items-center justify-center gap-2 transition-all cursor-pointer text-center inline-block"
                id="footer-inquiry-email-btn"
              >
                Send us an Email <Send size={12} />
              </a>`;
content = content.replace(questionFormRegex, mailtoLink);

// Adjust Column 4 width from lg:col-span-3 to lg:col-span-4
content = content.replace(/className="lg:col-span-3 space-y-4"\s*>\s*<h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">\s*Questions\?/s,
  'className="lg:col-span-4 space-y-4">\n            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">\n              Questions?');

fs.writeFileSync('src/components/Footer.tsx', content);
