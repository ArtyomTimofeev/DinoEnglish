import type { Word, CEFRLevel, GameCEFRLevel, LevelResult, UserLevelResult } from '@/types/game.types';

// CEFR levels used in game (words are A1-C2)
const GAME_LEVELS: GameCEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Point thresholds for each level
// 12 correct = C2, 10+ = C1, 8+ = B2, 6+ = B1, 4+ = A2, 2+ = A1, 0-1 = A0
const LEVEL_THRESHOLDS: { level: CEFRLevel; minPoints: number }[] = [
  { level: 'C2', minPoints: 12 },
  { level: 'C1', minPoints: 10 },
  { level: 'B2', minPoints: 8 },
  { level: 'B1', minPoints: 6 },
  { level: 'A2', minPoints: 4 },
  { level: 'A1', minPoints: 2 },
  { level: 'A0', minPoints: 0 },
];

/**
 * Calculate user's CEFR level based on game performance.
 *
 * Algorithm: Point-based thresholds
 * - Each correct word = 1 point
 * - 12 points = C2, 10+ = C1, 8+ = B2, 6+ = B1, 4+ = A2, 2+ = A1, 0-1 = A0
 *
 * @param words - Array of words in the game
 * @param correctWordIndices - Set of indices of correctly answered words
 * @returns UserLevelResult with achieved level and statistics
 */
export function calculateUserLevel(
  words: Word[],
  correctWordIndices: Set<number>
): UserLevelResult {
  // Group results by level
  const levelResults: LevelResult[] = GAME_LEVELS.map(level => {
    const levelWords = words
      .map((word, index) => ({ word, index }))
      .filter(({ word }) => word.level === level);

    const correctCount = levelWords.filter(
      ({ index }) => correctWordIndices.has(index)
    ).length;

    return {
      level,
      correctCount,
      totalCount: 2, // Always 2 words per level
    };
  });

  // Count total correct answers (points)
  const totalCorrect = correctWordIndices.size;
  const totalMissed = words.length - totalCorrect;

  // Find level based on point thresholds
  const achievedLevel = LEVEL_THRESHOLDS.find(
    ({ minPoints }) => totalCorrect >= minPoints
  )?.level || 'A0';

  return {
    achievedLevel,
    isPerfect: totalMissed === 0,
    totalMissed,
    levelResults,
  };
}
