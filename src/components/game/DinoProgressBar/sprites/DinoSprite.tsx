import React from 'react';
import { motion } from 'framer-motion';
import type { DinoState } from '../types';

interface DinoSpriteProps {
  state: DinoState;
  walkFrame: number; // 0 or 1 for alternating frames
}

const SCALE = 1.5;

// Individual sprite files
const FRAMES = {
  idle: '/sprites/dino-idle.png',
  run1: '/sprites/dino-run1.png',
  run2: '/sprites/dino-run2.png',
  duck1: '/sprites/dino-duck1.png',
  duck2: '/sprites/dino-duck2.png',
};

export const DinoSprite: React.FC<DinoSpriteProps> = ({ state, walkFrame }) => {
  // Determine which frame to show based on state
  let frameSrc: string;

  if (state === 'idle') {
    frameSrc = FRAMES.idle;
  } else if (state === 'eating') {
    // Alternate between duck frames for eating animation
    frameSrc = walkFrame === 0 ? FRAMES.duck1 : FRAMES.duck2;
  } else {
    // walking, bumping, recoiling - use running frames
    frameSrc = walkFrame === 0 ? FRAMES.run1 : FRAMES.run2;
  }

  return (
    <motion.img
      src={frameSrc}
      alt="Dinosaur"
      style={{
        transform: `scale(${SCALE})`,
        transformOrigin: 'bottom left',
        imageRendering: 'pixelated',
      }}
      draggable={false}
    />
  );
};
