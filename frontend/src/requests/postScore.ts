import apiCall from "./apiCall"

interface PostScoreResponse {
    new_score: number
}

function postScore(gameId: number, score?: number) {
    const formData = new FormData()
    if (score) formData.append("score", score+"")

    return apiCall<PostScoreResponse>("/api/score/" + gameId, {
        method: "POST",
        body: formData
    })
}

export default postScore