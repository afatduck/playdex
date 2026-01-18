import apiCall from "./apiCall"

function postRegister(username: string, password: string) {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return apiCall<AuthResponse>("/api/register", {
        method: "POST",
        body: formData
    })
}

export default postRegister