function getFavourites() {
    return JSON.parse(localStorage.getItem('favourites')) || [];
}

function saveFavourites(list) {
    localStorage.setItem('favourites', JSON.stringify(list));
}

function toggleFavourite(id) {
    let favs = getFavourites()
    if (favs.includes(id)) {
        favs = favs.filter(fav => fav !== id);
    } else {
        favs.push(id);
    }
    saveFavourites(favs);
}

function isFavourite(id) {
    const favs = getFavourites();
    return favs.includes(id);
}

export {
    getFavourites,
    saveFavourites,
    toggleFavourite,
    isFavourite
}