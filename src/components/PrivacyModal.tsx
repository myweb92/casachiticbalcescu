import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 9999 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#1A1A1A] p-6 flex justify-between items-center shrink-0">
            <h2 className="text-white font-serif text-2xl">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto bg-[#F9F8F6] text-sm text-neutral-700 font-sans leading-relaxed space-y-6">
            
            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">SMS and Text Messaging Policy</h3>
              <p>We use a guest messaging platform to communicate with you regarding your stay. By providing your phone number during the booking process, you consent to receive text messages from the property.</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Purpose:</strong> Text messaging may be used to send check-in instructions, access information, room readiness updates, and to respond to your requests during your stay.</li>
                <li><strong>Opt-Out:</strong> You may opt out of receiving text messages at any time by replying STOP to any message you receive. You will receive a final confirmation message, after which no further SMS messages will be sent.</li>
                <li><strong>Help:</strong> If you experience issues or need assistance, you may reply HELP or contact the front desk directly.</li>
                <li><strong>Privacy of Mobile Data:</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging opt-in data and consent will not be shared with any third parties.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Data protection</h3>
              <p>Processing takes place under the Privacy Policy. Data subject rights (access, rectification, erasure, restriction, portability, objection) may be exercised at office@casachiticbalcescu.ro.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">CCTV</h3>
              <p>Common areas may be monitored for security (legitimate interest). Areas are signposted; retention/access limits follow the Privacy Policy.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Guest Wi-Fi – acceptable use</h3>
              <p>Wi-Fi access may be conditioned by accepting captive-portal terms. Unlawful use is prohibited (copyright violations, malware distribution, unauthorised access). For security/audit, technical metadata (MAC, assigned IP, session time) may be collected per the Privacy Policy.</p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
