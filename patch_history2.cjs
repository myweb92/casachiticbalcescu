const fs = require('fs');

let content = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');

const newParagraphs = `
          <p>
            Perfectly nestled at{' '}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Strada+Nicolae+Bălcescu+13,+Brașov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] font-semibold hover:text-[#A67C52] transition-colors"
            >
              Strada Nicolae Bălcescu 13
            </a>
            , Casa Chitic Bălcescu invites you to experience a unique synthesis of Romanian history and contemporary luxury. Built in <strong className="text-[#A67C52] font-semibold font-serif">1902</strong>, this remarkable architectural building has been completely restored with extreme care, offering you an intimate home in the historic core of Brașov.
          </p>
          <p>
            Upon crossing our threshold, you will discover majestic, vaulted ceilings and bespoke, noble furniture hand-carved entirely from <strong className="text-[#1A1A1A] font-semibold">solid wood</strong>.
          </p>
          <p>
            Whether you are visiting Brașov to explore the spectacular gothic peaks of the Black Church (a 3-minute stroll), relax near the vibrant terrace cafes of Council Square, or hike the lush forested crown of Mount Tâmpa, Casa Chitic Balcescu stands as your ultimate, peaceful retreat.
          </p>
`;

content = content.replace(
  /<div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">.*?<\/div>/s,
  `<div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">${newParagraphs}        </div>`
);

fs.writeFileSync('src/components/HistorySection.tsx', content);
