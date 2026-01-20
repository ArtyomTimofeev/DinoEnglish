import React from 'react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  streak: number;
  animate?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak, animate = false }) => {
  return (
    <motion.div
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '8px 16px',
        borderRadius: '9999px'
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>🔥</span>
      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>{streak}</span>
    </motion.div>
  );
};
