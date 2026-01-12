import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Artwork = {
  id: string;
  source: "MET" | "V&A";
  title: string;
  artist: string;
  date: string;
  imageUrl: string;
  museum: string;
  location?: string;
  externalUrl: string;
};

type ExhibitionContextType = {
  artworks: Artwork[];
  addArtwork: (art: Artwork) => void;
  removeArtwork: (id: string, source: string) => void; // Updated signature
  clearExhibition: () => void;
};

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(undefined);

export const ExhibitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    try {
      // Accessibility: Error handling for storage ensures the app doesn't crash on load
      const saved = sessionStorage.getItem("exhibition");
      return saved ? (JSON.parse(saved) as Artwork[]) : [];
    } catch (error) {
      console.error("Failed to parse exhibition session data:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("exhibition", JSON.stringify(artworks));
    } catch (error) {
      console.error("Session storage limit reached or unavailable:", error);
    }
  }, [artworks]);

  const addArtwork = useCallback((art: Artwork) => {
    setArtworks(prev => {
      // Using a composite key (id + source) prevents duplicate entries 
      // which would cause confusing repetitive content for screen readers
      const exists = prev.find(a => a.id === art.id && a.source === art.source);
      if (exists) return prev;
      return [...prev, art];
    });
  }, []);

  const removeArtwork = useCallback((id: string, source: string) => {
    setArtworks(prev => prev.filter(a => !(a.id === id && a.source === source)));
  }, []);

  const clearExhibition = useCallback(() => {
    if (window.confirm("Are you sure you want to clear your entire exhibition?")) {
      setArtworks([]);
    }
  }, []);

  return (
    <ExhibitionContext.Provider value={{ artworks, addArtwork, removeArtwork, clearExhibition }}>
      {children}
    </ExhibitionContext.Provider>
  );
};

export const useExhibition = () => {
  const context = useContext(ExhibitionContext);
  if (!context) throw new Error("useExhibition must be used within an ExhibitionProvider");
  return context;
};