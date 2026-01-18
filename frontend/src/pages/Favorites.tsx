import { useEffect, useMemo, useState } from "react"
import getAllFavorites from "../requests/getAllFavorites";
import { useUserState } from "../UserState";
import { Navigate } from "react-router-dom";
import GameItem from "../components/GameItem";

function FavoritesPage() {
    const [games_, setGames] = useState<Game[] | null>(null)
    const { favorites } = useUserState() || {}

    useEffect(() => {
        getAllFavorites().then(res => {
            if (res.success) {
                setGames(res.data)
            } 
        })
    }, [setGames])
    
    let games = useMemo(() => {
        if (!games_ || !favorites) return null
        return games_.filter(game => favorites.includes(game.id))
    }, [games_, favorites])
    
    if (games === null) {
        return <p>Loading</p>
    }
    
    if (!games.length) {
        return <p>Nista ne volis...</p>
    }

    if (favorites === undefined) {
        return <Navigate to={"/"} />
    }
    
    return <>
    {
        games.map(game =>
            <GameItem game={game} key={game.id} />
        )
    }
    </>
}

export default FavoritesPage