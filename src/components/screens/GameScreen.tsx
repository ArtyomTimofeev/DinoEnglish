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
import { GAME_CONFIG, SPEECH_PROTECTION_CONFIG } from '@/constants/gameConfig';
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
    startSession,
    endSession,
    pauseInput,
    resumeInput,
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
  const wrongAnswerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    currentWordRef.current = currentWord;
  }, [currentWord]);

  useEffect(() => {
    submitAnswerRef.current = submitAnswer;
  }, [submitAnswer]);

  // Handle game start - start speech session once
  const handleStartGame = useCallback(() => {
    startGame();
    startSession();
    // Delay before accepting input to allow initialization
    setTimeout(() => {
      resumeInput();
    }, SPEECH_PROTECTION_CONFIG.sessionStartDelay);
  }, [startGame, startSession, resumeInput]);

  // Show error feedback (extracted to avoid duplication)
  const showErrorFeedback = useCallback(
    (answer: string) => {
      lastProcessedTranscriptRef.current = answer;
      console.log(`🎤 Heard: "${answer}" → ❌ wrong`);

      isProcessingErrorRef.current = true;
      setFlashType('error');
      setShowFlash(true);
      pauseInput();
      playError();
      vibrateError();

      // Reset and resume input after sound protection delay
      setTimeout(() => {
        setShowFlash(false);
        lastInterimRef.current = '';
        resetTranscript();
        resumeInput();
        isProcessingErrorRef.current = false;
      }, 500);
    },
    [pauseInput, playError, vibrateError, resetTranscript, resumeInput]
  );

  // Handle answer submission with debounce for all answers
  const handleAnswer = useCallback(
    (answer: string) => {
      // Cancel any pending answer timeout
      if (wrongAnswerTimeoutRef.current) {
        clearTimeout(wrongAnswerTimeoutRef.current);
        wrongAnswerTimeoutRef.current = null;
      }

      // Prevent processing the same transcript twice
      if (answer === lastProcessedTranscriptRef.current) {
        return;
      }

      // Block during error cooldown period
      if (isProcessingErrorRef.current) {
        return;
      }

      // All answers go through debounce - wait for word to complete
      wrongAnswerTimeoutRef.current = setTimeout(() => {
        // Check again in case answer was already processed
        if (answer === lastProcessedTranscriptRef.current) {
          wrongAnswerTimeoutRef.current = null;
          return;
        }

        // Check if answer is correct
        const isCorrect = validateAnswer(answer, currentWordRef.current);

        if (isCorrect) {
          lastProcessedTranscriptRef.current = answer;
          submitAnswerRef.current(answer);
          console.log(`🎤 Heard: "${answer}" → ✅ correct`);

          setFlashType('success');
          setShowFlash(true);
          pauseInput();
          playSuccess();
          vibrateSuccess();

          // Show the answer variant that user spoke
          setEnglishToShow(findMatchedAnswer(answer, currentWordRef.current));
          setIsShowingEnglish(true);

          setTimeout(() => {
            setShowFlash(false);
          }, 500);
        } else {
          showErrorFeedback(answer);
        }

        wrongAnswerTimeoutRef.current = null;
      }, SPEECH_PROTECTION_CONFIG.wrongAnswerDebounce);
    },
    [
      playSuccess,
      vibrateSuccess,
      pauseInput,
      showErrorFeedback,
    ]
  );

  // Callback for when dino advances to next word
  const handleWordAdvance = useCallback(() => {
    // Cancel any pending wrong answer timeout
    if (wrongAnswerTimeoutRef.current) {
      clearTimeout(wrongAnswerTimeoutRef.current);
      wrongAnswerTimeoutRef.current = null;
    }

    // Reset showing english word before transition
    setIsShowingEnglish(false);
    setEnglishToShow('');

    // Reset tracking to allow new answers
    lastProcessedTranscriptRef.current = '';
    lastInterimRef.current = '';
    resetTranscript();
    nextWord();

    // Resume input after sound protection delay
    setTimeout(() => {
      resumeInput();
    }, SPEECH_PROTECTION_CONFIG.soundProtectionDelay);
  }, [nextWord, resetTranscript, resumeInput]);

  // Callback for when skip button is pressed
  const handleSkip = useCallback(() => {
    // Cancel any pending wrong answer timeout
    if (wrongAnswerTimeoutRef.current) {
      clearTimeout(wrongAnswerTimeoutRef.current);
      wrongAnswerTimeoutRef.current = null;
    }

    pauseInput();
    resetTranscript();
    playSkip();
    lastProcessedTranscriptRef.current = '';
    lastInterimRef.current = '';

    // Show correct answer
    setEnglishToShow(currentWordRef.current.englishAnswers[0]);
    setIsShowingEnglish(true);

    skipWord();
  }, [pauseInput, resetTranscript, playSkip, skipWord]);

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

  // Handle game completion - end speech session
  useEffect(() => {
    if (gameState.isGameComplete) {
      endSession();
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
          onStartGame={handleStartGame}
          scale={scale}
        />
      </div>
    </div>
  );
};
