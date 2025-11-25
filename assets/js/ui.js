import { isFavourite } from "./favourite.js"
function createSearchCard(movie) {
    const col = document.createElement('div')
    col.className = 'col'

    const isFav = isFavourite(movie.imdbID)

    col.innerHTML = `
        <div class="card shadow-sm h-100 position-relative">
            <button id="fav-btn" class="btn ${isFav ? "btn-danger" : "btn-outline-danger"} position-absolute top-0 end-0 m-2 fav-btn" data-id="${movie.imdbID}">
                <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"} fs-4"></i>
            </button>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'assets/images/placeholder.png'}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body d-flex flex-column">
                <h3 class="fs-3 fw-bold text-body-emphasis">${movie.Title}</h3>
                <div class="d-flex flex-row justify-content-left align-items-center text-body-secondary mb-2">
                    <p class="mb-0 me-1">${movie.imdbRating ? movie.imdbRating+"/10" : "N/A"}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </div>
                <strong class="d-inline-block mb-2 text-primary-emphasis">
                    ${movie.Genre ? movie.Genre.split(",").map(g => `<span class="fw-bold">${g.trim()}</span>`).join(" | ") : ""}
                </strong>
                <p class="card-text">${movie.Plot || "No description available."}</p>
                <div class="mt-auto d-flex justify-content-start align-items-center gap-2">
                    <a href="movie-details.html?id=${movie.imdbID}" class="btn btn-sm btn-outline-secondary">View Details</a>
                </div>
            </div>
        </div>
    `
    return col
}

function createCarouselCard(movie) {
    const wrapper = document.createElement('div')
    wrapper.className = 'item'

    wrapper.innerHTML = `
        <div class="card shadow-sm h-100 position-relative movie-card">
            <button class="btn btn-outline-danger position-absolute top-0 end-0 m-2 fav-btn" data-id="${movie.imdbID}">
                <i class="bi bi-heart fs-4"></i>
            </button>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'assets/images/placeholder.png'}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body d-flex flex-column">
                <h3 class="fs-3 fw-bold text-body-emphasis">${movie.Title}</h3>
                <div class="d-flex flex-row justify-content-left align-items-center text-body-secondary mb-2">
                    <p class="mb-0 me-1">${movie.imdbRating ? movie.imdbRating+"/10" : "N/A"}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </div>
                <strong class="d-inline-block mb-2 text-primary-emphasis">
                    ${movie.Genre ? movie.Genre.split(",").map(g => `<span class="fw-bold">${g.trim()}</span>`).join(" | ") : ""}
                </strong>
                <p class="card-text movie-plot">${movie.Plot || "No description available."}</p>
                <div class="mt-auto d-flex justify-content-start align-items-center gap-2">
                    <a href="movie-details.html?id=${movie.imdbID}" class="btn btn-sm btn-outline-secondary">View Details</a>
                </div>

            </div>
        </div>
    `
    return wrapper
}

function showSearchResultsSection() {
    document.getElementById('search-results').style.display = 'block'
}

function showBrowseKeywordSearchResultsSection() {
    document.getElementById('browse-keyword-search-results').style.display = 'block'
}

function showBrowseIDSearchResultsSection() {
    document.getElementById('browse-id-search-results').style.display = 'block'
}

function clearSearchResults() {
    document.getElementById('hero-cards-container').innerHTML = ""
}

function clearBrowseKeywordSearchResults() {
    document.getElementById('keyword-cards-container').innerHTML = ""
}

function clearBrowseOMDbIDSearchResults() {
    document.getElementById('id-cards-container').innerHTML = ""
}

function showSearchNoResults() {
    document.getElementById('hero-no-results').style.display = 'block'
}

function hideSearchNoResults() {
    document.getElementById('hero-no-results').style.display = 'none'
}

function showBrowseKeywordSearchNoResults() {
    document.getElementById('keyword-no-results').style.display = 'block'
}

function hideBrowseKeywordSearchNoResults() {
    document.getElementById('keyword-no-results').style.display = 'none'
}

function showBrowseOMDbIDSearchNoResults() {
    document.getElementById('id-no-results').style.display = 'block'
}

function hideBrowseOMDbIDSearchNoResults() {
    document.getElementById('id-no-results').style.display = 'none'
}

function updateSearchResultsCount(count, title) {
    const resultsCount = document.getElementById('hero-results-count')
    resultsCount.textContent = `${count} movies found for "${title}"`
}

function updateBrowseKeywordSearchResultsCount(count, title) {
    const resultsCount = document.getElementById('keyword-results-count')
    resultsCount.textContent = `${count} movies found for "${title}"`
}

function updateBrowseOMDbIDSearchResultsCount(count, title) {
    const resultsCount = document.getElementById('id-results-count')
    resultsCount.textContent = `${count} movies found for "${title}"`
}

function appendSearchCard(card) {
    document.getElementById('hero-cards-container').appendChild(card)
}

function appendBrowseKeywordSearchCard(card) {
    document.getElementById('keyword-cards-container').appendChild(card)
}

function appendBrowseOMDbIDSearchCard(card) {
    document.getElementById('id-cards-container').appendChild(card)
}

export {
    createSearchCard,
    createCarouselCard,
    showSearchResultsSection,
    showBrowseKeywordSearchResultsSection,
    showBrowseIDSearchResultsSection,
    clearSearchResults,
    clearBrowseKeywordSearchResults,
    clearBrowseOMDbIDSearchResults,
    showSearchNoResults,
    hideSearchNoResults,
    showBrowseKeywordSearchNoResults,
    hideBrowseKeywordSearchNoResults,
    showBrowseOMDbIDSearchNoResults,
    hideBrowseOMDbIDSearchNoResults,
    updateSearchResultsCount,
    updateBrowseKeywordSearchResultsCount,
    updateBrowseOMDbIDSearchResultsCount,
    appendSearchCard,
    appendBrowseKeywordSearchCard,
    appendBrowseOMDbIDSearchCard
}