import React from "react";
import type { Artwork } from "../context/ExhibitionContext";

type Props = {
  artwork: Artwork;
  onClick?: () => void;
};

const ArtworkCard: React.FC<Props> = ({ artwork, onClick }) => (
  <button
    onClick={onClick}
    // Changed div to button for accessibility. 
    // Reduced shadow and rounded corners for a cleaner "small" look.
    className="
      w-full
      text-left
      overflow-hidden
      cursor-pointer
      bg-white
      shadow-sm
      border border-gray-100
      transition-all
      hover:scale-105
      hover:shadow-md
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      rounded-md
    "
    aria-label={`View details for ${artwork.title} by ${artwork.artist}`}
  >
    <div className="aspect-square w-full bg-gray-50">
      <img
        src={artwork.imageUrl || "https://via.placeholder.com/150x150.png?text=No+Image"}
        alt="" // Alt is empty because aria-label on button describes the content
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="p-1.5">
      {/* text-xs and truncate keep the small card from expanding with long titles */}
      <h3 
        className="text-xs font-bold text-gray-900 truncate" 
        title={artwork.title}
      >
        {artwork.title}
      </h3>
      <p className="text-[10px] text-gray-500 truncate">
        {artwork.artist}
      </p>
    </div>
  </button>
);

export default ArtworkCard;