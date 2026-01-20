import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dinosaur } from './Dinosaur';
import { AnimalSprite } from './sprites/AnimalSprites';
import type { DinoState, AnimalType, DinoProgressBarProps } from './types';
import { DINO_CONFIG } from '@/constants/gameConfig';

export const DinoProgressBar: React.FC<DinoProgressBarProps> = ({
  currentWordIndex,
  totalWords,
  isCurrentWordComplete,
  onWordAdvance,
}) => {
  const [dinoState, setDinoState] = useState<DinoState>('idle');
  const [isEatingAnimation, setIsEatingAnimation] = useState(false);
  const [hasReachedAnimal, setHasReachedAnimal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [animalKey, setAnimalKey] = useState(0); // Key for re-mounting animal animation

  // Refs for tracking state without causing re-renders
  const bumpLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const travelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEatingRef = useRef(false);
  const currentAnimalIndexRef = useRef(0);
  const onWordAdvanceRef = useRef(onWordAdvance);

  // Keep callback ref updated
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

  // Start traveling to next animal (animal approaches)
  const startTraveling = useCallback(() => {
    clearAllTimeouts();
    setHasReachedAnimal(false);
    setDinoState('idle'); // Brief idle state before walking
    setAnimalKey((prev) => prev + 1); // Trigger new animal animation

    // After a brief pause, start walking
    const idleTimeout = setTimeout(() => {
      setDinoState('walking');
      travelTimeoutRef.current = setTimeout(() => {
        setHasReachedAnimal(true);
      }, DINO_CONFIG.travelDuration);
    }, 200);

    // Store the idle timeout for cleanup
    bumpLoopRef.current = idleTimeout;
  }, [clearAllTimeouts]);

  // Start bump loop
  const startBumpLoop = useCallback(() => {
    if (bumpLoopRef.current || isEatingRef.current) return;

    const doBump = () => {
      if (isEatingRef.current) return;

      setDinoState('bumping');

      bumpLoopRef.current = setTimeout(() => {
        if (isEatingRef.current) return;
        setDinoState('recoiling');

        bumpLoopRef.current = setTimeout(() => {
          if (isEatingRef.current) return;
          setDinoState('walking');
          bumpLoopRef.current = setTimeout(doBump, 200);
        }, DINO_CONFIG.recoilDuration);
      }, DINO_CONFIG.bumpDuration);
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

  // Initialize: start idle, then walking to first animal
  useEffect(() => {
    if (isInitialized) return;

    setIsInitialized(true);
    currentAnimalIndexRef.current = 0;
    setDinoState('idle');

    // After a brief pause, start walking
    const idleTimeout = setTimeout(() => {
      setDinoState('walking');
      travelTimeoutRef.current = setTimeout(() => {
        setHasReachedAnimal(true);
      }, DINO_CONFIG.travelDuration);
    }, 300);

    return () => {
      clearTimeout(idleTimeout);
      clearAllTimeouts();
    };
  }, [isInitialized, clearAllTimeouts]);

  // Handle when dino reaches animal OR when word is completed
  useEffect(() => {
    // If word is complete, eat (whether we've reached the animal or not)
    if (isCurrentWordComplete) {
      doEat();
      return;
    }

    // If we've reached the animal but word not complete, start bumping
    if (hasReachedAnimal) {
      startBumpLoop();
    }
  }, [hasReachedAnimal, isCurrentWordComplete, doEat, startBumpLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // Get current animal data
  const currentAnimal = useMemo(() => {
    if (currentWordIndex >= totalWords) return null;
    return {
      type: DINO_CONFIG.animals[currentWordIndex] as AnimalType,
      scale: DINO_CONFIG.animalScales[currentWordIndex],
    };
  }, [currentWordIndex, totalWords]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 15,
      }}
    >
      {/* Current Animal - appears from vanishing point (upper right) and approaches */}
      <AnimatePresence mode="wait">
        {currentAnimal && !isEatingAnimation && (
          <motion.div
            key={`animal-${animalKey}`}
            initial={{
              scale: 0.2,
              opacity: 0.5,
              right: '3%',
              top: '50%',
            }}
            animate={{
              scale: hasReachedAnimal ? 0.8 : 0.45,
              opacity: 1,
              right: hasReachedAnimal ? '55%' : '28%',
              top: hasReachedAnimal ? '72%' : '60%',
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: hasReachedAnimal ? 0.3 : DINO_CONFIG.travelDuration / 1000,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              transformOrigin: 'center bottom',
              zIndex: 10,
            }}
          >
            <AnimalSprite type={currentAnimal.type} scale={currentAnimal.scale} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eating animation - animal gets consumed */}
      <AnimatePresence>
        {isEatingAnimation && currentAnimal && (
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 1,
              right: '55%',
              top: '72%',
            }}
            animate={{
              scale: 0.3,
              opacity: 0,
              right: '65%',
              top: '82%',
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DINO_CONFIG.eatDuration / 1000,
              ease: 'easeIn',
            }}
            style={{
              position: 'absolute',
              transformOrigin: 'center bottom',
              zIndex: 10,
            }}
          >
            <AnimalSprite type={currentAnimal.type} scale={currentAnimal.scale} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dinosaur - fixed at bottom, facing forward */}
      <Dinosaur state={dinoState} />
    </div>
  );
};
