import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  shake?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, shake = false }) => {
  const leftOffset = 8;
  const rightOffset = 8;
  const totalWidth = 100 - leftOffset - rightOffset;
  const position = leftOffset + (totalWidth * progress) / 100;

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{
        position: 'relative',
        height: '64px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '9999px',
        overflow: 'hidden'
      }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #2563eb, #9333ea)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />

        <div style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.875rem'
        }}>
          🌍
        </div>

        <div style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.875rem'
        }}>
          🌙
        </div>

        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.875rem',
            left: `${position}%`
          }}
          animate={
            shake
              ? {
                  x: [0, -5, 5, -5, 5, 0],
                  rotate: [0, -5, 5, -5, 5, 0],
                }
              : {}
          }
          transition={shake ? { duration: 0.5 } : { duration: 1, ease: 'easeOut' }}
        >
          🚀
          {progress > 0 && (
            <motion.div
              style={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.8, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💨
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
