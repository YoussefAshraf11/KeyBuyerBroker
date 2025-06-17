import { useState } from "react";
import SearchBar from "../Searchbar/searchbar";
import heroBg from "../../assets/landing.svg";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState("Property Type");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectedPrice, setSelectedPrice] = useState("Average Price");

  const toggle = (dropdown) => {
    setShowPropertyType(dropdown === "property");
    setShowArea(dropdown === "area");
    setShowPrice(dropdown === "price");
  };

  const propertyTypes = ["Chalet", "Apartment", "Twins", "Stand Alone Villas"];
  const areaOptions = [
    "Less than 100 m²",
    "100 m² → 150 m²",
    "150 m² → 200 m²",
    "Over 200 m²",
  ];
  const priceOptions = [
    "Less than 1 million",
    "1–2 million",
    "2–3 million",
    "3–4 million",
    "4–5 million",
    "Over 5 million",
  ];

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center text-center text-white"
      style={{ background: `url(${heroBg}) center/cover` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          The Simplest <br /> Way to Find Property
        </h1>

        {/* <SearchBar
          placeholder="Search Properties…"
          inputClassName="bg-white text-gray-700 placeholder-gray-400"
          buttonClassName="bg-primary hover:bg-accent/90"
          iconClassName="h-5 w-5"
        /> */}

        
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {/* Property Type */}
        {/* <div className="relative">
          <button
            onClick={() => toggle("property")}
            className="inline-flex items-center bg-white px-5 py-2 rounded-full text-sm text-[#042987] font-semibold"
          >
            {selectedProperty}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPropertyType && (
            <ul className="absolute mt-2 w-48 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {propertyTypes.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedProperty(item);
                    setShowPropertyType(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div> */}

        {/* Area */}
        {/* <div className="relative">
          <button
            onClick={() => toggle("area")}
            className="inline-flex items-center bg-white px-5 py-2 rounded-full text-sm text-[#042987] font-semibold"
          >
            {selectedArea}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showArea && (
            <ul className="absolute mt-2 w-56 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {areaOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedArea(item);
                    setShowArea(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div> */}

        {/* Average Price */}
        {/* <div className="relative">
          <button
            onClick={() => toggle("price")}
            className="inline-flex items-center bg-white px-5 py-2 rounded-full text-sm text-[#042987] font-semibold"
          >
            {selectedPrice}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPrice && (
            <ul className="absolute mt-2 w-52 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              {priceOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedPrice(item);
                    setShowPrice(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </section>
  );
}