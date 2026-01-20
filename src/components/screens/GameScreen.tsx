import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera } from '../game/Camera';
import { GradientOverlay } from '../ui/GradientOverlay';
import { WordDisplay } from '../game/WordDisplay';
import { RecognizedText } from '../game/RecognizedText';
import { StreakCounter } from '../game/StreakCounter';
import { WordCounter } from '../game/WordCounter';
import { DinoProgressBar } from '../game/DinoProgressBar';
import { ScreenFlash } from '../animations/ScreenFlash';
import { Road3D } from '../game/DinoProgressBar/Road3D';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAudio } from '@/hooks/useAudio';
import { useVibration } from '@/hooks/useVibration';
import { GAME_CONFIG } from '@/constants/gameConfig';
import { validateAnswer } from '@/utils/validation';

interface GameScreenProps {
  onGameComplete: (score: number, maxStreak: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onGameComplete }) => {
  const { gameState, currentWord, isCurrentWordComplete, submitAnswer, nextWord, startGame } =
    useGameLogic();
  const { transcript, interimTranscript, startListening, stopListening, resetTranscript } =
    useSpeechRecognition();
  const { playSuccess, playError } = useAudio();
  const { vibrateSuccess, vibrateError } = useVibration();

  const [showFlash, setShowFlash] = useState(false);
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [streakAnimate, setStreakAnimate] = useState(false);

  // Use refs to avoid stale closures and track processed transcripts
  const currentWordRef = useRef(currentWord);
  const submitAnswerRef = useRef(submitAnswer);
  const lastProcessedTranscriptRef = useRef('');

  useEffect(() => {
    currentWordRef.current = currentWord;
  }, [currentWord]);

  useEffect(() => {
    submitAnswerRef.current = submitAnswer;
  }, [submitAnswer]);

  // Handle answer submission
  const handleAnswer = useCallback(
    (answer: string) => {
      // Prevent processing the same transcript twice
      if (answer === lastProcessedTranscriptRef.current) {
        return;
      }
      lastProcessedTranscriptRef.current = answer;

      const isCorrect = submitAnswerRef.current(answer);

      setFlashType(isCorrect ? 'success' : 'error');
      setShowFlash(true);

      if (isCorrect) {
        playSuccess();
        vibrateSuccess();
        setStreakAnimate(true);
        stopListening();
        setTimeout(() => {
          setStreakAnimate(false);
          setShowFlash(false);
        }, 500);
      } else {
        playError();
        vibrateError();

        // Reset and restart listening for retry
        setTimeout(() => {
          setShowFlash(false);
          resetTranscript();
          startListening();
        }, 500);
      }
    },
    [playSuccess, playError, vibrateSuccess, vibrateError, stopListening, resetTranscript, startListening]
  );

  // Callback for when dino advances to next word
  const handleWordAdvance = useCallback(() => {
    // Reset tracking to allow new answers
    lastProcessedTranscriptRef.current = '';
    // Reset transcript BEFORE advancing to prevent old answer from triggering on new word
    resetTranscript();
    nextWord();
    // Restart listening after word advances
    setTimeout(() => {
      startListening();
    }, 100);
  }, [nextWord, resetTranscript, startListening]);

  // Start game on mount
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start listening when game is active and word is not complete
  useEffect(() => {
    if (gameState.isGameActive && !gameState.isGameComplete && !isCurrentWordComplete) {
      resetTranscript();
      startListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentWordIndex, gameState.isGameActive, isCurrentWordComplete]);

  // Handle transcript changes (both final and interim)
  useEffect(() => {
    if (!gameState.isGameActive || gameState.isGameComplete || isCurrentWordComplete) {
      return;
    }

    // Check final transcript first
    if (transcript) {
      handleAnswer(transcript);
      return;
    }

    // Check interim transcript - if it matches the answer, submit immediately
    // This prevents waiting for "final" result when user already said the right word
    if (interimTranscript && validateAnswer(interimTranscript, currentWordRef.current)) {
      handleAnswer(interimTranscript);
    }
  }, [transcript, interimTranscript, gameState.isGameActive, gameState.isGameComplete, isCurrentWordComplete, handleAnswer]);

  // Handle game completion
  useEffect(() => {
    if (gameState.isGameComplete) {
      stopListening();
      onGameComplete(gameState.score, gameState.maxStreak);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isGameComplete]);

  // Calculate width from height to maintain 9:16 aspect ratio
  const frameHeight = '80vh';
  const frameWidth = 'calc(80vh * 9 / 16)';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '5vh',
        backgroundColor: '#0f172a',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: frameWidth,
          maxWidth: '400px',
          height: frameHeight,
          border: '8px solid #334155',
          borderRadius: '2.5rem',
        }}
      >
        <Camera />
        <GradientOverlay />

        {/* Fullscreen Road Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
          <Road3D isMoving={!isCurrentWordComplete} />
        </div>

        <ScreenFlash show={showFlash} type={flashType} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
          }}
        >
          {/* Top section - Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <StreakCounter streak={gameState.currentStreak} animate={streakAnimate} />
            <WordCounter
              current={gameState.currentWordIndex + 1}
              total={GAME_CONFIG.totalWords}
            />
          </div>

          {/* Top half - Word display and recognition */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WordDisplay word={currentWord.russian} />

            <div style={{ marginTop: '24px' }}>
              <RecognizedText
                text={transcript || interimTranscript}
                isInterim={!transcript && !!interimTranscript}
              />
            </div>
          </div>

        </div>

        {/* Dino Progress - fullscreen overlay */}
        <DinoProgressBar
          currentWordIndex={gameState.currentWordIndex}
          totalWords={GAME_CONFIG.totalWords}
          isCurrentWordComplete={isCurrentWordComplete}
          onWordAdvance={handleWordAdvance}
        />
      </div>
    </div>
  );
};
