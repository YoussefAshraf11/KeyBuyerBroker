import { useState } from 'react';

export default function ProjectCard({ img, name }) {
  const [imageError, setImageError] = useState(!img);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full max-w-[22rem] sm:max-w-[24rem] text-center">
      {/* ↑ 352 px wide on mobile, 384 px on ≥640 px */}

      {imageError ? (
        <div className="w-full h-60 sm:h-64 bg-gray-200 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-gray-500 text-base">Failed to load image</p>
        </div>
      ) : (
        <img
          src={img}
          alt={name}
          className="w-full h-60 sm:h-64 object-cover rounded-xl shadow-md"
          onError={handleImageError}
        />
      )}
      {/* ↑ 240 px tall on mobile, 256 px on ≥640 px */}

      <p className="mt-3 text-lg font-medium">{name}</p>
    </div>
  );
}
