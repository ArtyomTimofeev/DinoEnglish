import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DinoSprite } from './sprites/DinoSprite';
import type { DinoState } from './types';
import { DINO_CONFIG } from '@/constants/gameConfig';

interface DinosaurComponentProps {
  state: DinoState;
}

export const Dinosaur: React.FC<DinosaurComponentProps> = ({ state }) => {
  const [walkFrame, setWalkFrame] = useState(0);

  // Leg animation - only when not idle
  useEffect(() => {
    if (state === 'idle') {
      setWalkFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setWalkFrame((prev) => (prev === 0 ? 1 : 0));
    }, DINO_CONFIG.walkCycleDuration);

    return () => clearInterval(interval);
  }, [state]);

  // Calculate animation based on state
  const getStateAnimation = () => {
    switch (state) {
      case 'bumping':
        return {
          y: [0, -5, 0],
          rotate: [0, -2, 0],
        };
      case 'recoiling':
        return {
          y: [0, 5, 3],
        };
      case 'eating':
        return {
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        };
      case 'watching':
        return {
          y: [0, 3, 0],
          rotate: [0, 2, 0],
        };
      default:
        return {};
    }
  };

  const getStateTransition = () => {
    switch (state) {
      case 'bumping':
        return {
          duration: DINO_CONFIG.bumpDuration / 1000,
          ease: 'easeOut' as const,
        };
      case 'recoiling':
        return {
          duration: DINO_CONFIG.recoilDuration / 1000,
          ease: 'easeOut' as const,
        };
      case 'eating':
        return { duration: DINO_CONFIG.eatDuration / 1000, repeat: 1 };
      case 'watching':
        return {
          duration: 0.8,
          ease: 'easeInOut' as const,
        };
      default:
        return { duration: 0.1 };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '17%',
        left: '0',
        transform: 'scale(0.7)',
        transformOrigin: 'bottom center',
        zIndex: 20,
      }}
    >
      <motion.div
        animate={getStateAnimation()}
        transition={getStateTransition()}
      >
        {/* No rotation - dinosaur sprite already faces right */}
        <DinoSprite state={state} walkFrame={walkFrame} />
      </motion.div>
    </div>
  );
};
