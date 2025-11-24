const API_KEY = "8bf49985"
const BASE_URL = "https://www.omdbapi.com/"

function buildURL(params) {
    return `${BASE_URL}?apikey=${API_KEY}&${params}`
}

async function fetchMoviesByTitle(title) {
    if(!title) return null
    const url = buildURL(`s=${encodeURIComponent(title)}&type=movie`)
    
    try {
        const res = await fetch(url)
        const data = await res.json()
        if(data.Response === "False") return []
        return data.Search
    } catch(error) {
        console.error("Error fetching movies by title: ", error)
        return null
    }
}

async function fetchMovieDetails(imdbID) {
    if (!imdbID) return null
    const url = buildURL(`i=${imdbID}&plot=short`)
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (data.Response === "False") return null
        return data
    } catch (error) {
        console.error("Error fetching movie details: ", error)
        return null
    }
}

export {
    fetchMoviesByTitle,
    fetchMovieDetails
}