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
    image: 'https://h-img3.cloudbeds.com/uploads/184869/xt4b1539~~655e097ad53f4.jpg',
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
    image: 'https://h-img3.cloudbeds.com/uploads/184869/xt4b1450~~655e0a3c71e6d.jpg',
    description: 'This Triple Economy Room is especially designed for three travelers that want to share the same room. This room comes with one large king size bed and a single large size bed.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'budget-double',
    name: 'Double Budget Room - Nicolae Balcescu 13',
    type: 'budget',
    tag: 'Popular',
    tagColor: 'bg-[#A67C52]',
    size: '15 m²',
    capacity: '2 Adults',
    bed: '1 King Size Bed',
    image: 'https://h-img2.cloudbeds.com/uploads/184869/xt4b0816~~655e09cae0309.jpg',
    description: 'This Double Economy Room is especially designed for two travelers that want to share the same room. This room comes with one large king size.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-single',
    name: 'Deluxe Single Room - Nicolae Balcescu 13',
    type: 'deluxe',
    tag: 'Solo',
    tagColor: 'bg-[#1A1A1A]',
    size: '12 m²',
    capacity: '1 Adult',
    bed: '1 Single Bed',
    image: 'https://h-img1.cloudbeds.com/uploads/184869/xt4b0970~~655e0b55aad9b.jpg',
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
    image: 'https://h-img3.cloudbeds.com/uploads/184869/xt4b0913~~655e0afe643e0.jpg',
    description: 'Especially designed for the travelers that want the comfort of a double room with two separate beds.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room - Nicolae Balcescu 13',
    type: 'deluxe',
    tag: 'Luxury',
    tagColor: 'bg-[#1A1A1A]',
    size: '18 m²',
    capacity: '2 Adults',
    bed: '1 Large Double Bed',
    image: 'https://h-img3.cloudbeds.com/uploads/184869/xt4b1413~~655e0a91eab3c.jpg',
    description: 'Especially designed rooms.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Soundproofing']
  },
  {
    id: 'deluxe-apartment-gott',
    name: 'Deluxe Apartment - Johann Gott 7',
    type: 'deluxe',
    tag: 'Premium',
    tagColor: 'bg-[#1A1A1A]',
    size: '40 m²',
    capacity: '4 Adults',
    bed: 'Multiple Beds',
    image: 'https://h-img2.cloudbeds.com/uploads/184869/t20pj~~6a328456922c9.jpg',
    description: 'The air-conditioned apartment features 2 bedrooms and 1 bathroom with a walk-in shower and a hairdryer. This apartment has soundproof walls, a minibar, a flat-screen TV with cable channels and a terrace.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Terrace', 'Minibar']
  },
  {
    id: 'deluxe-suite-gott',
    name: 'Deluxe Suite - Johann Gott 7',
    type: 'deluxe',
    tag: 'Premium',
    tagColor: 'bg-[#1A1A1A]',
    size: '35 m²',
    capacity: '4 Adults',
    bed: '3 Beds',
    image: 'https://h-img3.cloudbeds.com/uploads/184869/image-2~~6a32840c7c61b.jpg',
    description: 'This suite includes 1 living room, 1 separate bedroom and 1 bathroom with a walk-in shower and free toiletries. The suite offers air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar']
  },
  {
    id: 'deluxe-twin-gott',
    name: 'Deluxe Twin Room - Johann Gott 7',
    type: 'deluxe',
    tag: 'Luxury',
    tagColor: 'bg-[#1A1A1A]',
    size: '20 m²',
    capacity: '2 Adults',
    bed: '2 Beds',
    image: 'https://h-img1.cloudbeds.com/uploads/184869/image~~6a3283e751102.jpg',
    description: 'Featuring free toiletries, this twin room includes a private bathroom with a walk-in shower, a hairdryer and slippers. This twin room is air-conditioned and has a flat-screen TV with cable channels, soundproof walls, a minibar and a wardrobe.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar']
  },
  {
    id: 'deluxe-double-gott',
    name: 'Deluxe Double Room - Johann Gott 7',
    type: 'deluxe',
    tag: 'Luxury',
    tagColor: 'bg-[#1A1A1A]',
    size: '20 m²',
    capacity: '2 Adults',
    bed: '1 Bed',
    image: 'https://h-img2.cloudbeds.com/uploads/184869/image~~6a32839f156df.jpg',
    description: 'Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe and a flat-screen TV with cable channels.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar']
  },
  {
    id: 'deluxe-no-window-gott',
    name: 'Deluxe Room - No Window - Johann Gott 7',
    type: 'deluxe',
    tag: 'Cozy',
    tagColor: 'bg-[#1A1A1A]',
    size: '18 m²',
    capacity: '2 Adults',
    bed: '1 Bed',
    image: 'https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a32836d4c50c.jpg',
    description: 'Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels.',
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar']
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

