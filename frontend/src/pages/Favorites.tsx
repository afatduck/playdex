import { useEffect, useMemo, useState } from 'react';
import getAllFavorites from '../requests/getAllFavorites';
import { useUserState } from '../UserState';
import { Navigate } from 'react-router-dom';
import GameItem from '../components/GameItem';
import { motion } from 'framer-motion';

function FavoritesPage() {
  const [games_, setGames] = useState<Game[] | null>(null);
  const [displayCount, setDisplayCount] = useState(20);
  const { favorites } = useUserState() || {};

  useEffect(() => {
    document.title = 'Favorites - PlayDEX';
  }, []);

  useEffect(() => {
    getAllFavorites().then(res => {
      if (res.success) {
        setGames(res.data);
      }
    });
  }, [setGames]);

  let games = useMemo(() => {
    if (!games_ || !favorites) return null;
    return games_.filter(game => favorites.includes(game.id));
  }, [games_, favorites]);

  const displayedGames = useMemo(() => {
    if (!games) return [];
    return games.slice(0, displayCount);
  }, [games, displayCount]);

  if (games === null) {
    return <p>Loading</p>;
  }

  if (!games.length) {
    return <p>You don't have any favorites yet.</p>;
  }

  if (favorites === undefined) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="pt-24 md:pt-28 pb-12 px-3 md:px-4 max-w-7xl mx-auto">
        {displayedGames.map(game => (
          <GameItem game={game} key={game.id} />
        ))}
        {games && displayCount < games.length && (
          <motion.button
            onClick={() => setDisplayCount(prev => prev + 20)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            Load more
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
