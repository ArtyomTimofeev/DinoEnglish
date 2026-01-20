export interface Word {
  russian: string;
  englishAnswers: string[];
}

export interface GameState {
  currentWordIndex: number;
  score: number;
  currentStreak: number;
  maxStreak: number;
  answers: AnswerResult[];
  isGameActive: boolean;
  isGameComplete: boolean;
}

export interface AnswerResult {
  word: Word;
  userAnswer: string;
  isCorrect: boolean;
  timeElapsed?: number; // Optional - no longer used in timer-free mode
}

export type GameScreen = 'welcome' | 'game' | 'results';

export interface GameConfig {
  countdownDuration: number; // 5 seconds
  totalWords: number; // 10
  levenshteinThreshold: number; // 2
  animationDuration: number; // milliseconds
}
