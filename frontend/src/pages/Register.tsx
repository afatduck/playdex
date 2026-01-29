import {
  useCallback,
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from 'react';
import { useUserDispatch, useUserState } from '../UserState';
import { Link, redirect, useNavigate } from 'react-router-dom';
import postRegister from '../requests/postRegister';
import { motion } from 'motion/react';
import BackgroundGif from '../components/BackgroundGif';
import BlurOverlay from '../components/BlurOverlay';

function RegisterPage() {
  if (useUserState()) throw redirect('/');

  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    document.title = 'Register - PlayDEX';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      setInput(input => {
        return {
          ...input,
          [name]: value,
        };
      });
    },
    [setInput],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!input.username || !input.password) return;

      postRegister(input.username, input.password).then(res => {
        if (res.success) {
          userDispatch({
            type: 'LOGIN',
            payload: res.data,
          });
          navigate('/');
          return;
        }
        alert(res.detail);
      });
    },
    [input, userDispatch, navigate],
  );

  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      <BackgroundGif />
      <BlurOverlay isBlurred={isBlurred} />

      <div className="relative z-10 flex items-center justify-center h-screen pt-16 px-4">
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md"
          style={{
            boxShadow:
              '0 20px 60px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isBlurred ? 1 : 0, y: isBlurred ? 0 : 20 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Welcome aboard!
          </h1>
          <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={input.username}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 px-4 py-3 rounded-lg font-semibold transition">
              Register
            </button>
          </form>
          <Link
            to={'/login'}
            className="bg-[#EB4228] text-white font-medium p-2 rounded-xl block mt-4 text-center">
            Whoops, I already have an account!
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
