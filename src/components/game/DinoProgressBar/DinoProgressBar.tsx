import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dinosaur } from './Dinosaur';
import { AnimalSprite } from './sprites/AnimalSprites';
import { Road3D } from './Road3D';
import { LevelProgressBar } from '../LevelProgressBar';
import { PixelButton } from '@/components/ui/PixelButton';
import type { DinoState, AnimalType, DinoProgressBarProps } from './types';
import { DINO_CONFIG } from '@/constants/gameConfig';

// Colors for each CEFR level
const LEVEL_COLORS: Record<string, string> = {
  A0: '#94a3b8', // slate
  A1: '#22c55e', // green
  A2: '#84cc16', // lime
  B1: '#eab308', // yellow
  B2: '#f97316', // orange
  C1: '#ef4444', // red
  C2: '#a855f7', // purple
};

type AnimalPosition = 'approaching' | 'at_dino' | 'bouncing_back';

export const DinoProgressBar: React.FC<DinoProgressBarProps> = ({
  currentWordIndex,
  totalWords,
  isCurrentWordComplete,
  isSkipping,
  levelScore,
  isGameComplete,
  isGameStarted,
  onWordAdvance,
  onSkip,
  onPlayAgain,
  onStartGame,
}) => {
  const [dinoState, setDinoState] = useState<DinoState>('idle');
  const [isEatingAnimation, setIsEatingAnimation] = useState(false);
  const [isSkipAnimation, setIsSkipAnimation] = useState(false);
  const [hasReachedAnimal, setHasReachedAnimal] = useState(false);
  const [animalKey, setAnimalKey] = useState(0); // Key for re-mounting animal animation
  const [animalPosition, setAnimalPosition] =
    useState<AnimalPosition>('approaching');

  // Refs for tracking state without causing re-renders
  const bumpLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const travelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEatingRef = useRef(false);
  const isSkippingRef = useRef(false);
  const currentAnimalIndexRef = useRef(0);
  const onWordAdvanceRef = useRef(onWordAdvance);
  const isInitializedRef = useRef(false);

  // Keep callback refs updated
  useEffect(() => {
    onWordAdvanceRef.current = onWordAdvance;
  }, [onWordAdvance]);

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (bumpLoopRef.current) {
      clearTimeout(bumpLoopRef.current);
      bumpLoopRef.current = null;
    }
    if (travelTimeoutRef.current) {
      clearTimeout(travelTimeoutRef.current);
      travelTimeoutRef.current = null;
    }
  }, []);

  // Travel duration for first approach animation
  const syncedTravelDuration = 1800; // 1.8s - matches first approach animation duration

  // Start traveling to next animal (animal approaches)
  const startTraveling = useCallback(() => {
    clearAllTimeouts();
    setHasReachedAnimal(false);
    setAnimalPosition('approaching');
    setAnimalKey((prev) => prev + 1); // Trigger new animal animation

    // Start walking immediately
    setDinoState('walking');
    travelTimeoutRef.current = setTimeout(() => {
      setHasReachedAnimal(true);
      setAnimalPosition('at_dino');
      // bump loop will be triggered by useEffect when animalPosition changes
    }, syncedTravelDuration);
  }, [clearAllTimeouts, syncedTravelDuration]);

  // Start bump loop with animal bouncing
  const startBumpLoop = useCallback((skipInitialDelay = false) => {
    // Clear any existing timeout before starting bump loop
    if (bumpLoopRef.current) {
      clearTimeout(bumpLoopRef.current);
      bumpLoopRef.current = null;
    }
    if (isEatingRef.current) return;

    let isFirstBump = skipInitialDelay;

    const doBump = () => {
      if (isEatingRef.current) return;

      // Animal is at dino, collision happens
      setAnimalPosition('at_dino');
      setDinoState('bumping');

      // Skip delay on first bump to avoid "sticking" effect
      const bumpDelay = isFirstBump ? 0 : DINO_CONFIG.bumpDuration;
      isFirstBump = false;

      bumpLoopRef.current = setTimeout(() => {
        if (isEatingRef.current) return;

        // Dino recoils, animal bounces back
        setDinoState('recoiling');
        setAnimalPosition('bouncing_back');

        bumpLoopRef.current = setTimeout(() => {
          if (isEatingRef.current) return;

          // Dino starts walking, animal approaches again
          setDinoState('walking');
          setAnimalPosition('approaching');

          // After animal reaches dino again, do next bump
          bumpLoopRef.current = setTimeout(doBump, 500);
        }, DINO_CONFIG.recoilDuration);
      }, bumpDelay);
    };

    doBump();
  }, []);

  // Handle eating - called when word is answered correctly
  const doEat = useCallback(() => {
    // Prevent double execution
    if (isEatingRef.current) return;
    isEatingRef.current = true;

    clearAllTimeouts();
    setIsEatingAnimation(true);
    setDinoState('eating');

    const currentIndex = currentAnimalIndexRef.current;

    setTimeout(() => {
      setIsEatingAnimation(false);

      const nextIndex = currentIndex + 1;
      currentAnimalIndexRef.current = nextIndex;

      // Call onWordAdvance to move to next word
      onWordAdvanceRef.current();

      if (nextIndex >= totalWords) {
        // Game complete - don't start traveling
        isEatingRef.current = false;
        return;
      }

      // Reset eating flag and start traveling to next animal
      isEatingRef.current = false;
      startTraveling();
    }, DINO_CONFIG.eatDuration);
  }, [clearAllTimeouts, totalWords, startTraveling]);

  // Handle skip - called when skip button is pressed
  const doSkip = useCallback(() => {
    // Prevent double execution
    if (isEatingRef.current || isSkippingRef.current) return;
    isSkippingRef.current = true;

    clearAllTimeouts();
    setIsSkipAnimation(true);
    setDinoState('watching');

    const currentIndex = currentAnimalIndexRef.current;

    // Animal continues moving left and exits screen
    setTimeout(() => {
      setIsSkipAnimation(false);

      const nextIndex = currentIndex + 1;
      currentAnimalIndexRef.current = nextIndex;

      // Call onWordAdvance to move to next word
      onWordAdvanceRef.current();

      if (nextIndex >= totalWords) {
        // Game complete - don't start traveling
        isSkippingRef.current = false;
        return;
      }

      // Reset skip flag and start traveling to next animal
      isSkippingRef.current = false;
      startTraveling();
    }, 800); // Duration for animal to exit screen
  }, [clearAllTimeouts, totalWords, startTraveling]);

  // Handle isSkipping prop change
  useEffect(() => {
    if (isSkipping && !isEatingRef.current && !isSkippingRef.current) {
      doSkip();
    }
  }, [isSkipping, doSkip]);

  // Initialize: start walking to first animal when game starts
  useEffect(() => {
    if (!isGameStarted) {
      // Reset to idle state when game not started
      setDinoState('idle');
      return;
    }

    // Use ref to track initialization - survives StrictMode remounts
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    currentAnimalIndexRef.current = 0;
    setDinoState('walking');
    setAnimalPosition('approaching');

    // Set timeout for when dino reaches animal
    travelTimeoutRef.current = setTimeout(() => {
      setHasReachedAnimal(true);
      setAnimalPosition('at_dino');
    }, syncedTravelDuration);
  }, [isGameStarted, syncedTravelDuration]);

  // Handle eating or bump loop based on state
  useEffect(() => {
    // If word is complete, eat
    if (isCurrentWordComplete) {
      doEat();
      return;
    }

    // If animal reached dino and not eating/skipping, start bump loop
    // Skip initial delay on first approach to avoid "sticking" effect
    if (animalPosition === 'at_dino' && !isEatingRef.current && !isSkippingRef.current) {
      startBumpLoop(true);
    }
  }, [isCurrentWordComplete, animalPosition, doEat, startBumpLoop]);

  // Get current animal data
  const currentAnimal = useMemo(() => {
    if (currentWordIndex >= totalWords) return null;
    const level = DINO_CONFIG.animalLevels[currentWordIndex];
    return {
      type: DINO_CONFIG.animals[currentWordIndex] as AnimalType,
      scale: DINO_CONFIG.animalScales[currentWordIndex],
      level,
      levelColor: LEVEL_COLORS[level] || '#94a3b8',
    };
  }, [currentWordIndex, totalWords]);

  // Animal offset for bouncing back
  const animalOffset = animalPosition === 'bouncing_back' ? 50 : 0; // pixels

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 15,
      }}
    >
      {/* Road - only moving when game is started */}
      <Road3D isMoving={isGameStarted} />

      {/* Animal container - bounces back on collision */}
      <motion.div
        animate={{ x: animalOffset }}
        transition={{
          duration: animalPosition === 'bouncing_back' ? 0.3 : 0.5,
          ease: animalPosition === 'bouncing_back' ? 'easeOut' : 'easeIn',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
        }}
      >
        {/* Current Animal on the road - only show when game started */}
        {isGameStarted && currentAnimal && !isEatingAnimation && !isSkipAnimation && (
          <motion.div
            key={`animal-${animalKey}`}
            initial={{ right: '-10%' }}
            animate={{ right: '60%' }}
            transition={{
              duration: hasReachedAnimal ? 0.5 : 1.8,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              bottom: '17%',
              transformOrigin: 'center bottom',
              zIndex: 10,
            }}
          >
            {/* Level badge above animal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '-35px',
                left: '60%',
                transform: 'translateX(-50%)',
                backgroundColor: currentAnimal.levelColor,
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: `0 2px 8px ${currentAnimal.levelColor}80`,
                whiteSpace: 'nowrap',
              }}
            >
              {currentAnimal.level}
            </motion.div>
            <AnimalSprite
              type={currentAnimal.type}
              scale={currentAnimal.scale}
            />
          </motion.div>
        )}

        {/* Eating animation - vacuum sucking effect */}
        <AnimatePresence>
          {isEatingAnimation && currentAnimal && (
            <motion.div
              initial={{
                right: '60%',
                bottom: '17%',
                scaleX: 1,
                scaleY: 1,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                right: ['60%', '65%', '72%', '80%'],
                bottom: ['17%', '19%', '21%', '22%'],
                scaleX: [1, 1.5, 2, 0.1],
                scaleY: [1, 0.6, 0.4, 0.1],
                rotate: [0, -10, -180, -540],
                opacity: [1, 1, 0.7, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: DINO_CONFIG.eatDuration / 1000,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.2, 0.5, 1],
              }}
              style={{
                position: 'absolute',
                transformOrigin: 'left center',
                zIndex: 10,
              }}
            >
              <AnimalSprite
                type={currentAnimal.type}
                scale={currentAnimal.scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip animation - animal passes by and exits left */}
        <AnimatePresence>
          {isSkipAnimation && currentAnimal && (
            <motion.div
              initial={{
                right: '60%',
                bottom: '17%',
                opacity: 1,
              }}
              animate={{
                right: '110%',
                bottom: '17%',
                opacity: [1, 1, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                zIndex: 10,
              }}
            >
              {/* Level badge above animal */}
              <div
                style={{
                  position: 'absolute',
                  top: '-35px',
                  left: '60%',
                  transform: 'translateX(-50%)',
                  backgroundColor: currentAnimal.levelColor,
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: `0 2px 8px ${currentAnimal.levelColor}80`,
                  whiteSpace: 'nowrap',
                }}
              >
                {currentAnimal.level}
              </div>
              <AnimalSprite
                type={currentAnimal.type}
                scale={currentAnimal.scale}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dinosaur - fixed position, not affected by world offset */}
      <Dinosaur state={dinoState} />

      {/* Game Controls Area - below the road */}
      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          zIndex: 25,
          pointerEvents: 'auto',
        }}
      >
        {/* Level Progress Bar - left of skip button */}
        <LevelProgressBar levelScore={levelScore} />

        {/* Button: Play / Skip / Play Again */}
        {!isGameStarted ? (
          <PixelButton onClick={onStartGame} variant="green">
            <span style={{ fontSize: '26px', lineHeight: 1, display: 'flex', alignItems: 'center' }}>▶</span>
          </PixelButton>
        ) : isGameComplete ? (
          <PixelButton onClick={onPlayAgain} variant="green">
            <span style={{ fontSize: '26px', lineHeight: 1, display: 'flex', alignItems: 'center' }}>↻</span>
          </PixelButton>
        ) : (
          <PixelButton
            onClick={onSkip}
            disabled={isEatingAnimation || isSkipAnimation}
          >
            SKIP
          </PixelButton>
        )}
      </div>
    </div>
  );
};
