// A0 is used only for results (below A1), not in word data
export type CEFRLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// CEFR levels used in game words (excludes A0)
export type GameCEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Result for each CEFR level in the game
export interface LevelResult {
  level: GameCEFRLevel;
  correctCount: number; // 0, 1, or 2
  totalCount: number;   // always 2
}

// Final user level determination result
export interface UserLevelResult {
  achievedLevel: CEFRLevel;
  isPerfect: boolean;
  totalMissed: number;
  levelResults: LevelResult[];
}

export interface Word {
  russian: string;
  englishAnswers: string[];
  level: GameCEFRLevel;
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
