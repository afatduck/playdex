import { Link } from 'react-router-dom';
import { useUserDispatch, useUserState } from '../UserState';
import { useCallback, useState } from 'react';
import { motion } from 'motion/react';

function Nav() {
  const loggedIn = !!useUserState();
  const [menuOpen, setMenuOpen] = useState(false);

  const userDispatch = useUserDispatch();

  const handleLogout = useCallback(() => {
    userDispatch({
      type: 'LOGOUT',
    });
    location.reload();
  }, [userDispatch]);

  const navItems = (
    <>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          to={'/games'}
          style={{
            fontFamily: "'Press Start 2P', system-ui",
            fontSize: '14px',
          }}
          className="px-3 py-2 bg-white rounded inline-block hover:bg-gray-100"
          onClick={() => setMenuOpen(false)}>
          Video Games
        </Link>
      </motion.div>
      {loggedIn && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            to={'/favorites'}
            style={{
              fontFamily: "'Press Start 2P', system-ui",
              fontSize: '14px',
            }}
            className="px-3 py-2 bg-white rounded inline-block hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}>
            Favorites
          </Link>
        </motion.div>
      )}
      {loggedIn ? (
        <motion.button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          style={{
            fontFamily: "'Press Start 2P', system-ui",
            fontSize: '14px',
            cursor: 'pointer',
          }}
          className="px-3 py-2 bg-white rounded inline-block hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          Goodbye
        </motion.button>
      ) : (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            to={'/login'}
            style={{
              fontFamily: "'Press Start 2P', system-ui",
              fontSize: '14px',
            }}
            className="px-3 py-2 bg-white rounded inline-block hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}>
            Join us!
          </Link>
        </motion.div>
      )}
    </>
  );

  return (
    <nav className="flex p-3.5 justify-between items-center fixed top-0 w-full z-50 bg-transparent">
      <motion.div
        className="div"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <Link to={'/'} onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="PlayDEX Logo" className="w-50 h-15 mt-4" />
        </Link>
      </motion.div>

      <div className="hidden md:flex gap-5">{navItems}</div>

      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <div className="flex flex-col gap-1.5">
          <motion.div
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#333]"></motion.div>
          <motion.div
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#333] rounded"></motion.div>
          <motion.div
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#333] rounded"></motion.div>
        </div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 300 }}
        transition={{ duration: 0.3 }}
        className="absolute top-20 right-0 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg p-6 w-64 md:hidden flex flex-col gap-4 mr-4">
        {navItems}
      </motion.div>
    </nav>
  );
}

export default Nav;
