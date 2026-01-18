import apiCall from "./apiCall"

interface PostCommentResponse {
    comment_id: number
}

function postComment(gameId: number, text: string) {
    const formData = new FormData()
    formData.append("text", text)

    return apiCall<PostCommentResponse>("/api/comment/" + gameId, {
        method: "POST",
        body: formData
    })
}

export default postComment