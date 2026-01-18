import { useCallback } from "react"
import { useUserState } from "../UserState"
import postScore from "../requests/postScore"

function UserScore({gameId, userScore, setUserScore, setScore}: UserScoreInterface) {

    const loggedIn = !!useUserState()

    const sumbitScore = useCallback((s?: number) => {
        postScore(gameId, s).then(res => {
            if (res.success) {
                setScore(res.data.new_score)
                setUserScore(s)
            }
        })
    }, [setScore, setUserScore, gameId])

    if (!loggedIn) {
        return <p>Log in to score</p>
    }

    else if (userScore) {
        return <div>
            Your score: {userScore}
            <button className="underline" onClick={() => sumbitScore()}>
                Click to remove
            </button>
        </div>
    }

    return <div className="flex gap-3">
        <button className="underline" onClick={() => sumbitScore(1)}>Score 1</button>
        <button className="underline" onClick={() => sumbitScore(2)}>Score 2</button>
        <button className="underline" onClick={() => sumbitScore(3)}>Score 3</button>
        <button className="underline" onClick={() => sumbitScore(4)}>Score 4</button>
        <button className="underline" onClick={() => sumbitScore(5)}>Score 5</button>
    </div>

}

interface UserScoreInterface {
    gameId: number,
    userScore: number | null,
    setScore: (newScore: number) => void
    setUserScore: (newUserScore?: number) => void
}

export default UserScore