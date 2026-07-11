import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Mail, Phone, User, Check, ShieldCheck, ArrowRight, Printer, MessageSquare } from 'lucide-react';
import { Room, BookingInquiry } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  initialRoomId?: string;
}

export default function BookingModal({ isOpen, onClose, rooms, initialRoomId = '' }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [resNumber, setResNumber] = useState('');
  const [priceTotal, setPriceTotal] = useState(0);

  // Sync initial room selection
  useEffect(() => {
    if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
    } else if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [initialRoomId, rooms]);

  // Calculate total nights and price
  useEffect(() => {
    if (checkIn && checkOut && selectedRoomId) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      const room = rooms.find(r => r.id === selectedRoomId);
      if (room) {
        setPriceTotal(0 * diffDays);
      }
    } else {
      const room = rooms.find(r => r.id === selectedRoomId);
      if (room) {
        setPriceTotal(0);
      }
    }
  }, [checkIn, checkOut, selectedRoomId, rooms]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Generate simulated reference number
      const code = 'CCB-' + Math.floor(100000 + Math.random() * 900000);
      setResNumber(code);
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectedRoomObj = rooms.find(r => r.id === selectedRoomId);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          id="booking-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-neutral-50 rounded-none shadow-xl overflow-hidden border border-[#DED9D2] max-h-[90vh] flex flex-col z-10"
          id="booking-modal-content"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#DED9D2] bg-white flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-[#1A1A1A] font-medium tracking-tight">
                {step === 3 ? 'Reservation Secured' : 'Book Your Stay'}
              </h2>
              <p className="text-xs text-neutral-500 font-sans mt-0.5 tracking-wide">
                Casa Chitic Bălcescu • Brasov, Romania
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-none hover:bg-[#F5F2ED] text-neutral-400 hover:text-[#1A1A1A] transition-colors"
              aria-label="Close booking modal"
              id="booking-modal-close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Steps Indicator */}
          {step < 3 && (
            <div className="bg-[#F5F2ED] px-6 py-3 border-b border-[#DED9D2] flex items-center justify-between text-xs font-sans tracking-wider text-neutral-500 uppercase shrink-0">
              <span className={step === 1 ? 'text-[#A67C52] font-semibold' : 'text-neutral-400'}>
                1. Room & Dates
              </span>
              <ArrowRight size={12} className="text-neutral-300" />
              <span className={step === 2 ? 'text-[#A67C52] font-semibold' : 'text-neutral-400'}>
                2. Guest Details
              </span>
              <ArrowRight size={12} className="text-neutral-300" />
              <span className="text-neutral-300">
                3. Confirmation
              </span>
            </div>
          )}

          {/* Form / Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                {/* Select Room */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40]">
                    Select Preferred Room
                  </label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    required
                    className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] focus:border-transparent transition-all"
                    id="booking-select-room"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} ({room.type === 'deluxe' ? 'Deluxe' : 'Budget'}) 
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#A67C52]" /> Check-In Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                      id="booking-checkin"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#A67C52]" /> Check-Out Date
                    </label>
                    <input
                      type="date"
                      required
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                      id="booking-checkout"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                    <Users size={13} className="text-[#A67C52]" /> Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                    id="booking-guests"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>

                {/* Summary Panel */}
                {selectedRoomObj && (
                  <div className="bg-[#EBE7E0]/50 rounded-none p-4 border border-[#DED9D2] flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={selectedRoomObj.images[0]}
                        alt={selectedRoomObj.name}
                        className="w-16 h-16 rounded-none object-cover bg-[#EBE7E0] border border-[#DED9D2] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-[#1A1A1A] font-serif">{selectedRoomObj.name}</h4>
                        <p className="text-xs text-neutral-500 font-sans mt-0.5">
                          {selectedRoomObj.bed} • {selectedRoomObj.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#DED9D2]">
                      <p className="text-xs text-neutral-500 font-sans uppercase tracking-wider">Estimated Total</p>
                      <p className="text-lg font-serif font-bold text-[#A67C52]">
                        €{priceTotal}
                      </p>
                      <p className="text-[10px] text-neutral-400">VAT & Taxes Included</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-none flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                    id="booking-btn-step1-next"
                  >
                    Continue to Details <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                      <User size={13} className="text-[#A67C52]" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Nicolae Balcescu"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                      id="booking-fullname"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                        <Mail size={13} className="text-[#A67C52]" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                        id="booking-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                        <Phone size={13} className="text-[#A67C52]" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+40 700 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all"
                        id="booking-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Early arrival, extra pillows, cot for child, buffet breakfast details..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-[#DED9D2] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#A67C52] transition-all resize-none"
                      id="booking-notes"
                    />
                  </div>
                </div>

                {/* Summary panel for reference */}
                <div className="p-4 rounded-none border border-[#A67C52]/20 bg-[#A67C52]/5 text-xs text-[#1A1A1A] space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span>Summary of stay:</span>
                    
                  </div>
                  <p className="font-sans leading-relaxed">
                    Room: {selectedRoomObj?.name} • Guests: {guests} {guests === 1 ? 'Adult' : 'Guests'} <br />
                    Dates: {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'} to {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="text-neutral-500 hover:text-[#1A1A1A] text-sm font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer"
                    id="booking-btn-prev"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-none flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                    id="booking-btn-step2-next"
                  >
                    Send Reservation Inquiry <Check size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6 py-2">
                {/* Success Banner */}
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                    Your luxury stay in Brasov is requested!
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    We have received your reservation request. Our reception team will review and confirm availability within 15 minutes.
                  </p>
                </div>

                {/* Elegant Digital Voucher Receipt */}
                <div className="relative border border-[#DED9D2] bg-white rounded-none shadow-sm p-6 font-mono text-xs text-[#1A1A1A] divide-y divide-dashed divide-neutral-200 max-w-md mx-auto">
                  {/* Decorative ticket cutouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#F5F2ED] border-r border-[#DED9D2] -translate-y-1/2 z-10" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#F5F2ED] border-l border-[#DED9D2] -translate-y-1/2 z-10" />

                  {/* Voucher Header */}
                  <div className="pb-4 text-center space-y-1">
                    <p className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      CASA CHITIC BĂLCESCU
                    </p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Boutique Hotel • Brasov, RO
                    </p>
                    <div className="pt-2">
                      <span className="bg-[#EBE7E0] text-[#A67C52] px-2.5 py-1 rounded-none text-[10px] font-bold tracking-widest uppercase">
                        RESERVATION REQUESTED
                      </span>
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="py-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Reference:</span>
                      <span className="font-bold text-[#1A1A1A]">{resNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Guest Name:</span>
                      <span className="font-semibold text-[#1A1A1A]">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Room Selected:</span>
                      <span className="font-semibold text-[#1A1A1A]">{selectedRoomObj?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Total Guests:</span>
                      <span className="text-[#1A1A1A]">{guests} {guests === 1 ? 'Adult' : 'Guests'}</span>
                    </div>
                  </div>

                  {/* Dates block */}
                  <div className="py-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Check-In:</span>
                      <span className="text-[#1A1A1A]">
                        {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-sans tracking-wide text-[10px]">Check-Out:</span>
                      <span className="text-[#1A1A1A]">
                        {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                      </span>
                    </div>
                    
                  </div>

                  {/* Voucher Footer */}
                  <div className="pt-4 text-center space-y-2 font-sans">
                    <p className="text-[10px] text-neutral-400">
                      Address: Str. Nicolae Balcescu 13, Brasov, RO
                    </p>
                    <p className="text-[9px] text-neutral-400 italic">
                      Aceasta unitate de cazare nu este autorizata d.p.d.v PSI
                    </p>
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="border border-[#DED9D2] hover:bg-[#F5F2ED] text-[#1A1A1A] font-sans font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                    id="booking-btn-print"
                  >
                    <Printer size={14} /> Print Receipt
                  </button>
                  <a
                    href="https://wa.me/40731002138"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                    id="booking-btn-whatsapp"
                  >
                    <MessageSquare size={14} /> WhatsApp Support
                  </a>
                  <button
                    onClick={() => {
                      // Reset and close
                      setStep(1);
                      onClose();
                    }}
                    className="bg-[#A67C52] hover:bg-[#8E6A46] text-white font-sans font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-none flex items-center justify-center transition-all cursor-pointer"
                    id="booking-btn-done"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
