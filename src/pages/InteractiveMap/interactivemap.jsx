import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from "react";

/* ── custom marker icon ───────────────────────────────────────── */
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AlexandriaMap() {
  const mapRef = useRef(null);      // will hold the Leaflet Map instance

  /* ── zoom helpers ───────────────────────────────────────────── */
  const zoomIn  = () => mapRef.current?.setZoom(mapRef.current.getZoom() + 1);
  const zoomOut = () => mapRef.current?.setZoom(mapRef.current.getZoom() - 1);

  return (
    <div className="fixed inset-0 bg-black">
      {/* ── title + custom zoom (top-left) ─────────────────────── */}
      <div className="absolute top-4 left-4 z-[9999] flex flex-col gap-2">
        <h1 className="text-white text-lg font-semibold">Interactive Map</h1>

        <div className="w-[48px] bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
          <button
            onClick={zoomIn}
            className="w-full h-10 text-black text-xl font-bold border-b border-gray-200 hover:bg-gray-100"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="w-full h-10 text-black text-xl font-bold hover:bg-gray-100"
          >
            −
          </button>
        </div>
      </div>

      {/* ── home icon (top-right) ──────────────────────────────── */}
      <Link
        to="/"
        className="absolute top-4 right-4 z-[9999] text-white hover:text-gray-300"
      >
        <FaHome size={24} />
      </Link>

      {/* ── leaflet map ─────────────────────────────────────────── */}
      <MapContainer
        center={[31.2156, 29.9553]}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}           /* hide default controls */
        className="w-full h-full z-0"
        whenReady={(e) => (mapRef.current = e.target)}   /* <-- FIX */
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[31.2156, 29.9553]} icon={customIcon}>
          <Popup>Stanley Bridge</Popup>
        </Marker>
        <Marker position={[31.2243, 29.9524]} icon={customIcon}>
          <Popup>Sporting Club</Popup>
        </Marker>
        <Marker position={[31.2152, 29.9248]} icon={customIcon}>
          <Popup>Alexandria Corniche</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
