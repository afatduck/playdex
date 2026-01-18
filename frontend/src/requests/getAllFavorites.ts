import apiCall from "./apiCall"

function getAllFavorites() {
    return apiCall<Game[]>("/api/favorites")
}

export default getAllFavorites