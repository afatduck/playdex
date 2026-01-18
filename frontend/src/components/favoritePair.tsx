import { useCallback, useState } from "react"
import FavoriteButton from "./FavoriteButton"
import FavoriteNumber from "./FavoriteNumber"

function useFavoritePair(gameId: number, favorites: number) { 
    const [offset, setOffset] = useState(0)

    const onDecrease = useCallback(() => {
        setOffset(p => p - 1)
    }, [])
    
    const onIncrease = useCallback(() => {
        setOffset(p => p + 1)
    }, [])

    const displayFavorites = favorites + offset

    return [
        <FavoriteButton gameId={gameId} onDecrease={onDecrease} onIncrease={onIncrease} />,
        <FavoriteNumber favorites={displayFavorites} />
    ]
}
export { useFavoritePair }
