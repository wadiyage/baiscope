import { fetchMoviesByTitle, fetchMovieDetails } from "./api.js"
import { createSearchCard, createCarouselCard, showSearchResultsSection, clearResults, showNoResults, hideNoResults, updateResultsCount, appendCard } from "./ui.js"

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
    clearResults()
    showSearchResultsSection()

    const movies = await fetchMoviesByTitle(title)
    if (!movies || movies.length === 0) {
        showNoResults()
        updateResultsCount(0, title)
        return
    }

    hideNoResults()
    updateResultsCount(movies.length, title)

    const fullDetailsList = await Promise.all(
        movies.map(movie => fetchMovieDetails(movie.imdbID))
    )

    fullDetailsList.forEach(movie => {
        if (movie) appendCard(createSearchCard(movie))
    })
}

document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const value = document.getElementById('searchInput').value.trim()
        if (value) displaySearchResults(value)
    }
})

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput1').value.trim()
    if (searchInput) displaySearchResults(searchInput)
})

document.getElementById('searchInput1').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById('searchBtn').click()
    }
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

    // Reinitialize Owl Carousel
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