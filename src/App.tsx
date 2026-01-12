import React, { useRef, useState } from "react";
import { ExhibitionProvider, useExhibition } from "./context/ExhibitionContext";
import type { Artwork } from "./context/ExhibitionContext";
import SearchBar from "./components/SearchBar";
import ArtworkGrid from "./components/ArtworkGrid";
import ArtworkModal from "./components/ArtworkModal";
import ExhibitionPanel from "./components/ExhibitionPanel";
import ExhibitionSlideshow from "./components/ExhibitionSlideshow";
import { searchMet, searchVam } from "./services/api";
import "./index.css";

const AppContent: React.FC = () => {
  const [results, setResults] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); // For Screen Readers
  const searchTokenRef = useRef(0);
  const [activeExhibitionIndex, setActiveExhibitionIndex] = useState<
    number | null
  >(null);

  const { addArtwork } = useExhibition();

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    setLoading(true);
    setStatusMessage(`Searching for ${trimmedTerm}...`);
    const currentToken = ++searchTokenRef.current;

    Promise.all([searchMet(trimmedTerm), searchVam(trimmedTerm)])
      .then(([metResults, vamResults]) => {
        if (currentToken !== searchTokenRef.current) return;

        const combined = [...metResults, ...vamResults];
        const uniqueResults = Array.from(
          new Map(combined.map((a) => [`${a.source}-${a.id}`, a])).values()
        );

        setResults(uniqueResults);
        setStatusMessage(`Found ${uniqueResults.length} artworks.`);
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage("Error fetching artworks. Please try again.");
      })
      .finally(() => {
        if (currentToken === searchTokenRef.current) setLoading(false);
      });
  };

  const handleArtworkClick = (art: Artwork) => {
    setSelectedArtwork(art);
    addArtwork(art);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-20">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Virtual Art Exhibition</h1>
        <p className="text-gray-600 max-w-2xl">
          Explore artworks from world-renowned museums and curate your own
          exhibition.
        </p>
      </header>

      <section aria-label="Search Artworks" className="space-y-6">
        <SearchBar onSearch={handleSearch} />
      </section>

      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      {loading && (
        <p className="text-center text-gray-700 font-medium" role="status">
          Loading artworks...
        </p>
      )}

      {results.length > 0 && (
        <section aria-label="Search Results" className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Search Results
          </h2>
          <ArtworkGrid artworks={results} onArtworkClick={handleArtworkClick} />
        </section>
      )}

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

      <section
        aria-labelledby="exhibition-panel-heading"
        className="mt-24 rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-8 shadow-lg space-y-8"
      >
        <header className="space-y-1">
          <h2
            id="exhibition-panel-heading"
            className="text-2xl font-bold text-indigo-900"
          >
            🎨 Your Personal Exhibition
          </h2>
          <p className="text-sm text-indigo-700">
            Curated by you during this session
          </p>
        </header>

        <p className="text-sm italic text-indigo-700 max-w-2xl">
          “An exhibition is a story — you are writing yours.”
        </p>

        <ExhibitionPanel
          onSelectArtwork={(index) => setActiveExhibitionIndex(index)}
        />

        {activeExhibitionIndex !== null && (
          <ExhibitionSlideshow
            startIndex={activeExhibitionIndex}
            onClose={() => setActiveExhibitionIndex(null)}
          />
        )}
      </section>
    </main>
  );
};

const App: React.FC = () => (
  <ExhibitionProvider>
    <AppContent />
  </ExhibitionProvider>
);

export default App;
