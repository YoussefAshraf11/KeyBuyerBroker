import React from "react";

const BrokerCard = ({ broker, selected, onSelect }) => (
  <div
    className={`w-44 h-44 bg-[#002855] text-white rounded-xl p-4 flex flex-col items-center justify-between text-center ${
      selected ? "ring-2 ring-white" : ""
    }`}
  >
    {/* Info block */}
    <div className="space-y-1 text-base leading-tight mt-2">
      <p className="font-semibold">{broker.name}</p>
      <p className="text-xs">{broker.email}</p>
    </div>
    {/* Button */}
    <button
      type="button"
      onClick={() => onSelect(broker)}
      className={`rounded-full bg-white text-[#002855] text-sm px-4 py-1 mt-2 w-full ${selected ? "opacity-40 cursor-not-allowed" : ""}`}
      disabled={selected}
    >
      Select
    </button>
  </div>
);

export default BrokerCard;
