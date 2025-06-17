import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../utils/constants";

export default function PropertyCardInList({ 
  property, 
  isFavorite, 
  onToggleFavorite, 
  hasImageError, 
  onImageError 
}) {
  const navigate = useNavigate();

  return (
    <article
      className="relative flex gap-5 bg-[#002349] rounded-xl px-5 py-6 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
    >
      {/* star */}
      <button
        onClick={() => onToggleFavorite(property._id)}
        className="absolute top-4 right-4"
        aria-label="save to favourites"
      >
        <Star
          className="h-6 w-6"
          stroke="white"
          strokeWidth={1.4}
          fill={isFavorite ? "white" : "transparent"}
        />
      </button>

      {/* thumbnail */}
      <div className="w-[496px] h-[290px] rounded-lg shrink-0 bg-[#001731] flex items-center justify-center overflow-hidden">
        {!property.images?.[0] || hasImageError ? (
          <div className="text-white text-center p-4">
            <p className="text-lg font-semibold">Image Not Available</p>
          </div>
        ) : (
          <img
            src={property.images[0]}
            alt={property.title || 'Property image'}
            className="w-full h-full object-cover rounded-lg"
            onError={() => onImageError(property._id)}
          />
        )}
      </div>

      {/* details + button */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">{property.title}</h3>
          <ul className="text-white text-[12px] leading-[16px] space-y-[2px]">
            <li className="text-xl">
              <span className="font-semibold text-xl">Type: </span>
              {PROPERTY_TYPES[property.type] || property.type}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Area: </span>
              {AREA_RANGES[property.areaRange] || property.areaRange}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Bedrooms: </span>
              {property.bedrooms}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Bathrooms: </span>
              {property.bathrooms}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Price: </span>
              {PRICE_RANGES[property.priceRange] || property.priceRange}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Status: </span>
              {PROPERTY_STATUS[property.status] || property.status}
            </li>
          </ul>
        </div>

        {property.status !== 'reserved' && property.status !== 'sold' && (
          <button
            className="self-end mt-4 bg-white text-[#002349] text-xs font-semibold rounded-[4px] px-6 py-[4px]"
            onClick={() => navigate(`/unit-details/${property._id}`)}
          >
            select
          </button>
        )}
      </div>
    </article>
  );
} 