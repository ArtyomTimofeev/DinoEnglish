import { useState, useCallback, useEffect, useMemo } from 'react';
import type { GameState, AnswerResult, Word, UserLevelResult } from '@/types/game.types';
import { selectGameWords, WORD_DATASET } from '@/data/wordDataset';
import { validateAnswer } from '@/utils/validation';
import { calculateUserLevel } from '@/utils/levelCalculation';
import { GAME_CONFIG } from '@/constants/gameConfig';

interface UseGameLogicReturn {
  gameState: GameState;
  currentWord: Word;
  words: Word[];
  isCurrentWordComplete: boolean;
  isSkipping: boolean;
  correctAnswersCount: number;
  userLevelResult: UserLevelResult | null;
  submitAnswer: (userAnswer: string) => boolean;
  nextWord: () => void;
  resetGame: () => void;
  startGame: () => void;
  skipWord: () => void;
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
  const [isSkipping, setIsSkipping] = useState(false);
  const [correctWordIndices, setCorrectWordIndices] = useState<Set<number>>(new Set());

  // Initialize words on mount
  useEffect(() => {
    setWords(selectGameWords());
  }, []);

  const currentWord = words[gameState.currentWordIndex] || WORD_DATASET[0];

  const startGame = useCallback(() => {
    // Загружаем новые слова при старте игры
    setWords(selectGameWords());
    setGameState({
      ...initialGameState,
      isGameActive: true,
      isGameComplete: false,
    });
    setIsCurrentWordComplete(false);
    setIsSkipping(false);
    setCorrectWordIndices(new Set());
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

        setCorrectWordIndices((prev) => new Set([...prev, gameState.currentWordIndex]));
        setIsCurrentWordComplete(true);
      }
      // On wrong answer, don't record anything - user will retry

      return isCorrect;
    },
    [gameState.isGameActive, gameState.isGameComplete, isCurrentWordComplete, currentWord]
  );

  const nextWord = useCallback(() => {
    setIsCurrentWordComplete(false);
    setIsSkipping(false);
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

  const skipWord = useCallback(() => {
    if (!gameState.isGameActive || gameState.isGameComplete || isCurrentWordComplete || isSkipping) {
      return;
    }
    setIsSkipping(true);
    // Don't update score - skipped words don't count
  }, [gameState.isGameActive, gameState.isGameComplete, isCurrentWordComplete, isSkipping]);

  const resetGame = useCallback(() => {
    setWords(selectGameWords());
    setGameState(initialGameState);
    setIsCurrentWordComplete(false);
  }, []);

  // Calculate user level result when game is complete
  const userLevelResult = useMemo(() => {
    if (!gameState.isGameComplete || words.length === 0) {
      return null;
    }
    return calculateUserLevel(words, correctWordIndices);
  }, [gameState.isGameComplete, words, correctWordIndices]);

  return {
    gameState,
    currentWord,
    words,
    isCurrentWordComplete,
    isSkipping,
    correctAnswersCount: correctWordIndices.size,
    userLevelResult,
    submitAnswer,
    nextWord,
    resetGame,
    startGame,
    skipWord,
  };
};
