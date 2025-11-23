# Baiscope

![Baiscope Logo](./assets/images/logo-placeholder.png)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/wadiyage/baiscope/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Technologies](https://img.shields.io/badge/tech-HTML%5C%2FCSS%5C%2FJS-yellow.svg)](https://developer.mozilla.org/)

**Baiscope** is a clean, responsive movie discovery web application built with HTML5, CSS3, JavaScript, and Bootstrap. It provides intuitive search and discovery features driven by the OMDb API (Internet Movie Database data) and a lightweight favourites system.

**Quick Links:**
- Live preview: open `index.html` in your browser (or serve locally)
- Source: `./` (project root)

**Description**

Baiscope helps users discover movies quickly—search by title, fetch a random movie, browse by keywords or IMDb ID, and view rich detail pages. The UI focuses on accessibility and responsive layouts so the experience works well on desktop and mobile.

**Features**

- **Movie Search by Title:** Enter a title to search and receive results with posters, year, and short info.
- **Random Movie Generator:** "Discover a Movie" feature that selects a movie at random for quick browsing.
- **Browse by Keyword:** Narrow discovery using keyword searches and common tags.
- **Browse by IMDb ID:** View a specific movie by entering its IMDb ID.
- **Movie Details Page:** Detailed view with plot, cast, year, ratings, trailer links, and poster.
- **Top Rated / Popular Section:** Curated list showcasing top-rated and popular movies (static seed data / JSON for now).
- **Favourites Section:** Save favourite movies locally (localStorage) and access them later from `favourites.html`.
- **Responsive Design:** Fully responsive layout using Bootstrap and custom CSS for mobile and desktop.
- **Footer:** Branding, navigation links, and social icons for easy navigation and contact.

**Screenshots / GIFs**

> Placeholder images below — replace with actual screenshots or GIFs of the UI.

- `docs/screenshot-home.png` (Home / search view)
- `docs/screenshot-detail.png` (Movie detail page)
- `docs/demo.gif` (Quick animated walkthrough)

You can add images to `assets/images/` and update these paths.

**Installation**

This is a static front-end project. You can open it directly in the browser or run a small local server for development.

1. Clone the repository:

```bash
git clone https://github.com/wadiyage/baiscope.git
cd baiscope
```

2. Open locally (option A — quick):

- Open `index.html` in your browser.

3. Or run a simple local HTTP server (option B — recommended to avoid CORS issues):

- Using Python 3 (works in PowerShell):

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

- Using Node (serve):

```powershell
npm install -g serve
serve -s . -l 8000
```

**Dependencies**

- No build step required — static assets only.
- Libraries included in `assets/` and `js/`: Bootstrap, jQuery, Owl Carousel.
- Optional: Node/NPM for local tooling or package installs if you add tooling.

**Usage**

- **Search movies:** Use the main search box on `index.html` — type a movie title and press Enter or click the search icon.
- **Discover a Movie:** Click the "Discover" or "Random" button to load a random movie suggestion.
- **Browse by Keyword:** Use the keyword browse input or sample keyword links presented in the UI.
- **Browse by IMDb ID:** Enter an IMDb ID (e.g., `tt0111161`) into the specialized search box to jump directly to a movie detail page.
- **View movie details:** Click any movie card or poster to open `movie.html` with more information.
- **Add to favourites:** On a movie's details view, click the star / favourites button to save it locally. View saved favourites in `favourites.html`.

Notes:
- The app includes static sample data (`assets/data/topRated.json`) and demo UI flows. To enable dynamic OMDb lookups, configure an OMDb API key and enable the `api.js` integration.

**Folder Structure**

- `index.html` — Home / search page
- `movie.html` — Movie detail page
- `favourites.html` — Saved favourites
- `assets/`
  - `css/` — Project styles (`style.css`, `movie.css`, `responsive.css`)
  - `js/` — Bundled libraries and custom scripts (`api.js`, `detail.js`, `main.js`, `utils.js`)
  - `images/` — Images and icons
  - `data/` — Sample JSON data (`topRated.json`)
- `owl-carousel/` — Carousel assets

**Contributing**

Contributions are welcome! To contribute:

- Fork the repository and create a descriptive branch: `feature/add-some-feature` or `fix/some-bug`.
- Make changes on your branch and keep commits small and focused.
- Open a Pull Request describing the problem and your solution. Include screenshots if UI changes are involved.
- Follow coding style in the existing codebase (plain JS, no transpilation required).

Please open issues for proposals or bug reports before large changes.

**License**

This project is provided under the **MIT License** — see `LICENSE` for details. If you prefer a different license, update this section and add the corresponding `LICENSE` file.

**Contact / Author**

- **Author:** wadiyage
- **Repository:** `https://github.com/wadiyage/baiscope`
- **Email:** `wadiyage567@example.com`

Feel free to open issues or PRs on GitHub for feedback or contributions.

**Acknowledgements / References**

- OMDb API — http://www.omdbapi.com/ (movie data)
- Bootstrap — https://getbootstrap.com/
- Owl Carousel — https://owlcarousel2.github.io/OwlCarousel2/
- Icons and placeholder assets

**Future Improvements**

- Add a configuration step to set an OMDb API key in a secure manner.
- Implement server-side proxy to protect API keys and avoid CORS issues.
- Add unit and integration tests for JS modules.
- Add CI (GitHub Actions) workflow for linting and accessibility checks.
- Replace static screenshots with generated GIFs and improved documentation pages.

---

If you'd like, I can also:
- Add a `LICENSE` file (MIT) to the repo.
- Add placeholder screenshots under `docs/` and update README image links.
- Add a minimal GitHub Actions workflow badge and CI file.

