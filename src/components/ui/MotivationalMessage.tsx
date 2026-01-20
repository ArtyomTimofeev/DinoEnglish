import React from 'react';
import { motion } from 'framer-motion';
import { getMotivationalMessage } from '@/constants/theme';

interface MotivationalMessageProps {
  score: number;
}

export const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ score }) => {
  const message = getMotivationalMessage(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: '32px',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
      }}
    >
      {message}
    </motion.div>
  );
};
