const fs = require('fs');

const rooms = [
  {
    id: 'budget-twin',
    name: 'Twin Budget Room - Nicolae Balcescu 13',
    type: 'budget',
    tag: 'Best Seller',
    tagColor: 'bg-[#A67C52]',
    size: '15 m²',
    capacity: '2 Adults',
    bed: '2 Single Beds',
    images: [
      'https://h-img3.cloudbeds.com/uploads/184869/xt4b1539~~655e097ad53f4.jpg',
      'https://h-img1.cloudbeds.com/uploads/184869/xt4b1557~~655e0989a1e7b.jpg',
      'https://h-img1.cloudbeds.com/uploads/184869/dscf1886~~655e098e310f0.jpg'
    ],
    description: 'This room is especially designed for two travelers that want to share the same room but not the same bed. This room comes with two large single beds, as comfortable as a double bed.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'budget-triple',
    name: 'Triple Budget Room - Nicolae Balcescu 13',
    type: 'budget',
    tag: 'Family',
    tagColor: 'bg-emerald-700',
    size: '20 m²',
    capacity: '3 Adults',
    bed: '1 King, 1 Single',
    images: [
      'https://h-img3.cloudbeds.com/uploads/184869/xt4b1450~~655e0a3c71e6d.jpg',
      'https://h-img2.cloudbeds.com/uploads/184869/xt4b1494~~655e0a4b00c4e.jpg',
      'https://h-img2.cloudbeds.com/uploads/184869/dscf1872~~655e0a5893487.jpg'
    ],
    description: 'This Triple Economy Room is especially designed for three travelers that want to share the same room. This room comes with one large king size bed and a single large size bed.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'budget-double',
    name: 'Double Budget Room - Nicolae Balcescu 13',
    type: 'budget',
    tag: 'Popular',
    tagColor: 'bg-[#A67C52]',
    size: '25 m²', // modified
    capacity: '2 Adults',
    bed: '1 King Size Bed',
    images: [
      'https://h-img2.cloudbeds.com/uploads/184869/xt4b0816~~655e09cae0309.jpg',
      'https://h-img3.cloudbeds.com/uploads/184869/dscf0622~~655e09daeb8d0.jpg',
      'https://h-img3.cloudbeds.com/uploads/184869/xt4b0814~~655e09e262335.jpg'
    ],
    description: 'This Double Economy Room is especially designed for two travelers that want to share the same room. This room comes with one large king size.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-single',
    name: 'Deluxe Single Room - Nicolae Balcescu 13',
    type: 'deluxe',
    tag: 'Solo',
    tagColor: 'bg-[#1A1A1A]',
    size: '20 m²', // modified
    capacity: '1 Adult',
    bed: '1 Single Bed',
    images: [
      'https://h-img1.cloudbeds.com/uploads/184869/xt4b0970~~655e0b55aad9b.jpg',
      'https://h-img3.cloudbeds.com/uploads/184869/dscf0698~~655e0b6b2e8f7.jpg',
      'https://h-img2.cloudbeds.com/uploads/184869/xt4b0964~~655e0b6fb7247.jpg'
    ],
    description: 'Especially Designed for single travelers regardless if is for business or pleasure.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Twin Room - Nicolae Balcescu 13',
    type: 'deluxe',
    tag: 'Luxury',
    tagColor: 'bg-[#1A1A1A]',
    size: '18 m²',
    capacity: '2 Adults',
    bed: '2 Single Beds',
    images: [
      'https://h-img3.cloudbeds.com/uploads/184869/xt4b0913~~655e0afe643e0.jpg',
      'https://h-img1.cloudbeds.com/uploads/184869/xt4b0925~~655e0b0bc40d3.jpg',
      'https://h-img1.cloudbeds.com/uploads/184869/dscf0631~~655e0b0e37163.jpg'
    ],
    description: 'Especially designed for the travelers that want the comfort of a double room with two separate beds.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room - Nicolae Balcescu 13',
    type: 'deluxe',
    tag: 'Luxury',
    tagColor: 'bg-[#1A1A1A]',
    size: '25 m²', // modified
    capacity: '2 Adults',
    bed: '1 Large Double Bed',
    images: [
      'https://h-img3.cloudbeds.com/uploads/184869/xt4b1413~~655e0a91eab3c.jpg',
      'https://h-img1.cloudbeds.com/uploads/184869/xt4b1413~~655e0ab098d80.jpg',
      'https://h-img3.cloudbeds.com/uploads/184869/dscf1845~~655e0ab857cdf.jpg'
    ],
    description: 'Especially designed rooms.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  }
];

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

const startStr = 'const ROOMS: Room[] = [';
const endStr = 'export default function App() {';

const startIndex = appContent.indexOf(startStr);
const endIndex = appContent.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const before = appContent.substring(0, startIndex);
  const after = appContent.substring(endIndex);

  const roomsString = `const ROOMS: Room[] = ${JSON.stringify(rooms, null, 2).replace(/"([^"]+)":/g, '$1:')};\n\n`;

  fs.writeFileSync('src/App.tsx', before + roomsString + after);
  console.log('Replaced ROOMS array successfully');
} else {
  console.log('Could not find ROOMS or App boundary in src/App.tsx');
}

