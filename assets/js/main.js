import { fetchMoviesByKeyword, fetchMovieByTitle, fetchMovieDetails } from "./api.js";
import {
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
} from "./ui.js";
import { toggleFavourite, isFavourite, getFavourites } from "./favourite.js";

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        540: {
            items: 2,
            nav: false
        },
        720: {
            items: 3,
            nav: false
        },
        960: {
            items: 4,
            nav: true,
            loop: false
        },
        1140: {
            items: 5,
            nav: true,
            loop: false
        }
    }
})
async function displaySearchResults(title) {
    clearSearchResults()
    showSearchResultsSection()

    if (!title) return

    const movie = await fetchMovieByTitle(title)
    if (!movie) {
        showSearchNoResults()
        updateSearchResultsCount(0, title)
        return
    }

    hideSearchNoResults()
    updateSearchResultsCount(1, title)
    appendSearchCard(createSearchCard(movie))
}

const searchInput = document.getElementById('searchInput')
searchInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const title = searchInput.value.trim()
        searchInput.value = ""
        if (title) displaySearchResults(title)
    }
})

const searchInput1 = document.getElementById('searchInput1')
searchInput1.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const title = searchInput1.value.trim()
        searchInput1.value = ""
        if (title) displaySearchResults(title)
    }
})

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', () => {
    const value = searchInput1.value.trim()
    if (value) displaySearchResults(value)
})

async function discoverRandomMovie() {
    const RANDOM_MOVIES = [
        "tt1160419", "tt10872600", "tt8847712", "tt9639470", "tt2382320",
        "tt6710474", "tt1745960", "tt1877830", "tt11886850", "tt8178634",
        "tt14444726", "tt1630029", "tt15398776", "tt11214590", "tt9813776",
        "tt14849194", "tt7160372", "tt17009710", "tt14230458", "tt17351924",
        "tt9603212", "tt10366206", "tt1517268", "tt1136617", "tt15239678",
        "tt17279496", "tt17009710", "tt9214772", "tt5535276", "tt1684562",
        "tt13433802", "tt6263850", "tt22022452", "tt12037194", "tt22022426",
        "tt15454066", "tt15172680", "tt6850440", "tt12584954", "tt27882189",
        "tt15314262", "tt6166392", "tt13287846", "tt22687790", "tt16428256",
        "tt13833688", "tt19770238", "tt9764362", "tt11564570", "tt12593682"
    ];

    const poster = document.getElementById("discoverPoster")
    poster.style.opacity = 0.5

    const randomID = RANDOM_MOVIES[Math.floor(Math.random() * RANDOM_MOVIES.length)]
    const movie = await fetchMovieDetails(randomID)
    if (!movie) return

    document.getElementById("discoverTitle").innerText = movie.Title
    document.getElementById("discoverRating").innerText = movie.imdbRating !== "N/A" ? movie.imdbRating : "No rating"
    document.getElementById("discoverPlot").innerText = movie.Plot
    document.getElementById("discoverDirector").innerText = movie.Director
    document.getElementById("discoverActors").innerText = movie.Actors
    document.getElementById("discoverPoster").src = movie.Poster !== "N/A" ? movie.Poster : "assets/images/no-poster.png"
    document.getElementById("discoverLink").href = `movie-details.html?id=${movie.imdbID}`

    poster.style.opacity = 1
}

document.querySelector('#discoverBtn').addEventListener("click", discoverRandomMovie)

const TOP_RATED_MOVIES = [
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0468569", // The Dark Knight
    "tt0108052", // Schindler's List
    "tt0167260", // The Lord of the Rings: The Return of the King
    "tt0137523", // Fight Club
    "tt1375666"  // Inception
];


async function displayTopRatedMovies() {
    const carousel = document.querySelector('.owl-carousel')
    carousel.innerHTML = ""

    const movies = await Promise.all(
        TOP_RATED_MOVIES.map(id => fetchMovieDetails(id))
    )

    movies.forEach(movie => {
        if (movie) {
            carousel.appendChild(createCarouselCard(movie))
        }
    })

    $('.owl-carousel').trigger('destroy.owl.carousel')
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: { items: 1, nav: true },
            540: { items: 2, nav: false },
            720: { items: 3, nav: false },
            960: { items: 4, nav: true, loop: false },
            1140: { items: 5, nav: true, loop: false }
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {
    displayTopRatedMovies()
})

