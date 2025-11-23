# Baiscope

![Build Status](https://github.com/wadiyage/baiscope/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/tech-HTML5%20|%20CSS3%20|%20JavaScript%20|%20Bootstrap-orange.svg)

A clean, responsive movie discovery web application that helps users search for and explore movies using the OMDb API. Baiscope focuses on a professional layout, intuitive navigation, accessibility and fast discovery flows (search, random discover, browse by keyword or IMDb ID) with a dedicated movie details page and favourites.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration (OMDb API Key)](#configuration-omdb-api-key)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact / Author](#contact--author)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Movie Search by Title:** Quickly search movies by their title and view concise results.
- **Random Movie Generator (Discover a Movie):** Get a random movie suggestion when you want a surprise pick.
- **Browse by Keyword:** Explore movies related to a keyword or phrase.
- **Browse by IMDb ID:** Open or search a movie directly by IMDb ID.
- **Movie Details Page:** View detailed movie information (poster, synopsis, cast, ratings, runtime, release year, and more).
- **Top Rated / Popular Movies Section:** Curated or pre-populated list of top/popular movies.
- **Favourites Section:** Save and revisit favourite movies (persisted in browser localStorage).
- **Responsive Design:** Mobile-first and responsive layouts for devices from phones to desktops using Bootstrap.
- **Footer:** Branding, navigation links, and social icons for easy navigation.

---

## Screenshots / GIFs

> NOTE: Replace these placeholders with real screenshots or GIFs from your application.

- Desktop view: `assets/images/screenshot-desktop.png` (placeholder)
- Mobile view: `assets/images/screenshot-mobile.png` (placeholder)
- Movie details: `assets/images/screenshot-details.png` (placeholder)

You can embed images or animated GIFs here once available. Example markdown:

```
![Desktop view](assets/images/screenshot-desktop.png)
```

---

## Installation

Minimal requirements: a modern browser. The project is static (HTML/CSS/JS) — no server-side components required for basic usage. To run locally:

1. Clone the repository

```powershell
git clone https://github.com/wadiyage/baiscope.git
cd baiscope
```

2. Open locally in a browser

- Option A — Open directly: double-click `index.html` or run:

```powershell
start index.html
```

- Option B — Serve via a lightweight local server (recommended for local API calls or extensions):

```powershell
# Python 3 (serves current folder on port 8000)
python -m http.server 8000; start http://localhost:8000
```

- Option C — Use the VS Code Live Server extension and open the workspace folder then click `Go Live`.

3. (Optional) Install any editor or tooling you prefer (VS Code is recommended for local edits).

---

## Configuration (OMDb API Key)

Baiscope uses the OMDb API for movie data. To enable full dynamic movie lookups, obtain a free OMDb API key:

1. Sign up at http://www.omdbapi.com/apikey.aspx
2. In this repository, open `js/api.js` (or create a `js/config.js`) and set your API key where the code expects it. Example:

```js
// js/api.js
const OMDB_API_KEY = 'YOUR_OMDB_API_KEY';
```

3. Save and reload the app in your browser. With the key configured, search and details features will call the live OMDb service.

Security note: This project is a client-side demo. For production apps, proxy API requests via a server to avoid exposing API keys in client code.

---

## Usage

- **Search by Title:** Use the search input on the home page to type a movie title — press Enter or click search to see results.
- **Discover a Movie:** Click the "Discover" / "Random" button to fetch a random movie suggestion.
- **Browse by Keyword:** Enter a keyword or click a keyword tag to view matching movies.
- **Browse by IMDb ID:** Use the IMDb ID search (e.g., `tt0111161`) to open a movie detail page directly.
- **View Details:** Click a movie card to open the details page with full metadata and poster.
- **Add to Favourites:** On the movie card or details page, click the heart/star icon to add the movie to your favourites list (stored in localStorage).
- **Top Rated / Popular:** Visit the top-rated/popular section on the homepage to browse curated picks.

Accessibility: The UI follows semantic HTML and Bootstrap components to aid screen readers and keyboard navigation. If you find accessibility gaps, please open an issue or contribute.

---

## Folder Structure

Top-level structure (abbreviated):

```
`index.html`           # Home / Search page
`movie.html`           # Movie details page
`favourites.html`      # Saved favourites page
`assets/`              # CSS, JS, images, fonts
  ├─ bootstrap/
  ├─ css/
  ├─ images/
  └─ js/
`js/`                  # Application JavaScript (api.js, main.js, utils.js, detail.js)
`data/`                # Static JSON data (e.g., topRated.json)
```

Key files:

- `index.html` — main discovery/search UI
- `movie.html` — movie detail template
- `js/api.js` — OMDb API integration (set API key here)
- `js/main.js` — main UI logic and event handlers
- `assets/css/style.css` — core styles and overrides

---

## Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/name` or `fix/issue-number`
3. Commit your changes: `git commit -m "Short, descriptive message"`
4. Push to the branch: `git push origin feature/name`
5. Open a Pull Request and describe your changes

Guidelines:

- Keep changes focused and small.
- Follow existing code style (plain JS, Bootstrap classes, semantic HTML).
- If adding new features that require API keys or secrets, provide instructions but do not commit secrets.
- Add or update README sections and screenshots where appropriate.

Optional: Consider adding a `CODE_OF_CONDUCT.md` and small tests where applicable. For larger changes, open an issue first to discuss the design.

---

## License

This project is provided under the MIT License. See `LICENSE` for details (you can add a `LICENSE` file with the full MIT text).

Short license summary: use, copy, modify and distribute freely, but include the original copyright and license notice.

---

## Contact / Author

- **Author:** wadiyage
- **Repository:** `https://github.com/wadiyage/baiscope`
- **Email:** `wadiyage567@gmail.com`

If you have questions or want to collaborate, open an issue or send a PR.

---

## Acknowledgements / References

- OMDb API — http://www.omdbapi.com/ (movie data source)
- Bootstrap — https://getbootstrap.com/ (UI framework)
- Owl Carousel — used for any carousel displays
- Inspiration: various movie discovery UIs and public tutorials

---

Thank you for trying Baiscope — happy movie discovering! 🎬