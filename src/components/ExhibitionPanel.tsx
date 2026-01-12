import React from "react";
import { useExhibition } from "../context/ExhibitionContext";

type ExhibitionPanelProps = {
  onSelectArtwork: (index: number) => void;
};

const ExhibitionPanel: React.FC<ExhibitionPanelProps> = ({
  onSelectArtwork,
}) => {
  const { artworks } = useExhibition();
  if (!artworks.length) return null;

  return (
    <section
      className="mb-6 rounded-xl bg-white p-4 shadow-sm border border-indigo-200"
      aria-labelledby="my-exhibition-title"
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          id="my-exhibition-title"
          className="text-lg font-semibold text-indigo-900"
        >
          Selected Artworks
        </h3>
        <span className="text-sm text-indigo-600">
          {artworks.length} piece{artworks.length !== 1 && "s"}
        </span>
      </div>

      <ul className="flex flex-wrap gap-3 list-none p-0">
        {artworks.map((art, index) => (
          <li key={`${art.source}-${art.id}`}>
            <button
              onClick={() => onSelectArtwork(index)}
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg border border-gray-200 hover:scale-105 transition-transform"
              aria-label={`Open gallery view for ${art.title}`}
              title={art.title}
            >
              <img
                src={
                  art.imageUrl ||
                  "https://via.placeholder.com/96x96.png?text=No+Image"
                }
                alt={art.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExhibitionPanel;
