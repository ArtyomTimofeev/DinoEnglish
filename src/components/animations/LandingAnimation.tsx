import React from 'react';
import { motion } from 'framer-motion';

interface LandingAnimationProps {
  show: boolean;
}

export const LandingAnimation: React.FC<LandingAnimationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        style={{ fontSize: '8rem' }}
        initial={{ y: -100, scale: 0.5 }}
        animate={{ y: 0, scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        🚀
      </motion.div>
      <motion.div
        style={{ position: 'absolute', fontSize: '8rem' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        🌙
      </motion.div>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', fontSize: '2.5rem' }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
          }}
          transition={{ duration: 1, delay: i * 0.1 }}
        >
          ⭐
        </motion.div>
      ))}
    </motion.div>
  );
};
