import React, { useState } from 'react';
import { Bed, Users, Maximize, ChevronDown, ChevronUp, Check, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Room } from '../types';

interface RoomCardProps {
  key?: string;
  room: Room;
  onBook: (roomId: string) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (room.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  return (
    <div
      className="group bg-white border border-[#DED9D2] hover:border-[#A67C52] transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md"
      id={`room-card-${room.id}`}
    >
      {/* Room Image with Tag */}
      <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-[#EBE7E0] shrink-0 group/slider">
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
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Absolute Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Tag Badge */}
        <span
          className={`absolute top-3 left-3 text-[8px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 text-white ${
            room.type === 'deluxe'
              ? 'bg-[#5A5A40]' // Deluxe
              : 'bg-[#A67C52]' // Best Seller
          }`}
        >
          {room.tag}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Room Title */}
          <div>
            <h3 className="font-serif text-lg md:text-xl font-medium text-[#1A1A1A] group-hover:text-[#A67C52] transition-colors leading-tight">
              {room.name}
            </h3>
            <p className="text-[10px] text-[#A67C52] font-sans tracking-widest uppercase mt-0.5 font-semibold">
              {room.type === 'deluxe' ? 'Deluxe Collection' : 'Economy Collection'}
            </p>
          </div>

          {/* Quick Specifications Row */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#DED9D2] font-sans text-xs text-[#1A1A1A]">
            <div className="flex items-center gap-1.5">
              <Maximize size={14} className="text-[#A67C52]" />
              <span className="text-[11px]">{room.size}</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-[#DED9D2]">
              <Users size={14} className="text-[#A67C52]" />
              <span className="text-[11px]">{room.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <Bed size={14} className="text-[#A67C52]" />
              <span className="truncate text-[11px]" title={room.bed}>{room.bed}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-neutral-600 font-sans leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Expandable specs block & Buttons */}
        <div className="mt-5 space-y-3">
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="border border-[#DED9D2] hover:bg-[#EBE7E0] text-[#1A1A1A] font-sans font-bold text-[10px] tracking-widest uppercase py-2.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
              id={`room-details-btn-${room.id}`}
            >
              Specs {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <a href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron" target="_blank" rel="noopener noreferrer" className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-[10px] tracking-widest uppercase py-2.5 transition-all cursor-pointer inline-flex items-center justify-center" id={`room-book-btn-${room.id}`}>Book Stay</a>
          </div>

          {/* Expanded Amenities list */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden bg-[#EBE7E0]/50 p-3 border border-[#DED9D2]"
              >
                <h4 className="text-[9px] font-sans font-bold text-[#1A1A1A] uppercase tracking-widest mb-2 flex items-center gap-1">
                  <ShieldCheck size={11} className="text-[#A67C52]" /> Room Inclusions:
                </h4>
                <ul className="grid grid-cols-2 gap-1.5 text-[10px] text-neutral-700 font-sans">
                  {room.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#A67C52] shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
