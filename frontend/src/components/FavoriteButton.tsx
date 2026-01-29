import { useCallback, useMemo } from 'react';
import { useUserDispatch, useUserState } from '../UserState';
import putMarkFavorite from '../requests/putMarkFavorite';
import putUnmarkFavorite from '../requests/putUnmarkFavorite';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

function FavoriteButton({
  gameId,
  onDecrease,
  onIncrease,
}: FavoriteButtonProps) {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  const gameLiked = useMemo(() => {
    return userState && userState.favorites.includes(gameId);
  }, [userState]);

  const markFavorite = useCallback(() => {
    putMarkFavorite(gameId).then(res => {
      if (res.success) {
        userDispatch({
          type: 'ADD_FAVORITE',
          payload: gameId,
        });
        onIncrease && onIncrease();
      } else alert(res.detail);
    });
  }, [userDispatch, onIncrease]);

  const unmarkFavorite = useCallback(() => {
    putUnmarkFavorite(gameId).then(res => {
      if (res.success) {
        userDispatch({
          type: 'REMOVE_FAVORITE',
          payload: gameId,
        });
        onDecrease && onDecrease();
      } else alert(res.detail);
    });
  }, [userDispatch, onDecrease]);

  const handleClick = useCallback(() => {
    if (!userState) {
      navigate('/login');
      return;
    }
    if (gameLiked) unmarkFavorite();
    else markFavorite();
  }, [userState, gameLiked, unmarkFavorite, markFavorite, navigate]);

  return gameLiked ? (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 bg-[#EB4228] rounded-xl cursor-pointer text-white"
      onClick={handleClick}>
      Remove from favorites
    </motion.button>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 bg-[#F6D509] rounded-xl cursor-pointer font-medium"
      onClick={handleClick}>
      Add to favorites
    </motion.button>
  );
}

interface FavoriteButtonProps {
  gameId: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export default FavoriteButton;
