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
 * Check if user answer is correct using exact match only (for interim results)
 */
export const validateAnswerExact = (userAnswer: string, word: Word): boolean => {
  const normalized = normalizeInput(userAnswer);

  for (const acceptedAnswer of word.englishAnswers) {
    if (normalized === normalizeInput(acceptedAnswer)) {
      return true;
    }
  }

  return false;
};

/**
 * Check if user answer is correct using exact match or fuzzy matching
 */
export const validateAnswer = (userAnswer: string, word: Word): boolean => {
  // Check exact match first
  if (validateAnswerExact(userAnswer, word)) {
    return true;
  }

  const normalized = normalizeInput(userAnswer);

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

/**
 * Find the matched answer from englishAnswers array
 * Returns the answer that matched (exact or fuzzy), or first answer as fallback
 */
export const findMatchedAnswer = (userAnswer: string, word: Word): string => {
  const normalized = normalizeInput(userAnswer);

  // Check exact match first
  for (const acceptedAnswer of word.englishAnswers) {
    if (normalized === normalizeInput(acceptedAnswer)) {
      return acceptedAnswer;
    }
  }

  // Check fuzzy match
  for (const acceptedAnswer of word.englishAnswers) {
    const distance = levenshteinDistance(normalized, normalizeInput(acceptedAnswer));
    if (distance <= GAME_CONFIG.levenshteinThreshold) {
      return acceptedAnswer;
    }
  }

  // Fallback to first answer
  return word.englishAnswers[0];
};
