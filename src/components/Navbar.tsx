import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Welcome', href: '#welcome', id: 'welcome' },
    { name: 'Rooms', href: '#rooms', id: 'rooms' },
    { name: 'Experiences', href: '#experiences', id: 'experiences' },
    { name: 'History', href: '#history', id: 'history' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Listen to scroll to adjust styles and active links
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F2ED]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#DED9D2]'
            : 'bg-gradient-to-b from-neutral-950/80 to-transparent py-5 text-white'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group"
            id="nav-brand-logo"
          >
            <Logo showText={false} variant={isScrolled ? 'gold' : 'white'} className="w-10 h-11 md:w-12 md:h-13 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span
                className={`font-serif font-bold text-sm md:text-base tracking-widest uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                Casa Chitic
              </span>
              <span
                className={`text-[8px] md:text-[9px] font-sans font-semibold tracking-[0.3em] uppercase -mt-0.5 transition-colors duration-300 ${
                  isScrolled ? 'text-[#A67C52]' : 'text-amber-100/90'
                }`}
              >
                Bălcescu • Brașov
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[10px] font-sans font-semibold uppercase tracking-widest py-2 transition-all relative group ${
                  isScrolled
                    ? activeSection === link.id
                      ? 'text-[#A67C52]'
                      : 'text-neutral-600 hover:text-[#A67C52]'
                    : activeSection === link.id
                    ? 'text-white border-b border-white'
                    : 'text-neutral-200 hover:text-white'
                }`}
              >
                {link.name}
                {/* Underline indicators */}
                {isScrolled && (
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A67C52] origin-left transition-transform duration-300 ${
                      activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA / Contacts */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="https://wa.me/40731002138" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61556292635319" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/casachitic/" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="tel:+40731002138"
                className={`flex items-center gap-1.5 text-sm font-sans font-bold tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-[#1A1A1A] hover:text-[#A67C52]' : 'text-neutral-200 hover:text-white'
                }`}
            >
              <Phone size={15} className="text-[#A67C52]" /> +40 731 002 138
              </a>
            </div>
            <a
              href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A67C52] hover:bg-[#8E6A46] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 transition-colors cursor-pointer inline-block"
              id="navbar-desktop-booking-btn"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Trigger & Book Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A67C52] hover:bg-[#8E6A46] text-white text-[9px] font-sans font-bold uppercase tracking-widest px-4 py-2 transition-colors cursor-pointer inline-block"
              id="navbar-mobile-booking-btn"
            >
              Book Now
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded transition-colors ${
                isScrolled ? 'text-neutral-800 hover:bg-neutral-200/50' : 'text-white hover:bg-neutral-800/40'
              }`}
              aria-label="Toggle navigation menu"
              id="navbar-mobile-menu-trigger"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden pt-24 pb-6 px-4 bg-[#F5F2ED] border-b border-[#DED9D2] flex flex-col justify-between"
            id="mobile-drawer-menu"
          >
            {/* Nav links */}
            <nav className="flex flex-col items-center gap-4 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs font-sans font-bold uppercase tracking-widest py-1.5 transition-colors ${
                    activeSection === link.id ? 'text-[#A67C52]' : 'text-neutral-600 hover:text-[#A67C52]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Footer metrics in drawer */}
            <div className="flex flex-col items-center gap-3 text-center border-t border-[#DED9D2] pt-6">
              <a href="tel:+40731002138" className="flex items-center gap-2 text-xs font-sans text-neutral-600 hover:text-neutral-800">
                <Phone size={14} className="text-[#A67C52]" /> +40 731 002 138
              </a>
              <p className="text-[9px] text-neutral-500 font-sans uppercase tracking-widest">
                Nicolae Balcescu 13, Brasov, Romania
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
