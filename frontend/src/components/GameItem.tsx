import { Link } from 'react-router-dom';
import { useFavoritePair } from './favoritePair';
import { motion } from 'motion/react';

function GameItem({ game }: GameItemProps) {
  const [FavCount, FavButton] = useFavoritePair(game.id, game.favorites_count);

  const stopBubbling = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/game/${game.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-6 flex flex-col sm:flex-row gap-4 md:gap-6 hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}>
        <img
          src={`/static/artwork/${game.id - 1}.jpg`}
          className="w-full sm:w-40 h-40 sm:h-56 object-cover rounded-lg shrink-0"
          alt={game.title}
        />
        <div className="flex flex-col justify-between flex-1 mt-0 sm:mt-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {game.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-3">
              {game.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs md:text-sm text-gray-700 mb-3">
              <p>
                <span className="font-semibold">Year:</span> {game.year}
              </p>
              <p>
                <span className="font-semibold">Score:</span>{' '}
                {(game.average_score ?? 0).toFixed(1)}/5
              </p>
              <p>{FavButton}</p>
            </div>
            <div className="w-fit" onClick={stopBubbling}>
              {FavCount}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

interface GameItemProps {
  game: Game;
}

export default GameItem;
