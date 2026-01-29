import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import postComment from '../requests/postComment';
import { motion } from 'framer-motion';

function PostComment({ gameId, addCommnent }: PostCommentProps) {
  const [text, setText] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value);
    },
    [setText],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!text) return;

      postComment(gameId, text).then(res => {
        if (res.success) {
          addCommnent(res.data.comment_id, text);
        }
      });
    },
    [text, gameId, addCommnent],
  );

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        rows={3}
        cols={100}
        placeholder="Write a comment..."
        className="p-2 border-2 border-[#F6D509] rounded-xl w-full mb-4 outline-none focus:border-[#60BD2D]"
      />

      <motion.button
        type="submit"
        className="bg-[#60BD2D] text-white px-6 py-2 rounded-xl">
        Post
      </motion.button>
    </form>
  );
}

interface PostCommentProps {
  gameId: number;
  addCommnent: (id: number, text: string) => void;
}

export default PostComment;
