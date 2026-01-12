// src/services/api.ts
import axios from "axios";
import type { Artwork } from "../context/ExhibitionContext";

/* ------------------ MET API ------------------ */
export function searchMet(term: string): Promise<Artwork[]> {
  return axios
    .get("https://collectionapi.metmuseum.org/public/collection/v1/search", {
      params: { q: term },
    })
    .then((searchRes) => {
      const objectIDs: number[] = searchRes.data.objectIDs || [];
      const topIDs = objectIDs.slice(0, 10); // limit results

      const artworkPromises = topIDs.map((id) =>
        axios
          .get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
          .then((res) => normalizeMetObject(res.data))
          .catch(() => null) // skip failed fetches
      );

      return Promise.all(artworkPromises).then(
        (results) => results.filter((art): art is Artwork => art !== null) // Type-safe filter
      );
    })
    .catch((err) => {
      console.error("MET API error:", err);
      return []; // fallback empty array
    });
}

function normalizeMetObject(obj: any): Artwork | null {
  if (!obj || !obj.objectID || !obj.primaryImageSmall) return null;
  return {
    id: obj.objectID.toString(),
    source: "MET",
    title: obj.title || "Untitled",
    artist: obj.artistDisplayName || "Unknown",
    date: obj.objectDate || "",
    imageUrl: obj.primaryImageSmall,
    museum: "The Met Museum",
    location: obj.galleryNumber || "",
    externalUrl: obj.objectURL || "",
  };
}

/* ------------------ V&A API ------------------ */
function normalizeVamObject(obj: any): Artwork | null {
  if (!obj || !obj.id || !obj.title) return null; // skip invalid objects
  return {
    id: obj.id.toString(),
    source: "V&A",
    title: obj.title || "Untitled",
    artist: obj.artist?.name || "Unknown",
    date: obj.dated || "",
    imageUrl: obj.images?.[0]?.web?.url || "",
    museum: "Victoria and Albert Museum",
    location: obj.repository || "",
    externalUrl: `https://collections.vam.ac.uk/item/${obj.id}`,
  };
}

export function searchVam(term: string): Promise<Artwork[]> {
  return axios
    .get("https://api.vam.ac.uk/v2/objects/search", { params: { q: term } })
    .then((res) => {
      const records: any[] = res.data.records || [];
      return records
        .slice(0, 10)
        .map(normalizeVamObject)
        .filter((art: Artwork | null): art is Artwork => art !== null); // Type-safe
    })
    .catch((err) => {
      console.error("V&A API error:", err);
      return []; // fallback empty array
    });
}
