import type { GameConfig } from '@/types/game.types';

export const GAME_CONFIG: GameConfig = {
  countdownDuration: 5000, // 5 seconds in milliseconds
  totalWords: 10,
  levenshteinThreshold: 2,
  animationDuration: 1000, // 1 second
};

export const SPEECH_CONFIG = {
  lang: 'en-US',
  continuous: true, // Keep listening until explicitly stopped
  interimResults: true,
  maxAlternatives: 1,
};

export const CAMERA_CONFIG = {
  video: {
    facingMode: 'user',
    width: { ideal: 1080 },
    height: { ideal: 1920 },
    aspectRatio: { ideal: 9 / 16 },
  },
};

export const PERFORMANCE_TARGETS = {
  initialLoadTime: 3000, // 3 seconds
  speechRecognitionDelay: 500, // 500ms
  targetFPS: 60,
};

export const DINO_CONFIG = {
  // Animation timings in milliseconds
  travelDuration: 2000, // Time to travel between animals
  bumpDuration: 400, // Time for bump animation
  recoilDuration: 300, // Time for recoil animation
  eatDuration: 300, // Time for eating animation
  walkCycleDuration: 200, // Time per walk cycle frame

  // Animal scales (small to large)
  animalScales: [0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1.0, 1.1, 1.25, 1.4],

  // Animal names for reference
  animals: [
    'hedgehog',
    'mouse',
    'rabbit',
    'fox',
    'dog',
    'deer',
    'horse',
    'bear',
    'rhino',
    'elephant',
  ] as const,

  // Colors
  dinoColor: '#535353',
  groundColor: '#535353',
};
