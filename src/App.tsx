import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Star, Heart, Calendar, MapPin, ChevronDown, Sparkles, Bed, Users, Mail, Phone, Info, Globe, ShieldAlert } from 'lucide-react';
import { Room } from './types';
import Navbar from './components/Navbar';
import RoomCard from './components/RoomCard';
import ExperienceGrid from './components/ExperienceGrid';
import HistorySection from './components/HistorySection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Logo from './components/Logo';

// High-quality, curated room assets
const ROOMS: Room[] = [
  {
    id: "budget-twin",
    name: "Twin Budget Room",
    type: "budget",
    tag: "Best Seller",
    tagColor: "bg-[#A67C52]",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "2 Single Beds",
    images: [
      "https://h-img3.cloudbeds.com/uploads/184869/xt4b1539~~655e097ad53f4.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/xt4b1557~~655e0989a1e7b.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/dscf1886~~655e098e310f0.jpg"
    ],
    description: "This room is especially designed for two travelers that want to share the same room but not the same bed. This room comes with two large single beds, as comfortable as a double bed.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  },
  {
    id: "budget-triple",
    name: "Triple Budget Room",
    type: "budget",
    tag: "Family",
    tagColor: "bg-emerald-700",
    size: "25 m²",
    capacity: "3 Adults",
    bed: "1 King, 1 Single",
    images: [
      "https://h-img3.cloudbeds.com/uploads/184869/xt4b1450~~655e0a3c71e6d.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/xt4b1494~~655e0a4b00c4e.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/dscf1872~~655e0a5893487.jpg"
    ],
    description: "This Triple Economy Room is especially designed for three travelers that want to share the same room. This room comes with one large king size bed and a single large size bed.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  },
  {
    id: "budget-double",
    name: "Double Budget Room",
    type: "budget",
    tag: "Popular",
    tagColor: "bg-[#A67C52]",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "1 King Size Bed",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/xt4b0816~~655e09cae0309.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/dscf0622~~655e09daeb8d0.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/xt4b0814~~655e09e262335.jpg"
    ],
    description: "This Double Economy Room is especially designed for two travelers that want to share the same room. This room comes with one large king size.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  },
  {
    id: "deluxe-single",
    name: "Deluxe Single Room",
    type: "deluxe",
    tag: "Solo",
    tagColor: "bg-[#1A1A1A]",
    size: "20 m²",
    capacity: "1 Adult",
    bed: "1 Single Bed",
    images: [
      "https://h-img1.cloudbeds.com/uploads/184869/xt4b0970~~655e0b55aad9b.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/dscf0698~~655e0b6b2e8f7.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/xt4b0964~~655e0b6fb7247.jpg"
    ],
    description: "Especially Designed for single travelers regardless if is for business or pleasure.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  },
  {
    id: "deluxe-twin",
    name: "Deluxe Twin Room",
    type: "deluxe",
    tag: "Luxury",
    tagColor: "bg-[#1A1A1A]",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "2 Single Beds",
    images: [
      "https://h-img3.cloudbeds.com/uploads/184869/xt4b0913~~655e0afe643e0.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/xt4b0925~~655e0b0bc40d3.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/dscf0631~~655e0b0e37163.jpg"
    ],
    description: "Especially designed for the travelers that want the comfort of a double room with two separate beds.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  },
  {
    id: "deluxe-double",
    name: "Deluxe Double Room",
    type: "deluxe",
    tag: "Luxury",
    tagColor: "bg-[#1A1A1A]",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "1 Large Double Bed",
    images: [
      "https://h-img3.cloudbeds.com/uploads/184869/xt4b1413~~655e0a91eab3c.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/xt4b1413~~655e0ab098d80.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/dscf1845~~655e0ab857cdf.jpg"
    ],
    description: "Especially designed rooms.",
    amenities: [
      "Free WiFi",
      "Flat-screen TV",
      "Air conditioning",
      "Soundproofing"
    ]
  }
];

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [roomFilter, setRoomFilter] = useState<'all' | 'deluxe' | 'budget'>('all');

  const openBookingModal = (roomId: string = '') => {
    setSelectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  const filteredRooms = ROOMS.filter(room => {
    if (roomFilter === 'all') return true;
    return room.type === roomFilter;
  });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] selection:bg-[#A67C52]/30 selection:text-[#1A1A1A]">
      {/* Navigation */}
      <Navbar onOpenBooking={() => openBookingModal('')} />

      {/* --- HERO SECTION --- */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white"
        id="home"
      >
        {/* Background Parallax-like Image of Boutique Exterior */}
        <div className="absolute inset-0 z-0">
           <img
            src="/header.jpeg"
            alt="Casa Chitic Balcescu boutique hotel exterior"
            className="w-full h-full object-cover scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          {/* Rich Dark Gradients for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/20 to-neutral-950/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 flex flex-col items-center">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 max-w-xs"
            id="hero-logo-container"
          >
            <Logo showText={true} variant="white" className="w-24 h-26 md:w-28 md:h-30" />
          </motion.div>

          {/* Slogan & Headlines */}
          <div className="space-y-4 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs md:text-sm font-sans font-bold tracking-[0.45em] text-[#A67C52] uppercase"
            >
              Historic Charm • Modern Comfort
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight text-white"
            >
              You Stay in the Heart of Brașov.
            </motion.h2>
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a
              href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-none transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block text-center"
              id="hero-book-now-btn"
            >
              Book Your Stay
            </a>
            <button
              onClick={() => handleScrollTo('welcome')}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-none transition-all cursor-pointer"
              id="hero-explore-btn"
            >
              Explore Hotel
            </button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.button
            onClick={() => handleScrollTo('welcome')}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-300"
            aria-label="Scroll down"
            id="hero-scroll-indicator"
          >
            <span className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown size={14} />
          </motion.button>
        </div>
      </section>

      {/* --- WELCOME / ABOUT SECTION --- */}
      <section className="py-20 md:py-28 bg-[#F5F2ED] relative overflow-hidden" id="welcome">
        {/* Subtle decorative quote background */}
        <div className="absolute top-10 right-10 text-neutral-200/20 font-serif text-9xl font-bold select-none pointer-events-none">
          C
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Layout: Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-[#A67C52] uppercase block">
                  Welcome to Casa Chitic
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
                  Timeless Elegance in the Citadel Walls
                </h2>
                <div className="w-16 h-[1px] bg-[#A67C52] mt-3" />
              </div>

              <div className="space-y-4 text-sm text-neutral-600 font-sans leading-relaxed text-justify">
                <p>
                  Perfected nestled at{' '}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Strada+Nicolae+Bălcescu+13,+Brașov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1A] font-semibold hover:text-[#A67C52] transition-colors"
                  >
                    Strada Nicolae Bălcescu 13
                  </a>
                  , Casa Chitic Bălcescu invites you to experience a unique synthesis of Romanian history and contemporary luxury. Built in <strong className="text-[#A67C52] font-semibold font-serif">1902</strong>, this remarkable architectural monument has been completely restored with extreme care, offering you an intimate home in the historic core of Brașov.
                </p>
                <p>
                  Upon crossing our threshold, you will discover majestic, vaulted ceilings and bespoke, noble furniture hand-carved entirely from <strong className="text-[#1A1A1A] font-semibold">solid wood</strong>. This organic warmth is beautifully complemented by premium mattresses, luxurious linens, and pristine modern amenities that elevate your comfort.
                </p>
                <p>
                  Whether you are visiting Brașov to explore the spectacular gothic peaks of the <strong className="text-[#1A1A1A] font-semibold">Black Church</strong> (a 3-minute stroll), relax near the vibrant terrace cafes of <strong className="text-[#1A1A1A] font-semibold">Council Square</strong>, or hike the lush forested crown of Mount Tâmpa, Casa Chitic stands as your ultimate, peaceful retreat.
                </p>
              </div>

              {/* Inner quick facts row */}
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#DED9D2] text-xs font-sans">
                <div>
                  <h4 className="font-serif font-bold text-[#1A1A1A]">Perfect Location</h4>
                  <p className="text-neutral-500 mt-0.5">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Strada+Nicolae+Bălcescu+13,+Brașov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#A67C52] transition-colors"
                    >
                      Strada Nicolae Bălcescu 13
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Layout: Large desk room corner photo */}
            <div className="lg:col-span-6 relative">
              {/* Outer decorative borders */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-[#A67C52]" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-[#A67C52]" />
              
              <div className="relative rounded-none overflow-hidden aspect-4/3 bg-neutral-100 border border-[#DED9D2] shadow-sm">
                <img
                  src="/galary.jpg"
                  alt="Casa Chitic Balcescu"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR ROOMS SECTION --- */}
      <section className="py-20 bg-[#EBE7E0] border-y border-[#DED9D2]" id="rooms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-[#A67C52] uppercase block">
                The Collections
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
                Our Elegant Guest Rooms
              </h2>
              <p className="text-xs text-neutral-500 font-sans max-w-md">
                Select from our opulent Deluxe series or our highly comfortable, best-selling Budget collection.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex bg-[#F5F2ED] rounded-none p-1 border border-[#DED9D2] self-start shrink-0">
              <button
                onClick={() => setRoomFilter('all')}
                className={`px-4 py-2 text-xs font-sans font-semibold tracking-wider uppercase rounded-none transition-all cursor-pointer ${
                  roomFilter === 'all' ? 'bg-[#A67C52] text-white shadow-sm' : 'text-[#5A5A40] hover:text-[#1A1A1A]'
                }`}
                id="filter-all-btn"
              >
                All Rooms
              </button>
              <button
                onClick={() => setRoomFilter('deluxe')}
                className={`px-4 py-2 text-xs font-sans font-semibold tracking-wider uppercase rounded-none transition-all cursor-pointer ${
                  roomFilter === 'deluxe' ? 'bg-[#A67C52] text-white shadow-sm' : 'text-[#5A5A40] hover:text-[#1A1A1A]'
                }`}
                id="filter-deluxe-btn"
              >
                Deluxe
              </button>
              <button
                onClick={() => setRoomFilter('budget')}
                className={`px-4 py-2 text-xs font-sans font-semibold tracking-wider uppercase rounded-none transition-all cursor-pointer ${
                  roomFilter === 'budget' ? 'bg-[#A67C52] text-white shadow-sm' : 'text-[#5A5A40] hover:text-[#1A1A1A]'
                }`}
                id="filter-budget-btn"
              >
                Budget
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={(id) => openBookingModal(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCES / WHAT WE OFFER SECTION --- */}
      <section className="py-20 md:py-28 bg-[#F5F2ED]" id="experiences">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-[#A67C52] uppercase block">
              Boutique Services
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
              Curated Guest Experiences
            </h2>
            <div className="w-12 h-[1px] bg-[#A67C52] mx-auto mt-2" />
            <p className="text-xs text-neutral-500 font-sans">
              Enjoy tailored amenities and historic hotel services designed to ensure your stay in Brașov is seamless and memorable.
            </p>
          </div>

          {/* Icons Grid */}
          <ExperienceGrid />
        </div>
      </section>

      {/* --- HISTORY SECTION --- */}
      <section className="py-20 md:py-28 bg-[#EBE7E0] border-y border-[#DED9D2]" id="history">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HistorySection />
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="py-20 md:py-28 bg-[#F5F2ED]" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-[#A67C52] uppercase block">
              Guest Feedback
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
              Explore Reviews
            </h2>
            <div className="w-12 h-[1px] bg-[#A67C52] mx-auto mt-2" />
            <p className="text-xs text-neutral-500 font-sans">
              Read true experiences from guests who have immersed themselves in the historic luxury of our old town boutique property.
            </p>
          </div>

          {/* Testimonial slider */}
          <ReviewsSection />
        </div>
      </section>

      {/* --- CONTACT / FOOTER --- */}
      <Footer />

      {/* --- BOOKING RESERVATION ENGINE MODAL --- */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        rooms={ROOMS}
        initialRoomId={selectedRoomId}
      />
    </div>
  );
}
