import { Link } from "react-router-dom"
import { useFavoritePair } from "./favoritePair"

function GameItem({game} : GameItemProps) {
    const [FavCount, FavButton] = useFavoritePair(game.id, game.favorites_count)

    return <div className="mb-8 flex">
        <img src={`/static/artwork/${game.id - 1}.jpg`} className="object-contain" alt="Igra e" />
        <div>
            <p>{game.title}</p>
            <p>{game.description}</p>
            <p>{game.average_score}</p>
            <p>{game.year}</p>
            {FavCount}
            {FavButton}
            <Link to={`/game/${game.id}`} className="underline">More...</Link>
        </div>
    </div>
}

interface GameItemProps {
    game: Game
}

export default GameItem