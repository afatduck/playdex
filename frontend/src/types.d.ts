interface Game {
    id: number,
    description: string
    title: string,
    year: string,
    average_score: number?,
    favorites_count: number,
}

interface GameExtended extends Game {
    user_score: number | null,
    comments: GameComment[]
}

interface UserState {
    id: number,
    username: string,
    favorites: number[]
}

interface ResponseUser {
    id: number,
    username: string,
    favorites: {
        game_id: number
    }[]
}

interface AuthResponse {
    user: ResponseUser,
    jwt: string
}

interface GameComment {
    id: number,
    username: string,
    text: string
}