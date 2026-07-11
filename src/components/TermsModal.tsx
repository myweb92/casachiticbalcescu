import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
            <h2 className="text-white font-serif text-2xl">Terms & Conditions</h2>
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
            <p className="font-bold">Last updated: 5 November 2025</p>

            <p>
              These Terms and Conditions (“Terms”) govern the use of https://casachiticbalcescu.ro/ (the
              “Website”) and the services provided by CCB HOTELS SRL at Casa Chitic Bălcescu
              (boutique hotel & restaurant, Str. Nicolae Bălcescu 13, Brașov). Accessing the Website, making
              a reservation or using our services constitutes full and unconditional acceptance of these Terms.
            </p>

            <p>
              <strong>Operator:</strong> CCB HOTELS SRL, Address: Comuna Cristian, Sat Cristian, DN 73, Brașov County,
              VAT RO39174576, Trade Registry: J2018000815087 (new format), e-mail:{' '}
              <a href="mailto:office@casachiticbalcescu.ro" className="text-[#A67C52] hover:underline">office@casachiticbalcescu.ro</a>, phone: +40 731 002 138.
            </p>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Definitions</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Operator/We</strong> – CCB HOTELS SRL.</li>
                <li><strong>Client/Guest</strong> – any natural/legal person using the Website, making reservations or benefiting from services (accommodation, restaurant, events).</li>
                <li><strong>Services</strong> – accommodation, F&B (restaurant/bar), events and related services (Wi-Fi, luggage storage etc.).</li>
                <li><strong>Reservation</strong> – firm intention to purchase Services for specified dates/conditions.</li>
                <li><strong>PMS/booking engine</strong> – system managing reservations and payments.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Scope</h3>
              <p>These Terms apply to legal relationships regarding: Website use; reservations (Website, phone/e-mail, front desk, OTAs); accommodation/restaurant services; events.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Website use</h3>
              <p>The Website is provided “as is”. Display errors or delayed updates may occur; we reserve the right to change content, rates and availability without notice, without affecting already-confirmed reservations. Unlawful use is prohibited (incl. unauthorised access, mass scraping, code injection). Website content is protected by IP laws.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Reservations. Contract formation</h3>
              <p>Reservations may be made via Website; phone/e-mail; front desk; third-party platforms (OTAs). The contract is concluded upon confirmation (automatic or manual). Some rates may require guarantee (card pre-authorisation/deposit) or full prepayment. The Client must check reservation details (name, stay dates, room type, persons, cancellation). For OTA bookings, the platform’s commercial terms may complement these Terms; in case of discrepancy, the conditions in the stay confirmation prevail.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Rates, taxes & payments</h3>
              <p>Rates are shown in the indicated currency and include VAT as per law; other specific charges (e.g., local tourist tax) may be payable at the front desk. Accepted payment methods are indicated on the Website/confirmation. Card data are processed by authorised processors in line with PCI DSS; the Operator does not store full card data. In case of non-payment, the Operator may withhold/offset guaranteed amounts and refuse services until settlement.</p>
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
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Smoking:</strong> only in designated areas; smoking in rooms may incur cleaning fees.</li>
                <li><strong>Pets:</strong> subject to the unit’s policy published on the Website/confirmation; restrictions/fees may apply.</li>
                <li><strong>Damages:</strong> the Client is liable; the Operator may charge the guarantee/pre-authorisation for proven damages.</li>
                <li><strong>Lost & found:</strong> items kept for a reasonable period; return at Client’s expense.</li>
                <li><strong>Parking (if available):</strong> limited spots; may be unsecured/unattended; the Operator is not liable for items left in vehicles.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Restaurant. Allergens</h3>
              <p>Table reservations are confirmed subject to availability; delays may lead to reallocation. For groups/events, a deposit and preset menu may be required. The Client must inform staff of any allergies before ordering; reasonable efforts are made, but cross-contamination risk cannot be fully excluded in shared kitchen environments.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Events (rooms, catering)</h3>
              <p>Specific conditions (room setup, AV, schedule, catering, noise limits, special permits) are agreed by dedicated offer/contract. Cancellation/modification follows offer clauses (milestones, penalties). The Client ensures compliance with safety/fire rules and obtains any permits required by the nature of the event.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Guest Wi-Fi – acceptable use</h3>
              <p>Wi-Fi access may be conditioned by accepting captive-portal terms. Unlawful use is prohibited (copyright violations, malware distribution, unauthorised access). For security/audit, technical metadata (MAC, assigned IP, session time) may be collected per the Privacy Policy.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">CCTV</h3>
              <p>Common areas may be monitored for security (legitimate interest). Areas are signposted; retention/access limits follow the Privacy Policy.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Force majeure. Overbooking/Relocation</h3>
              <p>No party is liable for non-performance caused by force majeure. In exceptional overbooking or unforeseen unavailability, we may offer relocation to a similar category property or refund amounts for unprovided services, as per law.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Liability</h3>
              <p>We act in good faith to perform obligations. To the extent permitted by law, liability for foreseeable and proven damages is limited to the value of services reserved for the stay/event concerned (excluding bodily injury, wilful misconduct or gross negligence). We are not liable for: (i) interruptions/errors in third-party services (utilities, payments, OTAs); (ii) indirect losses (loss of work, opportunity, profit).</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Data protection</h3>
              <p>Processing takes place under the Privacy Policy. Data subject rights (access, rectification, erasure, restriction, portability, objection) may be exercised at office@casachiticbalcescu.ro.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Intellectual property</h3>
              <p>Website materials (texts, photos, logos, visual elements) are owned by the Operator or partners and protected by law. A limited, non-exclusive, revocable licence is granted for personal, non-commercial access. Any reproduction/distribution requires written consent.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Third-party links</h3>
              <p>The Website may contain links to third parties (OTAs, maps, video, social media). We do not control their content or policies; access at your own risk.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Complaints. ADR/ODR</h3>
              <p>Service-related complaints may be submitted at the front desk or in writing to office@casachiticbalcescu.ro; we respond within legal deadlines. For consumer disputes, ADR/ODR mechanisms may be used (EU Online Dispute Resolution platform) without affecting access to courts.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Governing law & jurisdiction</h3>
              <p>These Terms are governed by Romanian law. Disputes are settled amicably; failing that, by competent Romanian courts, as provided by law.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Changes to the Terms</h3>
              <p>We may update the Terms for legal/technical/operational reasons. The updated version is published on the Website and applies from publication. Already-confirmed reservations remain governed by conditions applicable at confirmation unless otherwise agreed.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Final provisions</h3>
              <p>Invalidity of any clause does not affect the validity of the rest; the invalid clause is replaced by the applicable legal provision. Formal communications use the contact details provided. The Client must keep their details up to date.</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-2 font-bold">Contact</h3>
              <p>
                CCB HOTELS SRL • Comuna Cristian, Sat Cristian, DN 73, Brașov County<br />
                E-mail: <a href="mailto:office@casachiticbalcescu.ro" className="text-[#A67C52] hover:underline">office@casachiticbalcescu.ro</a> | Tel.: +40 731 002 138
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
