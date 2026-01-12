import React from "react";
import type { Artwork } from "../context/ExhibitionContext";
import ArtworkCard from "./ArtworkCard";

type Props = {
  artworks: Artwork[];
  onArtworkClick?: (art: Artwork) => void;
};

const ArtworkGrid: React.FC<Props> = ({ artworks, onArtworkClick }) => {
  if (!artworks.length) {
    return (
      <p role="status" className="text-center text-gray-500 italic mt-10">
        No artworks match your search.
      </p>
    );
  }

  return (
    <section aria-label="Search results" className="py-4">
      {/* Responsive grid configuration:
        - grid-cols-2: Default for mobile (since cards are small)
        - sm:grid-cols-3: Tablet/Portrait
        - md:grid-cols-4: Tablet/Landscape
        - lg:grid-cols-6: Desktop
      */}
      
      <div 
        role="list" 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
      >
        {artworks.map((art) => (
          <div role="listitem" key={`${art.source}-${art.id}`}>
            <ArtworkCard
              artwork={art}
              // This wrapper ensures the types align and only calls the function if provided
              onClick={onArtworkClick ? () => onArtworkClick(art) : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworkGrid;