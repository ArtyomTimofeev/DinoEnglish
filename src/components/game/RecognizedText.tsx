import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecognizedTextProps {
  text: string;
  isInterim?: boolean;
}

export const RecognizedText: React.FC<RecognizedTextProps> = ({ text, isInterim = false }) => {
  return (
    <div style={{
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    }}>
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: isInterim ? '#d1d5db' : 'white',
              fontStyle: isInterim ? 'italic' : 'normal',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
            }}
          >
            {isInterim ? `"${text}..."` : `"${text}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
