import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenFlashProps {
  show: boolean;
  type: 'success' | 'error';
}

export const ScreenFlash: React.FC<ScreenFlashProps> = ({ show, type }) => {
  const bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 50,
            backgroundColor: bgColor
          }}
        />
      )}
    </AnimatePresence>
  );
};
