import type { Word } from '@/types/game.types';
import { levenshteinDistance } from './levenshtein';
import { GAME_CONFIG } from '@/constants/gameConfig';

/**
 * Normalize user input for comparison
 */
export const normalizeInput = (input: string): string => {
  return input.toLowerCase().trim();
};

/**
 * Check if user answer is correct using exact match or fuzzy matching
 */
export const validateAnswer = (userAnswer: string, word: Word): boolean => {
  const normalized = normalizeInput(userAnswer);

  // Check exact match first
  for (const acceptedAnswer of word.englishAnswers) {
    if (normalized === normalizeInput(acceptedAnswer)) {
      return true;
    }
  }

  // Check fuzzy match with Levenshtein distance
  for (const acceptedAnswer of word.englishAnswers) {
    const distance = levenshteinDistance(normalized, normalizeInput(acceptedAnswer));
    if (distance <= GAME_CONFIG.levenshteinThreshold) {
      return true;
    }
  }

  return false;
};

/**
 * Get the correct answer(s) as a formatted string
 */
export const getCorrectAnswerString = (word: Word): string => {
  if (word.englishAnswers.length === 1) {
    return word.englishAnswers[0];
  }
  return word.englishAnswers.join(' / ');
};
