const OMDB_API_KEY = "8bf49985";
const FAV_KEY = "baiscope_favourites";

const posterEl = document.getElementById("poster");
const titleEl = document.getElementById("title");
const detailTitleEl = document.getElementById("detailTitle");
const headerTitleEl = document.getElementById("headerTitle");
const yearEl = document.getElementById("year");
const releasedEl = document.getElementById("released");
const runtimeEl = document.getElementById("runtime");
const languageEl = document.getElementById("language");
const countryEl = document.getElementById("country");
const genreBadgesEl = document.getElementById("genreBadges");
const imdbRatingEl = document.getElementById("imdbRating");
const directorEl = document.getElementById("director");
const actorsEl = document.getElementById("actors");
const castListEl = document.getElementById("castList");
const plotEl = document.getElementById("plot");
const boxofficeEl = document.getElementById("boxoffice");
const awardsEl = document.getElementById("awards");
const similarGrid = document.getElementById("similarGrid");
const messageEl = document.getElementById("message");

const favBtn = document.getElementById("favBtn");
const backBtn = document.getElementById("backBtn");
const playTrailerBtn = document.getElementById("playTrailerBtn");
const shareBtn = document.getElementById("shareBtn");


const imdbID = new URLSearchParams(window.location.search).get("id");

init();

function init() {
  backBtn.addEventListener("click", () => window.history.back());
  playTrailerBtn.addEventListener("click", openTrailerSearch);
  shareBtn.addEventListener("click", shareMovie);

  if (!imdbID) {
    showMessage("No movie ID provided in URL.", "danger");
    disableActions();
    return;
  }

  fetchMovie(imdbID);
}

async function fetchMovie(id) {
  showMessage("Loading movie details...", "info");

  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      showMessage(data.Error, "warning");
      disableActions();
      return;
    }

    populateUI(data);
    showMessage("");

    // fetch similar movies
    const firstGenre = data.Genre?.split(",")[0].trim();
    if (firstGenre) fetchSimilar(firstGenre, data.imdbID);

  } catch (err) {
    console.error(err);
    showMessage("Failed to load movie data", "danger");
  }
}

function populateUI(m) {
  // Poster
  posterEl.src = m.Poster !== "N/A" ? m.Poster : "assets/images/placeholder-poster.png";

  titleEl.textContent = m.Title;
  detailTitleEl.textContent = m.Title;
  headerTitleEl.textContent = `Baiscope — ${m.Title}`;

  yearEl.textContent = m.Year || "—";
  releasedEl.textContent = m.Released || "—";
  runtimeEl.textContent = m.Runtime || "—";
  languageEl.textContent = m.Language || "—";
  countryEl.textContent = m.Country || "—";
  boxofficeEl.textContent = m.BoxOffice || "—";
  awardsEl.textContent = m.Awards || "—";

  genreBadgesEl.innerHTML = "";
  (m.Genre?.split(",") || []).forEach(g => {
    const span = document.createElement("span");
    span.className = "badge bg-secondary me-1 mb-1";
    span.textContent = g.trim();
    genreBadgesEl.appendChild(span);
  });

  imdbRatingEl.textContent = m.imdbRating !== "N/A" ? `${m.imdbRating} ★` : "—";
  directorEl.textContent = m.Director || "—";
  actorsEl.textContent = m.Actors || "—";
  castListEl.textContent = m.Actors || "—";

  plotEl.textContent = m.Plot || "—";

  const exists = getFavorites().some(item => item.imdbID === m.imdbID);
  setFavButtonState(exists);

  favBtn.onclick = () => toggleFavorite(m);
}

async function fetchSimilar(keyword, excludeId) {
  similarGrid.innerHTML = `<p class="text-muted">Loading recommendations...</p>`;

  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${keyword}&type=movie`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    similarGrid.innerHTML = `<p class="text-muted">No recommendations found.</p>`;
    return;
  }

  const picks = data.Search.filter(m => m.imdbID !== excludeId).slice(0, 6);

  similarGrid.innerHTML = "";

  picks.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4";

    col.innerHTML = `
      <div class="card h-100" style="cursor:pointer;">
        <img class="card-img-top" src="${p.Poster}" alt="">
        <div class="card-body p-2">
          <h6 class="card-title h6 mb-1">${p.Title}</h6>
          <div class="small text-muted">${p.Year}</div>
        </div>
      </div>
    `;

    col.addEventListener("click", () => {
      window.location.href = `movie-details.html?id=${p.imdbID}`;
    });

    similarGrid.appendChild(col);
  });
}


function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
}

function saveFavorites(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function setFavButtonState(isFav) {
  if (isFav) {
    favBtn.textContent = "Added to Watchlist";
    favBtn.classList.replace("btn-primary", "btn-success");
  } else {
    favBtn.textContent = "Add to Watchlist";
    favBtn.classList.replace("btn-success", "btn-primary");
  }
}

function toggleFavorite(movie) {
  let list = getFavorites();
  const exists = list.some(m => m.imdbID === movie.imdbID);

  if (exists) {
    list = list.filter(m => m.imdbID !== movie.imdbID);
    showMessage("Removed from watchlist.", "info");
  } else {
    list.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    });
    showMessage("Added to watchlist.", "success");
  }

  saveFavorites(list);
  setFavButtonState(!exists);
}

function openTrailerSearch() {
  const q = encodeURIComponent(detailTitleEl.textContent + " trailer");
  window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank");
}

function shareMovie() {
  if (navigator.share) {
    navigator.share({
      title: detailTitleEl.textContent,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showMessage("Link copied to clipboard", "success");
  }
}

function showMessage(msg, type = "info") {
  if (!msg) {
    messageEl.innerHTML = "";
    return;
  }
  messageEl.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}

function disableActions() {
  favBtn.disabled = true;
  playTrailerBtn.disabled = true;
  shareBtn.disabled = true;
}
