// src/components/TermsAndConditions.jsx
import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="container mx-auto px-4 py-12 text-[#002349]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
        Terms & Conditions
      </h1>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
        <div>
          <h2 className="font-bold uppercase mb-2">Use of Our Website</h2>
          <p>
            You are authorized to use www.keyfinder.com for your personal use
            and to share or print material for informational purposes only.
            However:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>
              You may not modify any content without our express written
              permission.
            </li>
            <li>
              You cannot use this website to breach copyright and intellectual
              property laws.
            </li>
            <li>
              Reproducing, republishing, or distributing any content without
              prior consent is strictly prohibited.
            </li>
          </ul>
          <p className="mt-2">
            While we strive to provide accurate and updated property listings
            and information, we do not guarantee the accuracy or availability.
            Your use of the site is strictly at your own risk.
          </p>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">Visitor Conduct</h2>
          <p>By using this site, you agree not to:</p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>
              Post or transmit any defamatory, offensive, obscene, or illegal
              content.
            </li>
            <li>Send spam or unauthorized promotional material.</li>
            <li>Upload viruses or any malicious code.</li>
          </ul>
          <p className="mt-2">
            Any submitted data is treated as non-confidential and may be reused
            by us unless otherwise agreed in writing.
          </p>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">
            Property Appointments & Reservations
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Browse properties by type, area, and budget.</li>
            <li>Schedule appointments with selected units.</li>
            <li>Choose an available broker for a specific time slot.</li>
          </ul>
          <p className="mt-4">
            After your appointment, the broker will log the outcome:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>If no decision is made, the unit is marked as on hold.</li>
            <li>
              If the buyer proceeds, payment is collected and marked as sold.
            </li>
            <li>
              If the buyer fails to complete payment in time, the hold expires,
              the unit becomes available again, and payment is non-refundable.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">Website Availability</h2>
          <p>
            We make efforts to ensure our platform is accessible 24/7, but are
            not responsible for downtime or technical errors beyond our control.
          </p>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">External Links</h2>
          <p>
            External links provided for user convenience are not endorsed or
            guaranteed. Users should review those sites’ terms and policies
            independently.
          </p>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">Limitation of Liability</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              KEYFINDER is not liable for any direct/indirect damages or delays.
            </li>
            <li>
              We are not responsible for service errors or third-party service
              failures.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">Governing Law</h2>
          <p>
            These terms are governed under the applicable local laws. Disputes
            shall be subject to the exclusive jurisdiction of the courts.
          </p>
        </div>

        <div>
          <h2 className="font-bold uppercase mb-2">Contacting Us</h2>
          <p>
            If you have any questions regarding these terms, contact us:
            <br />
            <span className="block mt-1">Email: ahmedakhatab7@gmail.com</span>
            <span>Phone: 01127922987</span>
          </p>
        </div>
      </div>
    </section>
  );
}
