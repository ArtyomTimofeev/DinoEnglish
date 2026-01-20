import { useState, useCallback, useEffect } from 'react';
import type { GameState, AnswerResult, Word } from '@/types/game.types';
import { WORD_DATASET, shuffleWords } from '@/data/wordDataset';
import { validateAnswer } from '@/utils/validation';
import { GAME_CONFIG } from '@/constants/gameConfig';

interface UseGameLogicReturn {
  gameState: GameState;
  currentWord: Word;
  words: Word[];
  isCurrentWordComplete: boolean;
  submitAnswer: (userAnswer: string) => boolean;
  nextWord: () => void;
  resetGame: () => void;
  startGame: () => void;
}

const initialGameState: GameState = {
  currentWordIndex: 0,
  score: 0,
  currentStreak: 0,
  maxStreak: 0,
  answers: [],
  isGameActive: false,
  isGameComplete: false,
};

export const useGameLogic = (): UseGameLogicReturn => {
  const [words, setWords] = useState<Word[]>([]);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isCurrentWordComplete, setIsCurrentWordComplete] = useState(false);

  // Initialize words on mount
  useEffect(() => {
    setWords(shuffleWords(WORD_DATASET));
  }, []);

  const currentWord = words[gameState.currentWordIndex] || WORD_DATASET[0];

  const startGame = useCallback(() => {
    setWords(shuffleWords(WORD_DATASET));
    setGameState({
      ...initialGameState,
      isGameActive: true,
      isGameComplete: false,
    });
    setIsCurrentWordComplete(false);
  }, []);

  const submitAnswer = useCallback(
    (userAnswer: string): boolean => {
      if (!gameState.isGameActive || gameState.isGameComplete || isCurrentWordComplete) {
        return false;
      }

      const isCorrect = validateAnswer(userAnswer, currentWord);

      if (isCorrect) {
        // Only record answer and update state on correct answer
        const answerResult: AnswerResult = {
          word: currentWord,
          userAnswer,
          isCorrect,
          timeElapsed: 0, // No longer tracking time
        };

        setGameState((prev) => {
          const newStreak = prev.currentStreak + 1;
          const newMaxStreak = Math.max(prev.maxStreak, newStreak);
          const newScore = prev.score + 1;

          return {
            ...prev,
            score: newScore,
            currentStreak: newStreak,
            maxStreak: newMaxStreak,
            answers: [...prev.answers, answerResult],
          };
        });

        setIsCurrentWordComplete(true);
      }
      // On wrong answer, don't record anything - user will retry

      return isCorrect;
    },
    [gameState.isGameActive, gameState.isGameComplete, isCurrentWordComplete, currentWord]
  );

  const nextWord = useCallback(() => {
    setIsCurrentWordComplete(false);
    setGameState((prev) => {
      const nextIndex = prev.currentWordIndex + 1;
      const isComplete = nextIndex >= GAME_CONFIG.totalWords;

      return {
        ...prev,
        currentWordIndex: nextIndex,
        isGameActive: !isComplete,
        isGameComplete: isComplete,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setWords(shuffleWords(WORD_DATASET));
    setGameState(initialGameState);
    setIsCurrentWordComplete(false);
  }, []);

  return {
    gameState,
    currentWord,
    words,
    isCurrentWordComplete,
    submitAnswer,
    nextWord,
    resetGame,
    startGame,
  };
};
