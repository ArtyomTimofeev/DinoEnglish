export type DinoState = 'idle' | 'walking' | 'eating' | 'bumping' | 'recoiling' | 'watching';

export type AnimalType =
  | 'crab'
  | 'pig'
  | 'skunk'
  | 'monkey'
  | 'eagle'
  | 'wolf'
  | 'kangaroo'
  | 'cow'
  | 'orangutan'
  | 'buffalo'
  | 'caveBear'
  | 'elephant';

export interface AnimalData {
  type: AnimalType;
  scale: number;
  isEaten: boolean;
  position: number; // 0-100 percentage along the ground
}

export interface DinoProgressBarProps {
  currentWordIndex: number;
  totalWords: number;
  isCurrentWordComplete: boolean;
  isSkipping: boolean;
  correctAnswersCount: number;
  isGameComplete: boolean;
  isGameStarted: boolean;
  onWordAdvance: () => void;
  onSkip: () => void;
  onStartGame: () => void;
}

export interface DinosaurProps {
  state: DinoState;
}

export interface AnimalProps {
  type: AnimalType;
  scale: number;
  isEaten: boolean;
  isBeingEaten: boolean;
}
