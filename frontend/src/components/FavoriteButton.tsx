import { useCallback, useMemo } from "react"
import { useUserDispatch, useUserState } from "../UserState"
import putMarkFavorite from "../requests/putMarkFavorite"
import putUnmarkFavorite from "../requests/putUnmarkFavorite"
import { useNavigate } from "react-router-dom"

function FavoriteButton({gameId, onDecrease, onIncrease}: FavoriteButtonProps) {

    const userState = useUserState()
    const userDispatch = useUserDispatch()
    const navigate = useNavigate()

    const gameLiked = useMemo(() => {
        return userState && userState.favorites.includes(gameId)
    }, [userState])

    const markFavorite = useCallback(() => {
        putMarkFavorite(gameId).then(res => {
            if (res.success) {
                userDispatch({
                    type: "ADD_FAVORITE",
                    payload: gameId
                })
                onIncrease && onIncrease()
            }
            else alert(res.detail)
        })
    }, [userDispatch, onIncrease])

    const unmarkFavorite = useCallback(() => {
        putUnmarkFavorite(gameId).then(res => {
            if (res.success) {
                userDispatch({
                    type: "REMOVE_FAVORITE",
                    payload: gameId
                })
                onDecrease && onDecrease()
            }
            else alert(res.detail)
        })
    }, [userDispatch, onDecrease])

    const handleClick = useCallback(() => {
        if (!userState) { 
            navigate("/login")
            return
        }
        if (gameLiked) unmarkFavorite()
        else markFavorite()
    }, [userState, gameLiked, unmarkFavorite, markFavorite, navigate])

    return (
    gameLiked ?
    <button className="p-3 bg-red-300" onClick={handleClick}>not likey likey</button> :
    <button className="p-3 bg-yellow-300" onClick={handleClick}>likey likey</button> 
    )
}

interface FavoriteButtonProps {
    gameId: number,
    onIncrease?: () => void,
    onDecrease?: () => void
}

export default FavoriteButton