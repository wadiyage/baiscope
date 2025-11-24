import { fetchMoviesByTitle, fetchMovieDetails } from "./api.js"
import { createMovieCard, showSearchResultsSection, clearResults, showNoResults, hideNoResults, updateResultsCount, appendCard } from "./ui.js"

console.log("Hi, I'm JS, and I'm here to help you build awesome websites!")

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
        if (movie) appendCard(createMovieCard(movie))
    })
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim()
    if (searchInput) displaySearchResults(searchInput)
})

document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById('searchBtn').click()
    }
})



