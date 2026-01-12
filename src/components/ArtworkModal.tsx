import React from "react";
import { useExhibition, type Artwork } from "../context/ExhibitionContext";

type Props = {
  artwork: Artwork;
  onClose: () => void;
};

const ArtworkModal: React.FC<Props> = ({ artwork, onClose }) => {
  const { artworks, addArtwork, removeArtwork } = useExhibition();

  // Check if this specific artwork is already in the exhibition
  const isSaved = artworks.some((a) => a.id === artwork.id && a.source === artwork.source);

  // UX: Close modal when clicking the dark backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleExhibitionToggle = () => {
    if (isSaved) {
      removeArtwork(artwork.id, artwork.source);
    } else {
      addArtwork(artwork);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
    >
      {/* Modal Container: Stacks on mobile, Side-by-side on desktop */}
      <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative rounded-xl flex flex-col md:flex-row">
        
        {/* Close Button - Floats over image on mobile, stays consistent */}
        <button
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        {/* Left/Top Column: Image Display */}
        <div className="md:w-3/5 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={artwork.imageUrl || "https://via.placeholder.com/600x600.png?text=No+Image"}
            alt={artwork.title}
            className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
          />
        </div>

        {/* Right/Bottom Column: Content & Actions */}
        <div className="md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 id="modal-title" className="text-2xl font-serif font-bold text-gray-900 leading-tight">
              {artwork.title}
            </h2>
            <p className="text-xl text-blue-700 font-medium mt-1">{artwork.artist}</p>
            
            <hr className="my-6 border-gray-100" />
            
            <dl className="space-y-4">
              <div>
                <dt className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Date</dt>
                <dd className="text-gray-700 font-medium">{artwork.date || "Unknown"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Museum</dt>
                <dd className="text-gray-700 font-medium">{artwork.museum}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 space-y-3">
            {/* Functional Button: Integrated with ExhibitionContext */}
            <button
              onClick={handleExhibitionToggle}
              className={`w-full py-3 rounded-lg font-bold transition-all focus:ring-2 focus:ring-offset-2 ${
                isSaved 
                ? "bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100 focus:ring-red-500" 
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg"
              }`}
            >
              {isSaved ? "Remove from Exhibition" : "Add to My Exhibition"}
            </button>

            <a
              href={artwork.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors no-underline border border-gray-200"
            >
              View Official Catalog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;