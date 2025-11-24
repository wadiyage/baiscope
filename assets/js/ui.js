function createMovieCard(movie) {
    const col = document.createElement('div')
    col.className = 'col'

    col.innerHTML = `
        <div class="card shadow-sm h-100">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'assets/images/placeholder.png'}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body d-flex flex-column">
                <h3 class="fs-3 fw-bold text-body-emphasis">${movie.Title}</h3>
                <div class="d-flex flex-row justify-content-left align-items-center text-body-secondary mb-2">
                    <p class="mb-0 me-1">${movie.imdbRating ? movie.imdbRating+"10" : "N/A"}</p>
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
                    <button type="button" class="btn btn-sm btn-outline-secondary view-details-btn" data-imdbid="${movie.imdbID}">View Details</button>
                </div>
            </div>
        </div>
    `
    return col
}

function showSearchResultsSection() {
    document.getElementById('search-results').style.display = 'block'
}

function clearResults() {
    document.getElementById('cards-container').innerHTML = ""
}

function showNoResults() {
    document.getElementById('no-results').style.display = 'block'
}

function hideNoResults() {
    document.getElementById('no-results').style.display = 'none'
}

function updateResultsCount(count, title) {
    const resultsCount = document.getElementById('results-count')
    resultsCount.textContent = `${count} movies found for "${title}"`
}

function appendCard(card) {
    document.getElementById('cards-container').appendChild(card)
}

export {
    createMovieCard,
    showSearchResultsSection,
    clearResults,
    showNoResults,
    hideNoResults,
    updateResultsCount,
    appendCard
}