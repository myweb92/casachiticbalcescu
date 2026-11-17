import React from 'react';
import EditableImage from './EditableImage';
import EditableText from './EditableText';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'gold' | 'charcoal' | 'white';
  compactImageEdit?: boolean;
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'gold',
  compactImageEdit = false,
}: LogoProps) {
  // Color configuration
  const colors = {
    gold: {
      primary: 'text-[#A67C52]',
      secondary: 'text-[#5A5A40]',
    },
    charcoal: {
      primary: 'text-[#1A1A1A]',
      secondary: 'text-[#5A5A40]',
    },
    white: {
      primary: 'text-white',
      secondary: 'text-neutral-300',
    },
  };

  const activeColor = colors[variant];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <EditableImage
        contentKey="brand.logo"
        defaultSrc="/logo.jpeg"
        alt="Casa Chitic Logo"
        className="w-16 h-16 md:w-20 md:h-20 object-contain shadow-sm transition-all duration-300"
        containerClassName="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
        referrerPolicy="no-referrer"
        compact={compactImageEdit || !showText}
      />

      {/* Elegant Typography */}
      {showText && (
        <div className="text-center mt-3 tracking-[0.2em] uppercase select-none">
          <h1 className={`font-serif text-lg md:text-xl font-semibold leading-tight ${activeColor.primary}`}>
            <EditableText contentKey="brand.name" defaultText="Casa Chitic" />
          </h1>
          <p className={`text-[9px] md:text-[10px] font-sans font-medium tracking-[0.35em] mt-0.5 ${activeColor.secondary}`}>
            <EditableText contentKey="brand.tagline" defaultText="Bălcescu • Brașov" />
          </p>
        </div>
      )}
    </div>
  );
}
