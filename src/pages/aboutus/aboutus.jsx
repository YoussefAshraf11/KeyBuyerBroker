// src/components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <section className="container mx-auto px-4 py-12 text-[#002349]">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8">
        About Us: All You Need To Know About KeyFinder
      </h2>

      {/* Reg & Tagline */}
      <div className="text-sm sm:text-base mb-8">
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Commercial Registration No:</span>
          </p>
          <p>
            <span className="font-semibold">Tax Card:</span>
          </p>
          <p className="mt-2 font-semibold text-center">
            Smart Solutions for Real Estate Brokerage
          </p>
        </div>
      </div>

      {/* Intro paragraphs */}
      <div className="space-y-4">
        <p>
          Welcome to KeyFinder, your trusted partner in finding and securing the
          perfect property. Our platform is dedicated to centralizing all real
          estate development projects across our region — giving buyers
          exclusive access through a seamless, broker-supported experience.
        </p>
        <p>
          At KeyFinder, we don’t just list homes. We monopolize the selling
          rights of all current real estate projects under our management for a
          limited time, offering our clients exclusive access to a wide range of
          properties. From luxurious villas to cozy apartments and chalets, our
          categorized system allows buyers to search based on property type,
          area, and budget — all in just a few clicks.
        </p>
        <p>
          Founded with a vision to modernize real estate brokerage through
          technology, transparency, and professionalism, KEYFINDER empowers
          buyers to make informed decisions while our experienced brokers guide
          them every step of the way — both online and on-site.
        </p>
      </div>

      {/* Two-column details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">What is KEYFINDER?</h3>
            <p>
              KEYFINDER is a real estate brokerage company and digital platform
              that centralizes exclusive listings of all real estate projects in
              your region. We act as the exclusive broker for these listings for
              a limited duration and facilitate end-to-end property
              transactions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How do I search for properties on KEYFINDER?
            </h3>
            <p>You can browse by:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Type: Chalet, Apartment, Stand-alone Villa, Twin House</li>
              <li>Area: Less than 100 m², 100–150 m², etc.</li>
              <li>Budget: Categorized by price range</li>
            </ul>
            <p className="mt-2">
              Once filtered, you can view property details and schedule
              appointments for site visits.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What happens after a viewing?
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Buyer did not like the unit – no action taken.</li>
              <li>
                Buyer made a reservation – the unit is put on hold temporarily.
              </li>
              <li>
                If the buyer completes full payment later, the unit becomes
                sold. If not, the hold expires and the reservation fee is
                non-refundable.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are there any costs to using KEYFINDER?
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Browsing and searching is free for all users.</li>
              <li>
                Listing and promoting properties is managed by our brokerage and
                developers.
              </li>
              <li>
                Reservations involve a payment handled on-site during your
                visit.
              </li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What services does KEYFINDER provide?
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Exclusive project listings.</li>
              <li>Property filtering (type, area, budget).</li>
              <li>Appointment scheduling with brokers.</li>
              <li>On-site viewing management.</li>
              <li>Reservation & sales tracking system.</li>
              <li>Broker follow-up & lead outcome.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How KEYFINDER Works?</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Browse properties by type, area, and budget.</li>
              <li>
                Schedule appointments with available brokers during working
                hours.
              </li>
              <li>
                Attend site visits with your chosen broker at the project
                location.
              </li>
              <li>
                Secure a reservation on the spot by paying a reservation amount.
              </li>
              <li>Complete the purchase later via cash or installments.</li>
              <li>
                If payment is not completed within a specified time, the
                reservation expires and the unit is relisted.
              </li>
              <li>The reservation amount is non-refundable.</li>
            </ul>
          </div>
          {/* FAQs */}
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I choose the broker I want to meet?
              </h3>
              <p>
                Yes! When booking an appointment, you’ll see a list of available
                brokers for your selected time and unit. You can choose who
                you’d like to meet with.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Does KEYFINDER offer payment plans?
              </h3>
              <p>
                KEYFINDER itself does not finance sales but connects buyers to
                units that offer cash or installment options, as provided by the
                property developers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
