const fs = require('fs');

let content = fs.readFileSync('src/components/HistorySection.tsx', 'utf8');

const newParagraphs = `
          <p>
            Established in a grand building dating back to <strong className="text-[#A67C52] font-semibold font-serif">1902</strong>, Casa Chitic Bălcescu is more than a landmark today—it is a living testimony to Brașov’s rich Transylvanian soul. Originally constructed during the turn of the century, the building has witnessed over a hundred years of history, standing proud in the heart of the medieval crown city.
          </p>
          <p>
            Our family-owned business was born from a passion for architecture and restoration. Over years of meticulous conservation efforts, we have revived the building’s majestic grand arches, original structural layouts, and period accents, ensuring that every guest feels connected to the nobility of the past.
          </p>
          <p>
            Inside, the hallmark of Casa Chitic is our dedication to true craftsmanship. Every bed, wardrobe, desk, and vanity has been hand-crafted from <strong className="text-[#1A1A1A] font-semibold">solid wood</strong>, reflecting local woodworking traditions and giving our rooms a rich, organic, and timeless comfort. Located at{' '}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Strada+Nicolae+Bălcescu+13,+Brașov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] font-semibold hover:text-[#A67C52] transition-colors"
            >
              Strada Nicolae Bălcescu 13
            </a>
            , we stand as a peaceful refuge directly alongside the original citadel walls, while remaining just a three-minute stroll from the council house and Black Church.
          </p>
`;

content = content.replace(
  /<div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">.*?<\/div>/s,
  `<div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">${newParagraphs}        </div>`
);

fs.writeFileSync('src/components/HistorySection.tsx', content);
