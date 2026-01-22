import React from 'react';
import { motion } from 'framer-motion';
import type { DinoState } from '../types';

interface DinoSpriteProps {
  state: DinoState;
  walkFrame: number; // 0 or 1 for alternating frames
}

const SCALE = 1.5;
const base = import.meta.env.BASE_URL;

// Individual sprite files
const FRAMES = {
  idle: `${base}sprites/dino-idle.png`,
  run1: `${base}sprites/dino-run1.png`,
  run2: `${base}sprites/dino-run2.png`,
  duck1: `${base}sprites/dino-duck1.png`,
  duck2: `${base}sprites/dino-duck2.png`,
};

export const DinoSprite: React.FC<DinoSpriteProps> = ({ state, walkFrame }) => {
  // Determine which frame to show based on state
  let frameSrc: string;

  if (state === 'idle') {
    // Static idle pose
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
