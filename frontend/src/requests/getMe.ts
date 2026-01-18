import apiCall from "./apiCall"

function getMe() {
    return apiCall<AuthResponse>("/api/me")
}

export default getMe