import { useEffect, useState, useMemo } from 'react';
import getAllGames from '../requests/getAllGames';
import GameItem from '../components/GameItem';
import { motion } from 'framer-motion';

function GamesPage() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<
    'none' | 'year' | 'rating' | 'favorites'
  >('none');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [displayCount, setDisplayCount] = useState(20);

  const [minScore] = useState(0);
  const [maxScore] = useState(10);
  const [selectedYear] = useState('');
  const [minFavorites] = useState(0);

  useEffect(() => {
    getAllGames().then(res => {
      if (res.success) setGames(res.data);
    });
  }, []);

  useEffect(() => {
    document.title = 'Games - PlayDEX';
  }, []);

  const filteredGames = useMemo(() => {
    if (!games) return [];

    let result = games.filter(game => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesScore =
        game.average_score >= minScore && game.average_score <= maxScore;
      const matchesYear =
        selectedYear === '' || String(game.year) === String(selectedYear);
      const matchesFavorites = game.favorites_count >= minFavorites;
      return matchesSearch && matchesScore && matchesYear && matchesFavorites;
    });

    if (sortBy !== 'none') {
      result.sort((a, b) => {
        let aVal: number, bVal: number;

        switch (sortBy) {
          case 'year':
            aVal = parseInt(a.year);
            bVal = parseInt(b.year);
            break;
          case 'rating':
            aVal = a.average_score;
            bVal = b.average_score;
            break;
          case 'favorites':
            aVal = a.favorites_count;
            bVal = b.favorites_count;
            break;
          default:
            return 0;
        }

        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [
    games,
    searchQuery,
    minScore,
    maxScore,
    selectedYear,
    minFavorites,
    sortBy,
    sortOrder,
  ]);

  const displayedGames = useMemo(() => {
    return filteredGames.slice(0, displayCount);
  }, [filteredGames, displayCount]);

  if (games === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-pixel text-gray-600 animate-pulse">
          Učitavanje PlayDEX-a...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-3 md:px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 mt-4 lg:mt-8">
        <motion.div
          className="w-full lg:w-72 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 sticky top-24 lg:top-28">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>🔍</span> Search
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Enter game title..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none mb-3">
                  <option value="none">Choose</option>
                  <option value="year">Year</option>
                  <option value="rating">Rating</option>
                  <option value="favorites">Favorites</option>
                </select>

                {sortBy !== 'none' && (
                  <select
                    value={sortOrder}
                    onChange={e =>
                      setSortOrder(e.target.value as 'asc' | 'desc')
                    }
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          {filteredGames.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500 italic font-medium">
                Nema takvih igara u PlayDEX-u.
              </p>
            </div>
          ) : (
            <>
              {displayedGames.map(game => (
                <GameItem game={game} key={game.id} />
              ))}
              {displayCount < filteredGames.length && (
                <motion.button
                  onClick={() => setDisplayCount(prev => prev + 20)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
                  Load more
                </motion.button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default GamesPage;
