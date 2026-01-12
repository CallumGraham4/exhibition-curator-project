import React, { useState } from "react";
import { useExhibition } from "../context/ExhibitionContext";

type ExhibitionSlideshowProps = {
  startIndex: number;
  onClose: () => void;
};

const ExhibitionSlideshow: React.FC<ExhibitionSlideshowProps> = ({
  startIndex,
  onClose,
}) => {
  const { artworks } = useExhibition();
  const [current] = useState(startIndex);

  if (!artworks.length) return null;

  return (
    <section
      className="rounded-xl bg-indigo-100 p-6 flex flex-col items-center"
      aria-label="Exhibition Slideshow"
    >
      <button
        onClick={onClose}
        className="self-end mb-3 text-sm text-indigo-700 hover:underline focus:ring-2 focus:ring-indigo-500"
        aria-label="Close gallery view"
      >
        ← Back to exhibition
      </button>

      <p className="mb-4 text-indigo-800 font-medium">Gallery View</p>

      <img
        src={
          artworks[current].imageUrl ||
          "https://via.placeholder.com/300x300.png?text=No+Image"
        }
        alt={artworks[current].title}
        className="max-w-sm rounded-lg shadow-md"
      />
    </section>
  );
};

export default ExhibitionSlideshow;
