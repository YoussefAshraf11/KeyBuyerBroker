// src/components/DevelopersGrid.jsx
import React from "react";

// Assets
import PalmHills from "../../assets/Real Estate Developers in Alexandria/Palm Hills.svg";
import Alforat from "../../assets/Real Estate Developers in Alexandria/Alforat Development.svg";
import Valore from "../../assets/Real Estate Developers in Alexandria/Valore Development.svg";
import Saudi from "../../assets/Real Estate Developers in Alexandria/Saudi Egyptian.svg";
import ElSalam from "../../assets/Real Estate Developers in Alexandria/El Salam Interbuild.svg";
import AlexWest from "../../assets/Real Estate Developers in Alexandria/Alex West.jpeg";

const DEVELOPERS = [
  { name: "Palm Hills Developments", image: PalmHills },
  { name: "Alforat developments", image: Alforat },
  { name: "Valore developments", image: Valore },
  { name: "Saudi-Egyptian Developers", image: Saudi },
  { name: "Elsalam Interbuilds", image: ElSalam },
  { name: "Alex West", image: AlexWest },
];

export default function DevelopersGrid() {
  return (
    <section className="container mx-auto px-4 py-12 text-[#002349]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center">
        Real estate developers in Alexandria
      </h2>

      {/* Developer Logos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center mb-12">
        {DEVELOPERS.map(({ name, image }) => (
          <div
            key={name}
            className="w-full max-w-[400px] rounded-xl overflow-hidden shadow-md border border-gray-200"
          >
            <img src={image} alt={name} className="w-full h-64 object-cover" />
            <div className="bg-[#002855] flex justify-center items-center h-20 text-white rounded-2xl text-center py-2 font-semibold">
              {name}
            </div>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-5 space-y-8 text-sm sm:text-base leading-relaxed">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            Top Real Estate Developers in Alexandria
          </h3>
          <p>
            At KeyFinder, we bring you closer to Alexandria’s most trusted and
            visionary real estate developers — the minds behind the iconic
            communities, luxurious resorts, and sustainable living spaces
            transforming Alexandria’s skyline.
          </p>
          <p className="mt-2">
            Alexandria’s real estate market is in the midst of unprecedented
            growth, driven by top-tier developers who are reshaping the
            country’s urban fabric. These developers are not just building
            homes; they’re building futures — creating vibrant, integrated
            communities that offer unmatched value for both investors and
            homebuyers.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            Why Choose Projects by Alexandria’s Top Developers?
          </h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Strong Investment Returns:</strong> Projects by leading
              developers often enjoy strong market demand, ensuring value
              appreciation and long-term returns.
            </li>
            <li>
              <strong>Prime Locations:</strong> Strategically located near vital
              infrastructure, schools, shopping, and business centers.
            </li>
            <li>
              <strong>World-Class Amenities:</strong> Swimming pools,
              clubhouses, parks, and retail zones — all designed to elevate your
              lifestyle.
            </li>
            <li>
              <strong>Peace of Mind:</strong> Trusted names with proven track
              records ensure your property is delivered on time, with the
              promised quality.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            KeyFinder Brings It All to One Place
          </h3>
          <p>
            At KeyFinder, we curate and centralize Alexandria’s most prominent
            real estate projects under one platform. Our aim is simple — to
            connect serious buyers and investors with exclusive access to the
            best developments in the market.
          </p>
          <p className="mt-2">
            Our licensed brokers are available on-site to guide you every step
            of the way, from exploring properties to completing reservations.
          </p>
        </div>

        <p className="text-xs italic text-center pt-6">
          Discover Egypt’s future. Secure your investment. Find your perfect
          home — only with KeyFinder.
        </p>
      </div>
    </section>
  );
}
