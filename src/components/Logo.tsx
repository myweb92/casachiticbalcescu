import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'gold' | 'charcoal' | 'white';
}

export default function Logo({ className = '', showText = true, variant = 'gold' }: LogoProps) {
  // Color configuration
  const colors = {
    gold: {
      primary: 'text-[#A67C52]', // Clean Minimalism warm gold/caramel accent
      secondary: 'text-[#5A5A40]', // Clean Minimalism olive-neutral/warm gray accent
      stroke: '#A67C52',
      fill: 'none',
    },
    charcoal: {
      primary: 'text-[#1A1A1A]', // Deep off-black / charcoal
      secondary: 'text-[#5A5A40]',
      stroke: '#1A1A1A',
      fill: 'none',
    },
    white: {
      primary: 'text-white',
      secondary: 'text-neutral-300',
      stroke: '#FFFFFF',
      fill: 'none',
    },
  };

  const activeColor = colors[variant];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <img
        src="/logo.jpeg"
        alt="Casa Chitic Logo"
        className="w-16 h-16 md:w-20 md:h-20 object-contain shadow-sm transition-all duration-300"
        referrerPolicy="no-referrer"
      />

      {/* Elegant Typography */}
      {showText && (
        <div className="text-center mt-3 tracking-[0.2em] uppercase select-none">
          <h1 className={`font-serif text-lg md:text-xl font-semibold leading-tight ${activeColor.primary}`}>
            Casa Chitic
          </h1>
          <p className={`text-[9px] md:text-[10px] font-sans font-medium tracking-[0.35em] mt-0.5 ${activeColor.secondary}`}>
            Bălcescu • Brașov
          </p>
        </div>
      )}
    </div>
  );
}
