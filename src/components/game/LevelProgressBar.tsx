import React from 'react';
import { motion } from 'framer-motion';
import { MAX_LEVEL_SCORE } from '@/constants/gameConfig';

interface LevelProgressBarProps {
  levelScore: number;
}

// CEFR levels in order with colors (~17% each for 6 levels)
const LEVELS = [
  { name: 'A1', color: '#22c55e', threshold: 0 },   // 0-16% (17%)
  { name: 'A2', color: '#84cc16', threshold: 17 },  // 17-33% (17%)
  { name: 'B1', color: '#eab308', threshold: 34 },  // 34-50% (17%)
  { name: 'B2', color: '#f97316', threshold: 51 },  // 51-67% (17%)
  { name: 'C1', color: '#ef4444', threshold: 68 },  // 68-84% (17%)
  { name: 'C2', color: '#a855f7', threshold: 85 },  // 85-100% (15%)
];

// Get achieved level based on percentage
const getAchievedLevel = (percentage: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (percentage >= LEVELS[i].threshold) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  levelScore,
}) => {
  const percentage = (levelScore / MAX_LEVEL_SCORE) * 100;
  const achievedLevel = getAchievedLevel(percentage);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {/* Score display */}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#ffffff',
          textShadow: '1px 1px 0 #000',
        }}
      >
        {levelScore}pts
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

      {/* Achieved level badge */}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          color: achievedLevel.color,
          textShadow: '1px 1px 0 #000',
        }}
      >
        {achievedLevel.name}
      </div>
    </div>
  );
};
