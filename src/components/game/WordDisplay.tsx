import React from 'react';
import { motion } from 'framer-motion';

interface WordDisplayProps {
  word: string;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ word }) => {
  return (
    <motion.div
      key={word}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: '32px',
        textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9)'
      }}
    >
      {word}
    </motion.div>
  );
};
