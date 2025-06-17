/* --------------------------------------------------
   src/components/UnitDetails.jsx   (v4 – wheel / touch only)
   -------------------------------------------------- */
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById } from "../../network/project";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../utils/constants";
/* --- TEMP demo images – swap for API data later --- */
import img1 from "../../assets/Select/1.svg";
import img2 from "../../assets/Select/2.svg";
import img3 from "../../assets/Select/3.svg";
import img4 from "../../assets/Select/4.svg";
import img5 from "../../assets/Select/5.svg";
import img6 from "../../assets/Select/6.svg";
import img7 from "../../assets/Select/7.svg";
import img8 from "../../assets/Select/8.svg";
import img9 from "../../assets/Select/9.svg";
import img10 from "../../assets/Select/10.svg";
import img11 from "../../assets/Select/11.svg";
import img12 from "../../assets/Select/12.svg";

const defaultGallery = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12,
];

export default function UnitDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState(defaultGallery);
  const [hero, setHero] = useState(defaultGallery[0]);
  const navigate = useNavigate();
  const railRef = useRef(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getPropertyById(id);
        const propertyData = response.data.data;
        setProperty(propertyData);
        
        // If property has images, use them, otherwise use default gallery
        if (propertyData.images && propertyData.images.length > 0) {
          setGallery(propertyData.images);
          setHero(propertyData.images[0]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  /* vertical wheel → horizontal scroll */
  const wheelToScroll = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      railRef.current.scrollLeft += e.deltaY;
    }
  };
  const currentIdx = gallery.findIndex((src) => src === hero);

  /* keep fades only when needed */
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(true);

  const reportEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setFadeL(el.scrollLeft > 0);
    setFadeR(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    reportEdges();
    el.addEventListener("scroll", reportEdges, { passive: true });
    window.addEventListener("resize", reportEdges);
    return () => {
      el.removeEventListener("scroll", reportEdges);
      window.removeEventListener("resize", reportEdges);
    };
  }, [reportEdges]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-xl text-[#002855]">Property not found</div>
      </div>
    );
  }

  /* -------------- render -------------- */
  return (
    <section className="container mx-auto px-4 py-8 space-y-10">
      {/* ─────────── top row ─────────── */}
      <div className="flex flex-col md:flex-row gap-6">
        {!property.images?.[0] ? (
          <div className="max-w-xl md:w-1/2 aspect-video bg-[#001731] rounded-xl flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="text-lg font-semibold">Image Not Available</p>
            </div>
          </div>
        ) : (
          <img
            src={property.images[0]}
            alt={property.title || 'Property image'}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = img1; // Fallback to default image
            }}
            className="max-w-xl md:w-1/2 aspect-video object-cover rounded-xl shadow"
          />
        )}

        <div className="w-full md:w-1/2 bg-[#002855] text-white rounded-xl p-6 space-y-4">
          <h3 className="text-2xl font-semibold">{property.title || 'Untitled Property'}</h3>
          
          {property.description && (
            <p className="text-lg text-gray-200">{property.description}</p>
          )}

          <ul className="text-white text-[12px] leading-[16px] space-y-[2px]">
            <li className="text-xl">
              <span className="font-semibold text-xl">Type: </span>
              {PROPERTY_TYPES[property.type] || property.type || 'N/A'}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Area: </span>
              {AREA_RANGES[property.areaRange] || `${property.area || 'N/A'} sqm`}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Bedrooms: </span>
              {property.bedrooms || 'N/A'}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Bathrooms: </span>
              {property.bathrooms || 'N/A'}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Price: </span>
              {PRICE_RANGES[property.priceRange] || `$${property.price?.toLocaleString() || 'N/A'}`}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Status: </span>
              {PROPERTY_STATUS[property.status] || property.status || 'N/A'}
            </li>
          </ul>
        </div>
      </div>

      {/* ─────────── slider – wheel/touch only ─────────── */}
      {property.images?.length >= 2 && (
        <>
          <div className="relative">
            <div
              ref={railRef}
              onWheel={wheelToScroll}
              className="flex gap-4 overflow-x-auto no-scrollbar pb-2
                            before:pointer-events-none before:absolute before:inset-y-0 before:left-0
                            before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent
                            after:pointer-events-none after:absolute after:inset-y-0 after:right-0
                            after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent"
              style={{
                "--tw-before-opacity": fadeL ? 1 : 0,
                "--tw-after-opacity": fadeR ? 1 : 0,
              }}
            >
              {property.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Unit image ${i + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img1;
                  }}
                  onClick={() => setHero(src)}
                  className={`w-[15rem] h-40 object-cover rounded-lg shrink-0
                                 transition ring-2 ${
                                   hero === src
                                     ? "ring-[#002855]"
                                     : "ring-transparent hover:ring-gray-300"
                                 }`}
                />
              ))}
            </div>
          </div>
          {/* counter */}
          <p className="text-xl md:text-2xl font-extrabold text-[#002855] text-center">
            {currentIdx + 1}/{property.images.length}&nbsp;images
          </p>
        </>
      )}

      {/* ─────────── CTA ─────────── */}
      <div className="flex justify-center md:justify-end">
        <button
          onClick={() =>
            navigate(`/schedule/${id}`, {
              state: {
                img: hero,
                property,
              },
            })
          }
          className="rounded-xl bg-[#002855] px-8 py-4 text-white text-lg font-bold shadow
             transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Schedule An Appointment
        </button>
      </div>
    </section>
  );
}

function Spec({ label, value }) {
  return (
    <p className="flex items-center gap-2">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </p>
  );
}
