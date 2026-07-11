const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Add imports
content = content.replace(
  /import Logo from '\.\/Logo';/,
  `import Logo from './Logo';\nimport TermsModal from './TermsModal';\nimport PrivacyModal from './PrivacyModal';`
);

// Add state variables
content = content.replace(
  /const \[isSent, setIsSent\] = useState\(false\);/,
  `const [isSent, setIsSent] = useState(false);\n  const [isTermsOpen, setIsTermsOpen] = useState(false);\n  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);`
);

// Replace the links
content = content.replace(
  /<a href="#terms" className="hover:text-\[#A67C52\] transition-colors">\s*Terms &amp; Conditions\s*<\/a>/,
  `<button onClick={() => setIsTermsOpen(true)} className="hover:text-[#A67C52] transition-colors cursor-pointer">\n              Terms &amp; Conditions\n            </button>`
);

content = content.replace(
  /<a href="#privacy" className="hover:text-\[#A67C52\] transition-colors">\s*Privacy Policy\s*<\/a>/,
  `<button onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#A67C52] transition-colors cursor-pointer">\n              Privacy Policy\n            </button>`
);

// Insert the modals right before the closing </footer>
content = content.replace(
  /<\/footer>/,
  `  <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />\n      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />\n    </footer>`
);

fs.writeFileSync('src/components/Footer.tsx', content);
