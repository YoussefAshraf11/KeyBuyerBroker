// src/components/Favourites.jsx
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { getUserFavorites, removeFromFavorites } from "../../network/user";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { getLoggedInUser } from "../../network/auth";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../utils/constants";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Favourites() {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await getUserFavorites();
      if (response.data.success) {
        setFavorites(response.data.data.properties);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFav = async (propertyId) => {
    try {
      await removeFromFavorites({ propertyId });
      
      // Get updated user data after removing favorite
      const response = await getLoggedInUser();
      if (response.data.success) {
        // Update user data in Redux store
        dispatch(setCredentials({
          user: response.data.data.user,
          token: localStorage.getItem('token')
        }));
      }
      
      // Refresh favorites list
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleImageError = (propertyId) => {
    setImageErrors(prev => ({
      ...prev,
      [propertyId]: true
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white pt-8 pb-14 px-4 md:px-8 max-w-5xl mx-auto min-h-[40vh]">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-[#002349] font-bold text-xl mb-2 text-center">
            My Favourites
          </h1>
          <p className="text-center text-gray-500">
            You haven't added any properties yet.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-[#002349] font-bold text-xl mb-6 text-center">
            My Favourites
          </h1>
          <div className="space-y-8">
            {favorites.map((property) => (
              <article
                key={property._id}
                className="relative flex gap-5 bg-[#002349] rounded-xl px-5 py-6 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                {/* clickable star → remove */}
                <button
                  onClick={() => removeFav(property._id)}
                  className="absolute top-4 right-4"
                  aria-label="remove from favourites"
                >
                  <Star
                    className="h-6 w-6"
                    stroke="white"
                    strokeWidth={1.4}
                    fill="white"
                  />
                </button>

                {/* thumbnail */}
                <div className="w-[496px] h-[290px] rounded-lg shrink-0 bg-[#001731] flex items-center justify-center overflow-hidden">
                  {!property.images?.[0] || imageErrors[property._id] ? (
                    <div className="text-white text-center p-4">
                      <p className="text-lg font-semibold">Image Not Available</p>
                    </div>
                  ) : (
                    <img
                      src={property.images[0]}
                      alt={property.title || 'Property image'}
                      className="w-full h-full object-cover rounded-lg"
                      onError={() => handleImageError(property._id)}
                    />
                  )}
                </div>

                {/* details + Select */}
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

                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to remove this property from your favourites?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#002855",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, remove it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removeFav(property._id);
                          Swal.fire({
                            icon: "success",
                            title: "Removed!",
                            text: "Property has been removed from your favourites.",
                            confirmButtonColor: "#002855",
                          });
                        }
                      });
                    }}
                    className="
                    self-end mt-4
                    bg-white text-[#002349] text-xs font-semibold
                    rounded-[4px] px-6 py-[4px]
                    hover:bg-gray-100
                  "
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