async function displayBrowseKeywordSearchResultsSection(keyword) {
    clearBrowseKeywordSearchResults()
    showBrowseKeywordSearchResultsSection()

    if (!keyword) return

    const movies = await fetchMoviesByKeyword(keyword)
    if (!movies || movies.length === 0) {
        showBrowseKeywordSearchNoResults()
        updateBrowseKeywordSearchResultsCount(0, keyword)
        return
    }

    hideBrowseKeywordSearchNoResults()
    updateBrowseKeywordSearchResultsCount(movies.length, keyword)

    const fullDetailsList = await Promise.all(
        movies.map(movie => fetchMovieDetails(movie.imdbID))
    )

    fullDetailsList.forEach(movie => {
        if (movie) appendBrowseKeywordSearchCard(createSearchCard(movie))
    })
}


const keywordButtons = document.querySelectorAll('.keyword-btn')
keywordButtons.forEach(button => {
    button.addEventListener('click', () => {
        keywordButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')

        const keyword = button.dataset.keyword
        if (keyword) displayBrowseKeywordSearchResultsSection(keyword)
    })
})

const keywordInput = document.getElementById('keywordInput');
keywordInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const keyword = keywordInput.value.trim()
        keywordInput.value = ""
        if (keyword) {
            keywordButtons.forEach(btn => btn.classList.remove('active'))
            displayBrowseKeywordSearchResultsSection(keyword)
        }
    }
});

async function displayBrowseOMDbIDSearchResultsSection(omdbID) {
    clearBrowseOMDbIDSearchResults()
    showBrowseIDSearchResultsSection()

    if (!omdbID) return

    const movie = await fetchMovieDetails(omdbID)
    if (!movie) {
        showBrowseOMDbIDSearchNoResults()
        updateBrowseOMDbIDSearchResultsCount(0, omdbID)
        return
    }

    hideBrowseOMDbIDSearchNoResults()
    updateBrowseOMDbIDSearchResultsCount(1, omdbID)
    appendBrowseOMDbIDSearchCard(createSearchCard(movie))
}

let omdbIDInput = document.getElementById('omdbIDInput')
console.log(omdbIDInput)
omdbIDInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const omdbID = omdbIDInput.value.trim()
        omdbIDInput.value = ""
        if (omdbID) displayBrowseOMDbIDSearchResultsSection(omdbID)
    }
})

const latestMovieIDs = [
    "tt11315808", // Joker: Folie à Deux
    "tt1262426",  // Wicked
    "tt12037194", // Furiosa (already present but keeping as-is)
    "tt6263850",  // Deadpool & Wolverine (already present)
    "tt32820897", // Demon Slayer: Infinity Castle
    "tt28650488", // Super Mario Galaxy Movie
    "tt1757678", // Avatar: Fire and Ash
    "tt22898462", // The Conjuring: Last Rites
    "tt4712810",  // Now You See Me: Now You Don't
    "tt11378946", // Michael
    "tt21357150", // Avengers: Doomsday
    "tt0427340",  // Masters of the Universe
    "tt19847976", // Wicked: For Good
    "tt17023012", // The Home
    "tt2049403"   // Beetlejuice Beetlejuice
]

document.addEventListener("click", async (event) => {
    const btn = event.target.closest(".fav-btn")
    if (!btn) return

    const omdbID = btn.dataset.id

    toggleFavourite(omdbID)

    const isFav = isFavourite(omdbID)

    btn.classList.toggle("btn-danger", isFav)
    btn.classList.toggle("btn-outline-danger", !isFav)

    const icon = btn.querySelector("i")
    icon.classList.toggle("bi-heart-fill", isFav)
    icon.classList.toggle("bi-heart", !isFav)

    if (document.body.classList.contains("fav-page")) {
        loadFavourites()
    }
})

async function loadFavourites() {
    const container = document.querySelector(
        ".fav-section .row"
    )

    const emptyState = document.querySelector(".fav-empty")
    container.innerHTML = ""

    const favs = getFavourites()
    if (favs.length === 0) {
        emptyState.classList.remove("d-none")
        return
    }

    emptyState.classList.add("d-none")

    const movies = await Promise.all(
        favs.map(id => fetchMovieDetails(id))
    )

    movies.forEach(movie => {
        container.appendChild(createSearchCard(movie))
    })
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".fav-section")) {
        document.body.classList.add("fav-page")
        loadFavourites()
    }
})

async function loadLatestMovies() {
    const container = document.querySelector(".browse-latest")
    container.innerHTML = ""

    const movies = await Promise.all(
        latestMovieIDs.map(id => fetchMovieDetails(id))
    )

    movies.forEach(movie => {
        if (movie) {
            container.appendChild(createSearchCard(movie))
        }
    })

    container.classList.remove("d-none")
}

const browseLatestBtn = document.getElementById("browseLatestBtn")
if (browseLatestBtn) {
    browseLatestBtn.addEventListener("click", () => {
        document.querySelector(".fav-empty").classList.add("d-none")
        loadLatestMovies()
    })
}