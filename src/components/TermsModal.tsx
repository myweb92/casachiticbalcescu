import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit3, Save, Check } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const { content, updateContent, isAdminLoggedIn, setIsAdminDrawerOpen } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const currentTermsText = content['terms.custom_text'];

  const handleStartEdit = () => {
    setCustomText(currentTermsText || DEFAULT_TERMS);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent('terms.custom_text', customText);
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
              <h2 className="text-white font-serif text-2xl">Terms &amp; Conditions</h2>
              {isAdminLoggedIn && !isEditing && (
                <button
                  onClick={handleStartEdit}
                  className="px-3 py-1 bg-[#A67C52] hover:bg-[#8E6A46] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 size={13} /> Edit Terms
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
                  ✏️ <strong>Admin Edit Mode:</strong> Update the complete Terms &amp; Conditions text below. Changes apply live immediately across the site.
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
                    <Save size={14} /> Save Terms &amp; Conditions
                  </button>
                </div>
              </div>
            ) : currentTermsText ? (
              <div className="whitespace-pre-wrap font-sans space-y-4 text-sm text-neutral-700">
                {currentTermsText}
              </div>
            ) : (
              <>
                <p className="font-bold">Last updated: 24 JULY 2026</p>

                <p>
                  These Terms and Conditions (“Terms”) govern the use of https://casachiticbalcescu.ro/ (the “Website”) and the services provided by CCB HOTELS SRL at Casa Chitic Bălcescu, Str. Nicolae Bălcescu 13, Brașov. Accessing the Website, making a reservation or using our services constitutes full and unconditional acceptance of these Terms.
                </p>

                <p>
                  <strong>Operator:</strong> CCB HOTELS SRL, Address: Comuna Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County, VAT RO39174576, Trade Registry: J2018000815087 (new format), e-mail:{' '}
                  <a href="mailto:office@casachiticbalcescu.ro" className="text-[#A67C52] hover:underline">office@casachiticbalcescu.ro</a>, phone: +40 731 002 138.
                </p>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Definitions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Operator/We</strong> – CCB HOTELS SRL.</li>
                    <li><strong>Client/Guest</strong> – any natural/legal person using the Website, making reservations or benefiting from services (accommodation, restaurant, events).</li>
                    <li><strong>Services</strong> – accommodation, F&amp;B (restaurant/bar), events and related services (Wi-Fi, luggage storage etc.).</li>
                    <li><strong>Reservation</strong> – firm intention to purchase Services for specified dates/conditions.</li>
                    <li><strong>PMS/booking engine</strong> – system managing reservations and payments.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Scope</h3>
                  <p>These Terms apply to legal relationships regarding: Website use; reservations (Website, phone/e-mail, front desk, OTAs); accommodation services; events.</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Website use</h3>
                  <p>The Website is provided “as is”. Display errors or delayed updates may occur; we reserve the right to change content, rates and availability without notice, without affecting already-confirmed reservations. Unlawful use is prohibited (incl. unauthorized access, mass scraping, code injection). Website content is protected by IP laws.</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Reservations. Contract formation</h3>
                  <p>Reservations may be made via Website; phone/e-mail; front desk; third-party platforms (OTAs). The contract is concluded upon confirmation (automatic or manual). Some rates may require guarantee (card pre-authorization/deposit) or full prepayment. The Client must check reservation details (name, stay dates, room type, persons, cancellation). For OTA bookings, the platform’s commercial terms may complement these Terms; in case of discrepancy, the conditions in the stay confirmation prevail.</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Rates, taxes &amp; payments</h3>
                  <p>Rates are shown in the indicated currency and include VAT as per law; other specific charges (e.g., local tourist tax) may be payable at the front desk. Accepted payment methods are indicated on the Website/confirmation. Card data are processed by authorized processors in line with PCI DSS; the Operator does not store full card data. In case of non-payment, the Operator may withhold/offset guaranteed amounts and refuse services until settlement.</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Cancellation, modification, no-show</h3>
                  <p>Each offer/rate has its own rules (deadline, penalties).</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Non-refundable:</strong> advance payments are not returned, except as provided.</li>
                    <li><strong>No-show:</strong> penalty per rate (usually first night or full stay, as applicable).</li>
                    <li><strong>Groups/events:</strong> special conditions may apply (deposit, milestones, extended deadlines).</li>
                  </ul>
                  <p className="mt-2 text-xs">Consumer note: the right of withdrawal under GEO 34/2014 does not apply to accommodation, transport, car rental, catering or leisure services for a specific date/period (Art. 16 lit. l).</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Check-in/Check-out. House rules</h3>
                  <p>Check-in/out during communicated hours; early/late subject to availability (possible fees). A valid ID must be presented at check-in; data are processed per hospitality rules. Proper conduct is required: no damage, disturbance (noise), smoking in non-smoking rooms, or illegal substances. We may evict guests breaching rules, without refund for consumed services.</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Contact</h3>
                  <p>
                    CCB HOTELS SRL • Comuna Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County<br />
                    E-mail: <a href="mailto:office@casachiticbalcescu.ro" className="text-[#A67C52] hover:underline">office@casachiticbalcescu.ro</a> | Tel.: +40 731 002 138
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const DEFAULT_TERMS = `Terms and Conditions - Casa Chitic Bălcescu

Last updated: 24 JULY 2026

These Terms and Conditions (“Terms”) govern the use of https://casachiticbalcescu.ro/ (the “Website”) and the services provided by CCB HOTELS SRL at Casa Chitic Bălcescu, Str. Nicolae Bălcescu 13, Brașov. Accessing the Website, making a reservation or using our services constitutes full and unconditional acceptance of these Terms.

Operator: CCB HOTELS SRL, Address: Comuna Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County, VAT RO39174576, Trade Registry: J2018000815087, e-mail: office@casachiticbalcescu.ro, phone: +40 731 002 138.

1. Definitions
- Operator/We – CCB HOTELS SRL.
- Client/Guest – any natural/legal person using the Website, making reservations or benefiting from services.
- Services – accommodation, F&B (restaurant/bar), events and related services.

2. Scope
These Terms apply to legal relationships regarding Website use, reservations, accommodation, and events.

3. Website use
The Website is provided “as is”. Content, rates and availability may be modified without notice.

4. Reservations & Payments
Reservations are confirmed upon manual or automatic processing. Rates include applicable VAT.

5. Check-in & House Rules
Standard check-in from 14:00. Guests must provide valid government-issued ID upon arrival.

6. Contact Details
CCB HOTELS SRL • Str. Nicolae Bălcescu 13, Brașov, Romania
Email: office@casachiticbalcescu.ro | Tel: +40 731 002 138`;
