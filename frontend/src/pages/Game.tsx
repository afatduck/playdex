import { useCallback, useEffect, useState } from 'react';
import { useParams, Link as RouterLink, Link } from 'react-router-dom';
import getGame from '../requests/getGame';
import { useFavoritePair } from '../components/favoritePair';
import UserScore from '../components/UserScore';
import { useUserState } from '../UserState';
import PostComment from '../components/PostComment';
import { motion } from 'motion/react';

function GamePage() {
  const { gameId } = useParams();

  const [game, setGame] = useState<GameExtended | null | undefined>(undefined);

  const { username } = useUserState() ?? {};

  useEffect(() => {
    if (game?.title) {
      document.title = `${game.title} - PlayDEX`;
    } else {
      document.title = 'Loading... - PlayDEX';
    }
  }, [game]);

  const setScore = useCallback(
    (newScore: number) => {
      setGame(p => {
        if (!p) return p;
        return {
          ...p,
          average_score: newScore,
        };
      });
    },
    [setGame],
  );

  const setUserScore = useCallback(
    (newUserScore?: number) => {
      setGame(p => {
        if (!p) return p;
        return {
          ...p,
          user_score: newUserScore ?? null,
        };
      });
    },
    [setGame],
  );

  const addComment = useCallback(
    (id: number, text: string) => {
      setGame(p => {
        if (!p) return p;
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: id,
              username: username!,
              text,
            },
          ],
        };
      });
    },
    [setGame, username],
  );

  useEffect(() => {
    if (gameId !== undefined) {
      getGame(gameId).then(res => {
        if (res.success) {
          setGame(res.data);
          return;
        }
        setGame(null);
      });
    }
  }, [setGame, gameId]);

  const [FavButton, FavCount] = useFavoritePair(
    (game ?? {}).id ?? 0,
    (game ?? {}).favorites_count ?? 0,
  ); // Ne preispituj...radi...

  if (game === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Second...</p>
      </div>
    );
  } else if (game === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-xl text-gray-600">...</p>
        <RouterLink
          to="/games"
          className="text-blue-600 hover:text-blue-800 font-semibold underline">
          Back to video games list
        </RouterLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 md:pt-28 pb-12 px-3 md:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={'/static/artwork/' + (game.id - 1) + '.jpg'}
            alt={game.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              {game.title}
            </h1>

            <div className="flex gap-3 md:gap-6 mb-6 flex-col md:flex-row md:flex-wrap items-start md:items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Year:</span>
                <span className="text-gray-600">{game.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Score:</span>
                <span className="text-lg font-bold text-[#60BD2D]">
                  {(game.average_score ?? 0).toFixed(1)}/5
                </span>
              </div>
              <div className="flex gap-3 items-center">
                {FavCount}
                {FavButton}
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {game.description}
            </p>

            <div className="border-t pt-6 border-[#F6D509]">
              <UserScore
                gameId={game.id}
                setScore={setScore}
                setUserScore={setUserScore}
                userScore={game.user_score}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Comments
          </h2>

          <div className="space-y-4 mb-8">
            {!game.comments.length ? (
              <p className="text-gray-500 italic">Be the first to comment!</p>
            ) : (
              game.comments.map(comment => (
                <div
                  key={comment.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {comment.username === username ? (
                    <p className="font-bold text-blue-600 mb-1">You</p>
                  ) : (
                    <p className="font-bold text-gray-800 mb-1">
                      {comment.username}
                    </p>
                  )}
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          {username ? (
            <PostComment gameId={game.id} addCommnent={addComment} />
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-[#F6D509] rounded-xl cursor-pointer text-center font-medium">
              <Link to="/login">Log in to post a comment!</Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
