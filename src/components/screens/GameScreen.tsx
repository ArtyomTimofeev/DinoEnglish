import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera } from '../game/Camera';
import { GradientOverlay } from '../ui/GradientOverlay';
import { WordDisplay } from '../game/WordDisplay';
import { DinoProgressBar } from '../game/DinoProgressBar';
import { ScreenFlash } from '../animations/ScreenFlash';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAudio } from '@/hooks/useAudio';
import { useVibration } from '@/hooks/useVibration';
import { GAME_CONFIG } from '@/constants/gameConfig';
import { validateAnswer, findMatchedAnswer } from '@/utils/validation';
import { useFrameSize } from '@/hooks/useFrameSize';

export const GameScreen: React.FC = () => {
  const {
    gameState,
    currentWord,
    isCurrentWordComplete,
    isSkipping,
    correctAnswersCount,
    userLevelResult,
    submitAnswer,
    nextWord,
    startGame,
    skipWord,
  } = useGameLogic();
  const {
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();
  const { playSuccess, playError, playSkip } = useAudio();
  const { vibrateSuccess, vibrateError } = useVibration();

  const [showFlash, setShowFlash] = useState(false);
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [isShowingEnglish, setIsShowingEnglish] = useState(false);
  const [englishToShow, setEnglishToShow] = useState('');

  // Use refs to avoid stale closures and track processed transcripts
  const currentWordRef = useRef(currentWord);
  const submitAnswerRef = useRef(submitAnswer);
  const lastProcessedTranscriptRef = useRef('');
  const lastInterimRef = useRef('');
  const isProcessingErrorRef = useRef(false);

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

      // Block during error cooldown period
      if (isProcessingErrorRef.current) {
        return;
      }

      lastProcessedTranscriptRef.current = answer;

      const isCorrect = submitAnswerRef.current(answer);
      console.log(`🎤 Heard: "${answer}" → ${isCorrect ? '✅ correct' : '❌ wrong'}`);

      setFlashType(isCorrect ? 'success' : 'error');
      setShowFlash(true);

      if (isCorrect) {
        playSuccess();
        vibrateSuccess();
        // Микрофон не останавливаем - isCurrentWordComplete защищает от повторной обработки
        // Остановка микрофона на iOS вызывает системный звук

        // Показать тот вариант ответа, который произнёс пользователь
        setEnglishToShow(findMatchedAnswer(answer, currentWordRef.current));
        setIsShowingEnglish(true);

        setTimeout(() => {
          setShowFlash(false);
        }, 500);
      } else {
        isProcessingErrorRef.current = true;
        playError();
        vibrateError();

        // Reset and restart listening for retry
        setTimeout(() => {
          setShowFlash(false);
          // НЕ сбрасываем lastProcessedTranscriptRef - чтобы то же слово не сабмитилось повторно
          // Сбрасываем только lastInterimRef для нового interim tracking
          lastInterimRef.current = '';
          resetTranscript();
          startListening();
          isProcessingErrorRef.current = false;
        }, 500);
      }
    },
    [
      playSuccess,
      playError,
      vibrateSuccess,
      vibrateError,
      stopListening,
      resetTranscript,
      startListening,
    ]
  );

  // Callback for when dino advances to next word
  const handleWordAdvance = useCallback(() => {
    // Сбросить показ английского слова перед переходом
    setIsShowingEnglish(false);
    setEnglishToShow('');

    // Reset tracking to allow new answers
    lastProcessedTranscriptRef.current = '';
    lastInterimRef.current = '';
    // Reset transcript BEFORE advancing to prevent old answer from triggering on new word
    resetTranscript();
    nextWord();
    // Restart listening after word advances
    setTimeout(() => {
      startListening();
    }, 100);
  }, [nextWord, resetTranscript, startListening]);

  // Callback for when skip button is pressed
  const handleSkip = useCallback(() => {
    stopListening();
    resetTranscript();
    playSkip();
    lastProcessedTranscriptRef.current = '';
    lastInterimRef.current = '';

    // Показать правильный ответ
    setEnglishToShow(currentWordRef.current.englishAnswers[0]);
    setIsShowingEnglish(true);

    skipWord();
  }, [stopListening, resetTranscript, playSkip, skipWord]);

  // Start listening when game is active and word is not complete
  useEffect(() => {
    if (
      gameState.isGameActive &&
      !gameState.isGameComplete &&
      !isCurrentWordComplete
    ) {
      // Delay start to allow camera and other resources to initialize
      const delay = gameState.currentWordIndex === 0 ? 500 : 0;
      const timeoutId = setTimeout(() => {
        resetTranscript();
        startListening();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameState.currentWordIndex,
    gameState.isGameActive,
    isCurrentWordComplete,
  ]);

  // Handle transcript changes (both final and interim)
  // Key insight: submit FIRST WORD immediately when it's ready, don't wait for full phrase
  useEffect(() => {
    if (
      !gameState.isGameActive ||
      gameState.isGameComplete ||
      isCurrentWordComplete
    ) {
      return;
    }

    // Check final transcript first - extract and submit first word only
    if (transcript) {
      const firstWord = transcript.trim().split(/\s+/)[0];
      if (firstWord) {
        handleAnswer(firstWord);
      }
      return;
    }

    if (!interimTranscript) return;

    const trimmed = interimTranscript.trim();
    const words = trimmed.split(/\s+/);
    const firstWord = words[0];

    if (!firstWord) return;

    // If first word matches correct answer - submit immediately
    if (validateAnswer(firstWord, currentWordRef.current)) {
      handleAnswer(firstWord);
      return;
    }

    // If there's a space (second word started) - first word is complete, submit it now
    if (words.length > 1 || interimTranscript.includes(' ')) {
      handleAnswer(firstWord);
      return;
    }

    // Single word, no space yet, and doesn't match answer - wait for final result
    // This prevents false negatives on long words like "standardization"
    // where interim might be "standardiz" before completing
    lastInterimRef.current = firstWord;
  }, [
    transcript,
    interimTranscript,
    gameState.isGameActive,
    gameState.isGameComplete,
    isCurrentWordComplete,
    handleAnswer,
  ]);

  // Handle game completion - stop listening
  useEffect(() => {
    if (gameState.isGameComplete) {
      stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isGameComplete]);

  // Get responsive frame dimensions with 9:16 aspect ratio and scale factor
  const { width: frameWidth, height: frameHeight, scale } = useFrameSize();

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
      }}
    >
      <div
        className="game-frame"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          border: '8px solid #334155',
          borderRadius: '2.5rem',
        }}
      >
        <Camera />
        <GradientOverlay />

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
          {/* Word display - positioned lower for better focus with dino */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '75%',
            }}
          >
            <WordDisplay
              word={currentWord.russian}
              englishWord={englishToShow}
              isShowingEnglish={isShowingEnglish}
              isGameActive={gameState.isGameActive}
              isGameComplete={gameState.isGameComplete}
              userLevelResult={userLevelResult}
              scale={scale}
            />
          </div>
        </div>

        {/* Dino Progress - fullscreen overlay */}
        <DinoProgressBar
          currentWordIndex={gameState.currentWordIndex}
          totalWords={GAME_CONFIG.totalWords}
          isCurrentWordComplete={isCurrentWordComplete}
          isSkipping={isSkipping}
          correctAnswersCount={correctAnswersCount}
          isGameComplete={gameState.isGameComplete}
          isGameStarted={gameState.isGameActive}
          onWordAdvance={handleWordAdvance}
          onSkip={handleSkip}
          onStartGame={startGame}
          scale={scale}
        />
      </div>
    </div>
  );
};
