import apiCall from "./apiCall"

function postLogin(username: string, password: string) {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return apiCall<AuthResponse>("/api/login", {
        method: "POST",
        body: formData
    })
}

export default postLogin