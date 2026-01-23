import type { GameConfig } from '@/types/game.types';

export const GAME_CONFIG: GameConfig = {
  countdownDuration: 5000, // 5 seconds in milliseconds
  totalWords: 12,
  levenshteinThreshold: 2,
  animationDuration: 1000, // 1 second
};

export const SPEECH_CONFIG = {
  lang: 'en-US',
  continuous: true, // Keep listening until explicitly stopped
  interimResults: true,
  maxAlternatives: 1,
};

export const SPEECH_PROTECTION_CONFIG = {
  soundProtectionDelay: 300, // Delay after sound before resuming input (ms)
  sessionStartDelay: 500, // Delay before accepting input after session start (ms)
  wrongAnswerDebounce: 400, // Delay before showing error - allows word fragments to combine (ms)
};

// Detect mobile device
const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const CAMERA_CONFIG = {
  video: {
    facingMode: 'user',
    // Use different constraints for mobile vs desktop
    ...(isMobile
      ? {} // Let mobile browsers choose optimal resolution
      : {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }),
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
  eatDuration: 600, // Time for eating animation (vacuum effect)
  walkCycleDuration: 200, // Time per walk cycle frame

  // Animal scales (small to large, 25% difference between min and max)
  animalScales: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],

  // Animal names for reference
  animals: [
    'crab',
    'pig',
    'skunk',
    'monkey',
    'eagle',
    'wolf',
    'kangaroo',
    'cow',
    'orangutan',
    'buffalo',
    'caveBear',
    'elephant',
  ] as const,

  // English level for each animal (CEFR scale)
  animalLevels: ['A1', 'A1', 'A2', 'A2', 'B1', 'B1', 'B2', 'B2', 'C1', 'C1', 'C2', 'C2'] as const,

  // Colors
  dinoColor: '#535353',
  groundColor: '#535353',
};
