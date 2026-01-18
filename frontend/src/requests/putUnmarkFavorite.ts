import apiCall from "./apiCall"

function putUnmarkFavorite(game_id: number) {
    return apiCall("/api/unmark_favorite/" + game_id, {
        method: "PUT"
    })
}

export default putUnmarkFavorite