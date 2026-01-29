import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundGif from '../components/BackgroundGif';
import BlurOverlay from '../components/BlurOverlay';

function HomePage() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: isBlurred ? 1 : 0,
      scale: isBlurred ? 1 : 0.8,
      transition: {
        duration: 0.5,
        delayChildren: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const dexColors = ['#F6D509', '#EB4228', '#60BD2D'];

  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      <BackgroundGif />
      <BlurOverlay isBlurred={isBlurred} />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen pt-16 px-4">
        <motion.h1
          style={{ fontFamily: "'Press Start 2P', system-ui" }}
          className="text-3xl sm:text-5xl md:text-6xl text-white mb-6 text-center italic"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {'Play'.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}

          {'DEX'.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{ color: dexColors[i] }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white text-center max-w-xl md:max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isBlurred ? 1 : 0, y: isBlurred ? 0 : 20 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 1.2 }}>
          Gotta play 'em all: Your ultimate database for every game in the
          universe!
        </motion.p>
      </div>
    </div>
  );
}

export default HomePage;
