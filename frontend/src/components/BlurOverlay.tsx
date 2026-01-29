import { motion } from 'motion/react';

interface BlurOverlayProps {
  isBlurred: boolean;
}

function BlurOverlay({ isBlurred }: BlurOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 bg-black/40 backdrop-blur-md"
      style={{
        top: '-64px',
        height: 'calc(100vh + 64px)',
      }}
      animate={{
        opacity: isBlurred ? 1 : 0,
        backdropFilter: isBlurred ? 'blur(10px)' : 'blur(0px)',
      }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    />
  );
}

export default BlurOverlay;
