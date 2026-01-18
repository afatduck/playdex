import { useEffect, useState } from "react"
import getAllGames from "../requests/getAllGames"
import GameItem from "../components/GameItem"

function GamesPage() {

    const [games, setGames] = useState<Game[] | null>(null)

    useEffect(() => {
        getAllGames().then(res => {
            if (res.success) {
                setGames(res.data)
            } 
        })
    }, [setGames])

    if (games === null) {
        return <p>Loading</p>
    }

    return <>
    {
        games.map(game =>
            <GameItem game={game} key={game.id} />
        )
    }
    </>
}

export default GamesPage