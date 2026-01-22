import React from 'react';
import { motion } from 'framer-motion';

interface LevelProgressBarProps {
  correctAnswersCount: number; // Number of correct answers (0-12)
}

// Total words in game
const TOTAL_WORDS = 12;

// CEFR levels with thresholds based on correct answers
// 12 = C2, 10+ = C1, 8+ = B2, 6+ = B1, 4+ = A2, 2+ = A1, 0-1 = A0
const LEVELS = [
  { name: 'A0', color: '#94a3b8', minCorrect: 0 },
  { name: 'A1', color: '#22c55e', minCorrect: 2 },
  { name: 'A2', color: '#84cc16', minCorrect: 4 },
  { name: 'B1', color: '#eab308', minCorrect: 6 },
  { name: 'B2', color: '#f97316', minCorrect: 8 },
  { name: 'C1', color: '#ef4444', minCorrect: 10 },
  { name: 'C2', color: '#a855f7', minCorrect: 12 },
];

// Get achieved level based on correct answers
const getAchievedLevel = (correctCount: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (correctCount >= LEVELS[i].minCorrect) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  correctAnswersCount,
}) => {
  const percentage = (correctAnswersCount / TOTAL_WORDS) * 100;
  const achievedLevel = getAchievedLevel(correctAnswersCount);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {/* Achieved level badge */}
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          fontWeight: 'normal',
          color: achievedLevel.color,
          textShadow: '1px 1px 0 #000',
        }}
      >
        {achievedLevel.name}
      </div>

      {/* Progress bar container */}
      <div
        style={{
          width: '86px',
          height: '14px',
          backgroundColor: '#1a1a1a',
          border: '2px solid #333',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            height: '100%',
            backgroundColor: achievedLevel.color,
            boxShadow: `0 0 6px ${achievedLevel.color}`,
          }}
        />

        {/* Pixel-art segments overlay (6 segments for 6 CEFR levels A1-C2) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRight: i < 5 ? '1px solid #333' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
