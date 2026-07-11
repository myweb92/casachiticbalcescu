const fs = require('fs');
let code = fs.readFileSync('src/components/RoomCard.tsx', 'utf8');

code = code.replace(
  /import \{ Bed, Users, Maximize, ChevronDown, ChevronUp, Check, ShieldCheck \} from 'lucide-react';/,
  "import { Bed, Users, Maximize, ChevronDown, ChevronUp, Check, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';"
);

code = code.replace(
  /const \[isExpanded, setIsExpanded\] = useState\(false\);/,
  "const [isExpanded, setIsExpanded] = useState(false);\n  const [currentImageIndex, setCurrentImageIndex] = useState(0);\n\n  const nextImage = () => {\n    if (room.images && room.images.length > 0) {\n      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);\n    }\n  };\n\n  const prevImage = () => {\n    if (room.images && room.images.length > 0) {\n      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);\n    }\n  };"
);

code = code.replace(
  /<div className="relative aspect-video sm:aspect-4\/3 overflow-hidden bg-\[#EBE7E0\] shrink-0">.*?<\/div>/s,
  `<div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-[#EBE7E0] shrink-0 group/slider">
        {room.images && room.images.length > 0 && (
          <img
            src={room.images[currentImageIndex]}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        
        {room.images && room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {room.images.map((_, idx) => (
                <div
                  key={idx}
                  className={\`w-1.5 h-1.5 rounded-full transition-colors \${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}\`}
                />
              ))}
            </div>
          </>
        )}

        {/* Absolute Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Tag Badge */}
        <span
          className={\`absolute top-3 left-3 text-[8px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 text-white \${
            room.type === 'deluxe'
              ? 'bg-[#5A5A40]' // Deluxe
              : 'bg-[#A67C52]' // Best Seller
          }\`}
        >
          {room.tag}
        </span>
      </div>`
);

fs.writeFileSync('src/components/RoomCard.tsx', code);
