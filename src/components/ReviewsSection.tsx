import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Review } from '../types';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: 'rev-1',
      author: 'Nicki',
      rating: 5,
      source: 'Booking.com',
      date: 'June 2025',
      content: 'This boutique hotel is an absolute gem in Brasov! The historic building from 1902 has been beautifully restored, and the solid wood furniture gives the rooms an incredibly luxurious, authentic feel. The staff went above and beyond to accommodate us. Location is perfect—just steps away from the Black Church and Council Square.',
      avatarLetter: 'N',
    },
    {
      id: 'rev-2',
      author: 'Elena Radu',
      rating: 5,
      source: 'Booking.com',
      date: 'May 2025',
      content: 'Deosebit! Totul a fost la superlativ. O clădire istorică restaurată cu extrem de mult bun gust. Mobilierul din lemn masiv și lenjeria impecabilă îți oferă un confort deosebit. Personalul este extrem de amabil, iar micul dejun bufet este proaspăt și variat.',
      avatarLetter: 'E',
    },
    {
      id: 'rev-3',
      author: 'Thomas G.',
      rating: 5,
      source: 'Google Reviews',
      date: 'April 2025',
      content: 'Exceptional boutique hotel in the old town. Quiet, incredibly clean, and full of character. The multilingual reception team was very helpful with reservations and recommendations. Having private parking in this area of Brasov is a massive plus. 10/10.',
      avatarLetter: 'T',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const activeReview = reviews[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto" id="reviews-carousel-wrapper">
      {/* Decorative quote mark */}
      <div className="absolute -top-10 -left-6 md:-left-12 text-[#A67C52]/5 select-none pointer-events-none">
        <Quote size={120} className="fill-current" />
      </div>

      <div className="relative bg-white border border-[#DED9D2] p-6 md:p-10 z-10 overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Stars & Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#A67C52]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-current" />
                ))}
                <span className="ml-2 text-xs font-sans font-semibold text-neutral-800">5.0 / 5.0 Rating</span>
              </div>
              <span className="bg-[#EBE7E0] text-[#A67C52] border border-[#DED9D2] text-[9px] font-sans font-bold tracking-widest uppercase px-3 py-1">
                Verified Stay
              </span>
            </div>

            {/* Testimonial Quote Content */}
            <p className="font-serif text-base md:text-lg text-[#1A1A1A] leading-relaxed italic">
              "{activeReview.content}"
            </p>

            {/* Author details */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#DED9D2]">
              {/* Initials Avatar */}
              <div className="w-11 h-11 rounded-full bg-[#EBE7E0] border border-[#DED9D2] flex items-center justify-center font-serif text-base font-bold text-[#A67C52]">
                {activeReview.avatarLetter}
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#1A1A1A]">{activeReview.author}</h4>
                <p className="text-xs text-neutral-600 font-sans mt-0.5">
                  Stayed {activeReview.date} • via <span className="font-bold text-[#A67C52]">{activeReview.source}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Controls */}
        <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 border border-[#DED9D2] hover:bg-[#EBE7E0] text-[#1A1A1A] transition-colors cursor-pointer"
            aria-label="Previous testimonial"
            id="reviews-prev-arrow"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 border border-[#DED9D2] hover:bg-[#EBE7E0] text-[#1A1A1A] transition-colors cursor-pointer"
            aria-label="Next testimonial"
            id="reviews-next-arrow"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Subtle Carousel Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 transition-all duration-300 ${
              currentIndex === idx ? 'bg-[#A67C52] w-5' : 'bg-[#DED9D2] hover:bg-neutral-400'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
            id={`reviews-dot-${idx}`}
          />
        ))}
      </div>

      {/* External Review Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Casa+Chitic+Bălcescu+13,+Brașov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#DED9D2] hover:bg-[#EBE7E0] transition-colors font-sans text-xs font-bold tracking-widest text-[#1A1A1A] uppercase w-full sm:w-auto"
        >
          Google Reviews
        </a>
      </div>
    </div>
  );
}
