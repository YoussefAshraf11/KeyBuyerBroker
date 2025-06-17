import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ img, name, id }) {
  const [imageError, setImageError] = useState(!img);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (id) {
      navigate(`/unit-details/${id}`);
    }
  };

  return (
    <div 
      className="w-full max-w-[10.5rem] sm:max-w-[12rem] text-center cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleClick}
    >
      {/* ↑ 168 px on mobile, 192 px on ≥640 px screens */}

      {imageError ? (
        <div className="w-full h-28 sm:h-32 bg-gray-200 rounded-lg shadow flex items-center justify-center">
          <p className="text-gray-500 text-sm">Failed to load image</p>
        </div>
      ) : (
        <img
          src={img}
          alt={name}
          className="w-full h-28 sm:h-32 object-cover rounded-lg shadow"
          onError={handleImageError}
        />
      )}
      {/* ↑ 112 px tall → 128 px tall on ≥640 px screens */}

      <p className="mt-2 text-sm">{name}</p>
    </div>
  );
}
