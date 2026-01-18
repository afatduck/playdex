import apiCall from "./apiCall"

function getGame(gameId: string) {
    return apiCall<GameExtended>("/api/game/" + gameId)
}

export default getGame