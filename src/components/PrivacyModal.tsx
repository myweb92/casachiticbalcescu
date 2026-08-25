import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit3, Save, Check } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const { content, updateContent, isAdminLoggedIn } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const currentPrivacyText = content['privacy.custom_text'];

  const handleStartEdit = () => {
    setCustomText(currentPrivacyText || DEFAULT_PRIVACY);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent('privacy.custom_text', customText);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
            <div className="flex items-center gap-3">
              <h2 className="text-white font-serif text-2xl">Privacy Policy</h2>
              {isAdminLoggedIn && !isEditing && (
                <button
                  onClick={handleStartEdit}
                  className="px-3 py-1 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 size={13} /> Edit Privacy Policy
                </button>
              )}
              {saved && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check size={14} /> Saved!
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto bg-[#F9F8F6] text-sm text-neutral-700 font-sans leading-relaxed space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded">
                  ✏️ <strong>Admin Edit Mode:</strong> Update the complete Privacy Policy text below. Changes apply live immediately across the site.
                </div>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full h-96 p-4 text-xs font-mono bg-white border border-neutral-300 rounded focus:border-[#A67C52] focus:outline-none"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow"
                  >
                    <Save size={14} /> Save Privacy Policy
                  </button>
                </div>
              </div>
            ) : currentPrivacyText ? (
              <div className="whitespace-pre-wrap font-sans space-y-4 text-sm text-neutral-700">
                {currentPrivacyText}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const DEFAULT_PRIVACY = `Privacy Policy & Guest Data Notice - Casa Chitic Bălcescu

1. SMS and Text Messaging Policy
We use a guest messaging platform to communicate with you regarding your stay. By providing your phone number during the booking process, you consent to receive text messages from the property.
- Purpose: Text messaging may be used to send check-in instructions, access information, room readiness updates, and respond to stay requests.
- Opt-Out: Reply STOP to any message at any time to unsubscribe.
- Privacy of Mobile Data: No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.

2. Data Protection & Rights
Processing takes place under applicable EU and Romanian hospitality data protection laws. Data subject rights (access, rectification, erasure, restriction) may be exercised by contacting office@casachiticbalcescu.ro.

3. CCTV Security
Common property areas are monitored for security. Camera footage is retained per statutory regulations.

4. Guest Wi-Fi Policy
Technical metadata (MAC address, IP, session duration) may be processed for security and network stability. Unlawful use is strictly prohibited.`;
