import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getGame from "../requests/getGame"
import { useFavoritePair } from "../components/favoritePair"
import UserScore from "../components/UserScore"
import { useUserState } from "../UserState"
import PostComment from "../components/PostComment"

function GamePage() {

    const { gameId } = useParams()

    const [game, setGame] = useState<GameExtended | null | undefined>(undefined)

    const { username } = useUserState() ?? {}

    const setScore = useCallback((newScore: number) => {
        setGame(p => {
            if (!p) return p
            return {
                ...p,
                average_score: newScore
            }
        })
    }, [setGame])

    const setUserScore = useCallback((newUserScore?: number) => {
        setGame(p => {
            if (!p) return p
            return {
                ...p,
                user_score: newUserScore ?? null
            }
        })
    }, [setGame])

    const addComment = useCallback((id: number, text: string) => {
        setGame(p => {
            if (!p) return p
            return {
                ...p,
                comments: [
                    ...p.comments,
                    {
                        id: id,
                        username: username!,
                        text
                    }
                ]
            }
        })
    }, [setGame])

    useEffect(() => {
        if (gameId !== undefined) {
            getGame(gameId).then(res => {
                if (res.success) {
                    setGame(res.data)
                    return
                }
                setGame(null)
            })
        }
    }, [setGame, gameId])

    const [FavButton, FavCount] = useFavoritePair(
        (game??{}).id ?? 0,
        (game??{}).favorites_count ?? 0,
    ) // Ne preispituj...radi...

    if (game === undefined) {
        return <p>
            Sekunda...
        </p>
    }

    else if (game === null) {
        return  <p>
            DI JE?! tu nije...
        </p>
    }

    return <div>
        <img src={"/static/artwork/" + (game.id - 1) + ".jpg"} alt={game.title} />
        <h2 className="text-2xl">
            {game.title}
        </h2>
        <p>
            {game.description}
        </p>
        <p>
            Year: {game.year}
        </p>
        <p>
            Score: {game.average_score}
        </p>
        {FavCount}
        {FavButton}
        <UserScore gameId={game.id} setScore={setScore} setUserScore={setUserScore} userScore={game.user_score} />
        <h3 className="text-lg">
            Sto ljudi kazu
        </h3>
        <div className="flex flex-col gap-3">
            {
                !game.comments.length ?
                <p>Ne puno bas tbh</p> :
                game.comments.map(comment => <div key={comment.id}>
                    {
                        comment.username === username ?
                        <p className="font-bold text-cyan-900">
                            You
                        </p>:
                        <p className="font-bold">
                            {comment.username}
                        </p>
                    }
                    <p>{comment.text}</p>
                </div>)
            }
        </div>
        {
            username ? 
            <PostComment gameId={game.id} addCommnent={addComment} /> :
            <p>Logiraj se da bi komentiro</p>
        }

    </div>

}

export default GamePage