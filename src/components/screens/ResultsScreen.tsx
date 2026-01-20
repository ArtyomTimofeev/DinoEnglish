import React from 'react';
import { motion } from 'framer-motion';
import { MotivationalMessage } from '../ui/MotivationalMessage';
import { LandingAnimation } from '../animations/LandingAnimation';
import { GAME_CONFIG } from '@/constants/gameConfig';

interface ResultsScreenProps {
  score: number;
  maxStreak: number;
  onPlayAgain: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  maxStreak,
  onPlayAgain,
}) => {
  const percentage = (score / GAME_CONFIG.totalWords) * 100;
  const showLanding = score >= 8;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9333ea, #2563eb, #4f46e5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      position: 'relative'
    }}>
      {showLanding && <LandingAnimation show={showLanding} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '32px'
          }}
        >
          Game Complete!
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '32px',
            maxWidth: '400px'
          }}
        >
          <div style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px'
          }}>
            {score}/10
          </div>
          <div style={{
            fontSize: '1.5rem',
            color: 'white',
            marginBottom: '24px'
          }}>
            {percentage}% Correct
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1.5rem',
            color: 'white'
          }}>
            <span>🔥</span>
            <span>Max Streak: {maxStreak}</span>
          </div>
        </motion.div>

        <MotivationalMessage score={score} />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          style={{
            padding: '16px 48px',
            borderRadius: '9999px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#ffffff',
            color: '#7c3aed',
          }}
        >
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};
