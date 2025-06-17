/* eslint-disable no-unused-vars */
/* --------------------------------------------------
   Schedule.jsx   (v2 – matches blue mock-up)
   -------------------------------------------------- */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useLocation } from "react-router-dom";
import { getPropertyById } from "../../network/project";
import { createAppointment } from "../../network/appointment";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../utils/constants";
/* ——— images ——— */
import cover from "../../assets/Schedule/cover.svg";
import BrokerCard from "./BrokerCard";
import { useDispatch, useSelector } from "react-redux";
import { setBrokers } from "../../store/usersSlice";
import { getUsersList } from "../../network/user";


export default function Schedule() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { state } = useLocation();

  // Property fetch logic
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Scheduling state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [selectedBroker, selectB] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const brokers = useSelector((state) => state.users.brokers);
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await getUsersList({role: 'broker'});
        // Expecting response.data to be an array of users
        dispatch(setBrokers(response.data.data));
      } catch (err) {
        // Optionally handle error
        console.error("Failed to fetch brokers", err);
      }
    };
    fetchBrokers();
  }, [dispatch]);

  // Prefer state.id, fallback to param
  const propertyId = state?.property?._id || state?.id || paramId;


  useEffect(() => {
    if (!propertyId) {
      setError("No property ID provided");
      setLoading(false);
      return;
    }
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getPropertyById(propertyId);
        const propertyData = response.data.data;
        setProperty(propertyData);
        if (propertyData.images && propertyData.images.length > 0) {
          setGallery(propertyData.images);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const selectedImg = gallery[0] || state?.img || cover;

  const handleSelect = (b) => {
    selectB(b);
    Swal.fire({
      icon: "success",
      title: "Selected!",
      text: `You selected ${b.name} successfully`,
      confirmButtonColor: "#002855",
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into ISO string
    let appointmentDate = null;
    if (date && time) {
      let [hourStr, minStr] = time.split(":");
      let [minutes, ampm] = minStr.split(" ");
      let hour = parseInt(hourStr, 10);
      if (ampm === "PM" && hour !== 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      const iso = new Date(date);
      iso.setHours(hour, 0, 0, 0);
      appointmentDate = iso.toISOString();
    }

    try {
      const payload = {
        buyerId: loggedInUser.id,
        brokerId: selectedBroker._id,
        propertyId: property._id,
        appointmentDate: appointmentDate,
        type: "initial"
      };

      const response = await createAppointment(payload);
      
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Appointment scheduled successfully",
          confirmButtonColor: "#002855",
        }).then(() => {
          navigate("/myappointments");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error?.message || "Failed to schedule appointment",
        confirmButtonColor: "#002855",
      });
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[900px] px-4 py-10 space-y-12 text-[#002855]"
    >
      {/* ───────────────── property + specs ───────────────── */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[30vh] text-xl text-[#002855]">Loading property details...</div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[30vh] text-xl text-red-600">{error}</div>
      ) : property ? (
        <div className="flex flex-col md:flex-row gap-6">
          {gallery[0] ? (
            <img
              src={gallery[0]}
              alt={property.title || "Property"}
              className="w-full md:w-[420px] aspect-[4/3] object-cover rounded-lg shadow"
              onError={e => { e.target.onerror = null; e.target.src = cover; }}
            />
          ) : (
            <div className="w-full md:w-[420px] aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="flex-1 bg-[#002855] text-white rounded-lg p-6 space-y-2 text-base sm:text-lg">
            <h3 className="text-2xl font-semibold mb-2">{property.title || 'Untitled Property'}</h3>
            {property.description && <p className="mb-2 text-gray-200">{property.description}</p>}
            <Spec label="Type" val={PROPERTY_TYPES[property.type] || property.type || 'N/A'} />
            <Spec label="Area" val={AREA_RANGES[property.areaRange] || `${property.area || 'N/A'} sqm`} />
            <Spec label="Bedrooms" val={property.bedrooms || 'N/A'} />
            <Spec label="Bathrooms" val={property.bathrooms || 'N/A'} />
            <Spec label="Price" val={PRICE_RANGES[property.priceRange] || `$${property.price?.toLocaleString() || 'N/A'}`} />
            <Spec label="Status" val={PROPERTY_STATUS[property.status] || property.status || 'N/A'} />
            {property.location && <Spec label="Location" val={property.location} />}
          </div>
        </div>
      ) : null}


      {/* ───────────────── date & time ───────────────── */}
      {/* ─────────────── date & time (stacked under labels) ─────────────── */}
      <div className="flex flex-col gap-6 text-lg font-semibold">
        <div>
          <p className="mb-1 text-xl font-bold">Choose Date:</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-45 rounded-full bg-[#002855] text-white px-5 py-2 cursor-pointer ml-15
             outline-none appearance-none accent-white
             [color-scheme:dark]
             [::-webkit-calendar-picker-indicator]:invert
             [::-webkit-calendar-picker-indicator]:opacity-100"
          />
        </div>

        <div>
          <p className="mb-1 text-xl font-bold">Choose Time:</p>
          <div className="relative w-40">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-full bg-[#002855] text-white px-5 py-2 pr-10 ml-15
                 outline-none appearance-none cursor-pointer
                 [color-scheme:dark]"
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const hour = i % 12 === 0 ? 12 : i % 12;
                const ampm = i < 12 ? "AM" : "PM";
                return (
                  <option
                    key={i}
                    value={`${hour.toString().padStart(2, "0")}:00 ${ampm}`}
                  >
                    {hour.toString().padStart(2, "0")}:00 {ampm}
                  </option>
                );
              })}
            </select>

            {/* White arrow injected manually */}
            <div className="pointer-events-none absolute inset-y-0 -right-5 flex items-center">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── brokers ───────────────── */}
      <div className="space-y-4">
        <p className="text-xl font-bold">Choose Broker:</p>

        <div className="flex flex-wrap justify-center gap-6">
          {brokers?.length  >0 && brokers?.map((b) => (
            <BrokerCard
              key={b._id}
              broker={b}
              selected={selectedBroker?._id === b._id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* ───────────────── submit ───────────────── */}
      <div className="text-center">
        <button
          type="submit"
          disabled={!date || !selectedBroker}
          className="rounded-xl bg-[#002855] px-10 py-2 text-white text-lg font-bold 
                        disabled:opacity-40"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

/* helper components */
function Spec({ label, val }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {val}
    </p>
  );
}

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <div className="flex justify-center text-white text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
