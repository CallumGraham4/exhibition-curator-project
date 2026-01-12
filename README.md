**🎨 Virtual Art Exhibition – Exhibition Curator Project**

A viewer-driven virtual exhibition platform that allows users to explore artworks from world-renowned museums and curate a personalised exhibition during their session.

This project was built as part of the Tech Returners Launchpad – Exhibition Curator Project for the Software Engineering Skills Bootcamp.

**🌍 Live Demo**

Live site:
https://your-project-name.vercel.app

(Replace with your Netlify / Vercel / GitHub Pages URL)

**🖼️ Project Overview**

Users can search for artworks across multiple museum collections, view detailed information and images, and curate a personal exhibition that persists for the duration of their session.

The application brings together data from multiple public museum APIs to support researchers, students, and art enthusiasts in discovering and comparing artworks across institutions.

**✅ Key Features**

🔍 Search artworks using keywords

🏛️ Aggregated results from multiple museum APIs

🖼️ Artwork thumbnails with detailed modal views

🎨 Curate a personal exhibition

🔁 Add/remove artworks from exhibition

📽️ Slideshow view of curated exhibition

🔗 External links to official museum catalogue pages

♿ Accessibility-aware UI (ARIA roles, screen reader support)

📱 Fully responsive design

**🧩 APIs Used**

This project uses two free public museum APIs, satisfying the Launchpad requirement:

The Metropolitan Museum of Art Collection API

Victoria and Albert Museum (V&A) API

All APIs used are free and do not require paid tiers.

**🛠️ Tech Stack**

React

TypeScript

Tailwind CSS

Context API (state management)

Vite (build tooling)

**♿ Accessibility Considerations**

Semantic HTML landmarks

ARIA roles for dialogs and live regions

Screen-reader announcements for loading and search status

Keyboard-accessible controls

Clear visual focus indicators

Accessibility was considered throughout the UI and interaction design.

**🚀 Running the Project Locally**
**Prerequisites**

Node.js (v18 or later recommended)

npm

**Installation**

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install

Run the app
npm run dev


The app will be available at:
http://localhost:5173

**🏗️ Project Structure (Overview)**
src/
├── components/
│   ├── ArtworkGrid.tsx
│   ├── ArtworkModal.tsx
│   ├── ExhibitionPanel.tsx
│   ├── ExhibitionSlideshow.tsx
│   └── SearchBar.tsx
├── context/
│   └── ExhibitionContext.tsx
├── services/
│   └── api.ts
├── App.tsx
└── main.tsx

**📈 Possible Extensions**

Persistent exhibitions using user accounts

Shareable exhibition links

Advanced filtering and sorting

Saved searches

Social media sharing

Backend storage using a non-relational database

**👤 Author**

Callum Graham

Freelance Software Developer – Tech Returners

GitHub: https://github.com/CallumGraham4

LinkedIn: https://www.linkedin.com/in/callum-graham-7a68a5215/

**📄 Acknowledgements**

Tech Returners

The Metropolitan Museum of Art

Victoria and Albert Museum
