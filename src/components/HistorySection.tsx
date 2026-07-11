import React from 'react';
import Logo from './Logo';
import { Landmark, Compass, Award, Hammer } from 'lucide-react';

export default function HistorySection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="history-section-grid">
      {/* Left Column: Historical Text */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-2">
          
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            A Bit of History About Us
          </h2>
          <div className="w-16 h-[1px] bg-[#A67C52] mt-3" />
        </div>

        <div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">
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
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="flex items-start gap-3 p-4 bg-white border border-[#DED9D2]">
            <div className="p-2 bg-[#EBE7E0] text-[#A67C52]">
              <Landmark size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] font-serif">Built 1902</h4>
              <p className="text-[10px] text-neutral-500">Architectural Monument</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border border-[#DED9D2]">
            <div className="p-2 bg-[#EBE7E0] text-[#A67C52]">
              <Compass size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] font-serif">Old Town</h4>
              <p className="text-[10px] text-neutral-500">Strada Nicolae Bălcescu</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border border-[#DED9D2]">
            <div className="p-2 bg-[#EBE7E0] text-[#A67C52]">
              <Hammer size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] font-serif">Renovated 2017</h4>
              <p className="text-[10px] text-neutral-500">Refurbished and fully renovated in 2017</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border border-[#DED9D2]">
            <div className="p-2 bg-[#EBE7E0] text-[#A67C52]">
              <Award size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A] font-serif">Family Run</h4>
              <p className="text-[10px] text-neutral-500">Craftsmanship Focus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-8">
        <div className="relative max-w-sm w-full group overflow-hidden shadow-lg rounded-sm">
          <img
            src="/logo.jpeg"
            alt="Casa Chitic Balcescu Logo"
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
