import apiCall from "./apiCall"

function getAllGames() {
    return apiCall<Game[]>("/api/games")
}

export default getAllGames