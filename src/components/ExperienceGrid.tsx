import React from 'react';
import { Car, Sparkles, Users, Coffee, Languages, Wifi, Calendar, Check } from 'lucide-react';

interface ExperienceItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  badge?: string;
  badgeColor?: string;
  description: string;
}

export default function ExperienceGrid() {
  const experiences: ExperienceItem[] = [
    {
      icon: Coffee,
      title: 'Breakfast Included',
      badge: 'Buffet',
      badgeColor: 'bg-[#EBE7E0] text-[#5A5A40] border-[#DED9D2]',
      description: 'Start your mornings in Brasov with a delicious, rich buffet breakfast offering hot and cold options, and premium coffee.',
    },
    {
      icon: Wifi,
      title: 'Free Wi-Fi Everywhere',
      badge: 'High Speed',
      badgeColor: 'bg-[#EBE7E0] text-[#5A5A40] border-[#DED9D2]',
      description: 'Stay connected at all times with high-speed fiber internet access throughout the entire property, including courtyard and public areas.',
    },
    {
      icon: Car,
      title: 'Private Parking',
      badge: 'Extra Cost',
      badgeColor: 'bg-[#EBE7E0] text-[#A67C52] border-[#DED9D2]',
      description: 'Convenient, secure parking is available on-site for guests arriving by vehicle (reservation mandatory, daily surcharge applies, limited spots).',
    },
    {
      icon: Sparkles,
      title: 'Luxury SPA Center',
      badge: 'Coming Aug 2027',
      badgeColor: 'bg-[#EBE7E0] text-[#A67C52] border-[#DED9D2]',
      description: 'A sanctuary for body and mind. Currently undergoing restoration, our high-end wellness SPA will open in late summer 2027.',
    },
    {
      icon: Users,
      title: 'Conference Room',
      badge: 'Up to 30 Guests',
      badgeColor: 'bg-[#EBE7E0] text-[#5A5A40] border-[#DED9D2]',
      description: 'An elegant space equipped with modern presentation technology, solid wood conference tables, and custom catering services.',
    },
    {
      icon: Languages,
      title: 'Multilingual Staff',
      badge: '24/7 Desk',
      badgeColor: 'bg-[#EBE7E0] text-[#5A5A40] border-[#DED9D2]',
      description: 'Our professional, warm hospitality staff speak fluent English, French, Spanish, and Romanian to assist you at any time.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="experiences-grid">
      {experiences.map((exp, idx) => {
        const IconComponent = exp.icon;
        return (
          <div
            key={idx}
            className="group bg-white p-6 border border-[#DED9D2] hover:border-[#A67C52] transition-all duration-300 flex flex-col justify-between shadow-sm"
            id={`experience-item-${idx}`}
          >
            <div className="space-y-4">
              {/* Icon & Badge Row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full border border-[#A67C52] flex items-center justify-center text-[#A67C52] transition-transform duration-300">
                  <IconComponent size={18} />
                </div>
                {exp.badge && (
                  <span
                    className={`text-[8px] font-sans font-bold tracking-widest uppercase px-2.5 py-0.5 border border-[#DED9D2] ${exp.badgeColor}`}
                  >
                    {exp.badge}
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h4 className="font-serif text-base md:text-lg font-medium text-[#1A1A1A]">
                  {exp.title}
                </h4>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>

            {/* Micro decorative line at bottom */}
            <div className="w-1/3 h-[1px] bg-[#DED9D2] mt-5 group-hover:w-full group-hover:bg-[#A67C52]/50 transition-all duration-500" />
          </div>
        );
      })}
    </div>
  );
}
