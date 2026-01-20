export type DinoState = 'idle' | 'walking' | 'eating' | 'bumping' | 'recoiling';

export type AnimalType =
  | 'hedgehog'
  | 'mouse'
  | 'rabbit'
  | 'fox'
  | 'dog'
  | 'deer'
  | 'horse'
  | 'bear'
  | 'rhino'
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
  onWordAdvance: () => void;
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
