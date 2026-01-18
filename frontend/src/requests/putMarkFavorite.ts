import apiCall from "./apiCall"

function putMarkFavorite(game_id: number) {
    return apiCall("/api/mark_favorite/" + game_id, {
        method: "PUT"
    })
}

export default putMarkFavorite