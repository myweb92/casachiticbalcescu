import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, Check, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';

export default function Footer() {
  const [emailInquiry, setEmailInquiry] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInquiry) {
      setIsSent(true);
      setTimeout(() => {
        setEmailInquiry('');
        setMessageText('');
        setIsSent(false);
      }, 5000);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-[#2D2926] text-neutral-300 pt-16 pb-8 border-t border-[#DED9D2]/25" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Logo showText={false} variant="gold" className="w-10 h-11" />
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-base text-white tracking-widest uppercase">
                  Casa Chitic
                </span>
                <span className="text-[8px] font-sans font-bold tracking-[0.3em] uppercase text-[#A67C52] -mt-0.5">
                  Bălcescu • Brașov
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Experience the timeless elegance of Brașov in our historic 1902 boutique property. Custom-crafted solid wood finishes, modern amenities, and welcoming family hospitality await your stay.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61556292635319"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-[#A67C52] hover:border-transparent hover:text-neutral-950 transition-all cursor-pointer"
                aria-label="Facebook Page"
                id="footer-social-facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://www.instagram.com/casachitic/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-[#A67C52] hover:border-transparent hover:text-neutral-950 transition-all cursor-pointer"
                aria-label="Instagram Page"
                id="footer-social-instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://wa.me/40731002138"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-emerald-600 hover:border-transparent hover:text-white transition-all cursor-pointer"
                aria-label="WhatsApp Support Link"
                id="footer-social-whatsapp"
              >
                {/* SVG for WhatsApp */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.113.984 11.481.984c-5.44 0-9.866 4.372-9.87 9.802 0 1.63.463 3.224 1.34 4.625l-1.005 3.673 3.737-.97.036.022zm13.333-6.915c-.29-.146-1.72-.85-1.985-.947-.266-.097-.46-.146-.653.146-.193.29-.747.947-.916 1.14-.168.193-.337.217-.627.072-2.316-1.161-3.153-1.616-4.395-3.743-.19-.328.19-.304.544-1.01.072-.145.036-.272-.018-.38-.054-.11-.46-1.11-.63-1.522-.164-.397-.33-.342-.45-.348-.116-.005-.25-.006-.385-.006-.135 0-.356.05-.542.254-.186.204-.712.697-.712 1.701 0 1.004.73 1.976.83 2.112.1.137 1.432 2.186 3.47 3.067 1.405.607 1.942.543 2.628.441.69-.102 1.72-.703 1.962-1.385.242-.682.242-1.266.17-1.385-.073-.118-.266-.192-.556-.338z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Contact details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-xs font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#A67C52] shrink-0 mt-0.5" />
                <a
                  href="http://google.com/maps/place/Casa+Chitic+Hotels/@45.6417594,25.5897674,17z/data=!3m1!4b1!4m9!3m8!1s0x40b35b5c450e177d:0xe1d391e3599e83fd!5m2!4m1!1i2!8m2!3d45.6417594!4d25.5923423!16s%2Fg%2F11smdz24l6?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-normal hover:text-[#A67C52] transition-colors"
                >
                  Str. Nicolae Bălcescu 13,<br />
                  Brașov, 500019, Romania
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#A67C52] shrink-0" />
                <a href="mailto:office@casachiticbalcescu.ro" className="hover:text-[#A67C52] transition-colors">
                  office@casachiticbalcescu.ro
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#A67C52] shrink-0" />
                <a href="tel:+40731002138" className="hover:text-[#A67C52] transition-colors">
                  +40 731 002 138
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Contact Form */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Questions?
            </h4>
            <form onSubmit={handleSubmitInquiry} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={emailInquiry}
                onChange={(e) => setEmailInquiry(e.target.value)}
                className="w-full bg-[#1A1A1A] text-neutral-100 border border-neutral-700 rounded-none px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                id="footer-inquiry-email"
              />
              <textarea
                required
                rows={2}
                placeholder="Ask us anything..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full bg-[#1A1A1A] text-neutral-100 border border-neutral-700 rounded-none px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all resize-none"
                id="footer-inquiry-message"
              />
              <button
                type="submit"
                disabled={isSent}
                className="w-full bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-[10px] tracking-widest uppercase py-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                id="footer-inquiry-submit"
              >
                {isSent ? (
                  <>
                    Sent! <Check size={12} />
                  </>
                ) : (
                  <>
                    Send Message <Send size={11} />
                  </>
                )}
              </button>
            </form>
            {isSent && (
              <p className="text-[10px] text-emerald-500 font-sans mt-1">
                Thank you! We will email you back shortly.
              </p>
            )}
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-[10px] text-neutral-500 font-sans">
              Copyright &copy; 2026 Casa Chitic Bălcescu. All rights reserved.
            </p>
            <p className="text-[10px] text-neutral-500 font-sans">
              System developed by Niran Sudharaka
            </p>
            {/* Specific Romanian Legal Warning */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[#A67C52] text-[10px] font-bold font-sans tracking-wide uppercase">
              <ShieldAlert size={12} className="shrink-0" />
              <span>Aceasta unitate de cazare nu este autorizata d.p.d.v PSI</span>
            </div>
          </div>

          {/* Terms & Privacy Links */}
          <div className="flex gap-4 text-[10px] font-sans text-neutral-500">
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-[#A67C52] transition-colors cursor-pointer">
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#A67C52] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A67C52] transition-colors">
              ANPC
            </a>
          </div>
        </div>
      </div>
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
}
