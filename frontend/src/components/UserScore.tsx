import { useCallback } from 'react';
import { useUserState } from '../UserState';
import postScore from '../requests/postScore';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

function UserScore({
  gameId,
  userScore,
  setUserScore,
  setScore,
}: UserScoreInterface) {
  const loggedIn = !!useUserState();

  const sumbitScore = useCallback(
    (s?: number) => {
      postScore(gameId, s).then(res => {
        if (res.success) {
          setScore(res.data.new_score);
          setUserScore(s);
        }
      });
    },
    [setScore, setUserScore, gameId],
  );

  if (!loggedIn) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-[#F6D509] rounded-xl cursor-pointer w-fit font-medium">
        <Link to="/login">Log in to score</Link>
      </motion.div>
    );
  } else if (userScore) {
    return (
      <div className="flex items-center">
        <p className="font-bold">Your score: {userScore}</p>
        <motion.button
          className="ml-4 bg-[#EB4228] rounded-xl px-4 py-1 text-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => sumbitScore()}>
          Click to remove
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <motion.button
        className="px-4 py-1 border-2 border-[#EB4228] rounded-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => sumbitScore(1)}>
        Score 1
      </motion.button>
      <motion.button
        className="px-4 py-1 border-2 border-[#d3877b] rounded-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => sumbitScore(2)}>
        Score 2
      </motion.button>
      <motion.button
        className="px-4 py-1 border-2 border-[#F6D509] rounded-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => sumbitScore(3)}>
        Score 3
      </motion.button>
      <motion.button
        className="px-4 py-1 border-2 border-[#9ac085] rounded-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => sumbitScore(4)}>
        Score 4
      </motion.button>
      <motion.button
        className="px-4 py-1 border-2 border-[#60BD2D] rounded-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => sumbitScore(5)}>
        Score 5
      </motion.button>
    </div>
  );
}

interface UserScoreInterface {
  gameId: number;
  userScore: number | null;
  setScore: (newScore: number) => void;
  setUserScore: (newUserScore?: number) => void;
}

export default UserScore;
