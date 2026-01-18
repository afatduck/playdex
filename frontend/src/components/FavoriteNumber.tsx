function FavoriteNumber({favorites}: FavoriteNumberProps) {

    return <p>{favorites}⭐</p>
}

interface FavoriteNumberProps {
    favorites: number
}

export default FavoriteNumber