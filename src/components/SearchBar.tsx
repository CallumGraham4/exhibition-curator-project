import React, { useState } from "react";

type Props = {
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-4 flex w-full max-w-xl mx-auto"
      role="search" // Tells assistive tech this form is specifically for searching
    >
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search artworks..."
        // aria-label is critical here because there is no visible <label> tag
        aria-label="Search for artworks by keyword"
        className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
      <button
        type="submit"
        className="px-6 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;