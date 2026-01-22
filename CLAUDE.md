# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language

Always communicate with the user in Russian (русский язык).

## Project Overview

VoiceLearn is a React-based Progressive Web App (PWA) that teaches English vocabulary through voice recognition. Users see Russian words and must speak the English translation. The app features a gamified dinosaur progress system where a pixel-art dinosaur "eats" animals as you answer correctly. It uses the device camera as a background, speech recognition for answers, and provides real-time feedback with audio/haptic responses.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management Pattern
The app uses a **custom hooks architecture** instead of global state management:
- `useGameLogic` - Core game state (score, streak, word progression, level scoring)
- `useSpeechRecognition` - Web Speech API wrapper for voice input
- `useAudio` - Howler.js audio feedback management
- `useVibration` - Haptic feedback for mobile devices
- `usePWA` - PWA installation prompt handling
- `useCamera` - MediaStream API for camera access

State flows unidirectionally from hooks → components, with callbacks passed down for actions.

### Screen Flow
Single screen architecture via `App.tsx`:
- **GameScreen** - The entire game experience with camera background, dinosaur progress visualization, and speech recognition
- Game state managed within GameScreen: idle → playing → complete → replay
- `WelcomeScreen` and `ResultsScreen` exist but are currently unused (legacy)

### Game Logic Flow
Located in [src/hooks/useGameLogic.ts](src/hooks/useGameLogic.ts):
1. Words are shuffled from `WORD_DATASET` on game start
2. Player starts the game via Play button
3. Speech recognition validates answers in real-time
4. Answer validation uses exact match OR Levenshtein distance ≤ 2
5. Correct answers: dinosaur eats the animal, advances to next word, awards level points
6. Skipped answers: animal passes by, no points awarded
7. After 12 words, game shows Play Again button

### CEFR Level System
Words are categorized by CEFR levels (A1-C2) with increasing point values:
- A1: 2 points, A2: 3 points, B1: 4 points
- B2: 5 points, C1: 6 points, C2: 7 points
- Maximum possible score: 54 points (all words correct)
- Progress is visualized via `LevelProgressBar` component

### Answer Validation System
Located in [src/utils/validation.ts](src/utils/validation.ts):
- Normalizes input (lowercase, trim)
- First checks exact match against `word.englishAnswers[]`
- Falls back to fuzzy matching using Levenshtein distance
- Threshold of 2 allows minor typos/pronunciation errors
- Multiple accepted answers per word (e.g., "courage" / "bravery")

### Speech Recognition Implementation
Located in [src/hooks/useSpeechRecognition.ts](src/hooks/useSpeechRecognition.ts):
- Uses Web Speech API (webkitSpeechRecognition/SpeechRecognition)
- Configured for en-US, interim results enabled
- Returns both `transcript` (final) and `interimTranscript` (live)
- Handles browser compatibility and permission errors
- Validates first word immediately when it matches, or waits 250ms for stabilization

### DinoProgressBar System
Located in [src/components/game/DinoProgressBar/](src/components/game/DinoProgressBar/):

The main game visualization showing a pixel-art dinosaur walking on an infinite scrolling road. Animals approach from the right, and the dinosaur either eats them (correct answer) or watches them pass (skip).

**Components:**
- `DinoProgressBar.tsx` - Main orchestrator managing game state, animations, and controls
- `Dinosaur.tsx` - Animated dinosaur with states: idle, walking, bumping, recoiling, eating, watching
- `Road3D.tsx` - Infinite scrolling road using CSS keyframe animation
- `sprites/DinoSprite.tsx` - Pixel-art dinosaur SVG with walk cycle
- `sprites/AnimalSprites.tsx` - 12 unique animal sprites (crab → elephant)

**Animation Flow:**
1. Game idle: dinosaur in idle state, road stopped
2. Game starts: road scrolls, animal approaches from right
3. Animal reaches dinosaur: bump loop (dinosaur bumps, animal bounces back)
4. Correct answer: eating animation (animal gets sucked in), next animal approaches
5. Skip: watching animation (animal passes by to the left)

**Configuration:** `DINO_CONFIG` in [src/constants/gameConfig.ts](src/constants/gameConfig.ts)

## Important Patterns

### Path Aliasing
Use `@/` prefix for imports from `src/`:
```typescript
import { useGameLogic } from '@/hooks/useGameLogic';
import type { Word } from '@/types/game.types';
```

### Component Organization
```
components/
├── ui/           # Reusable UI (Button, GradientOverlay, PixelButton, MotivationalMessage)
├── game/         # Game components (WordDisplay, DinoProgressBar/, LevelProgressBar)
├── screens/      # Full-screen views (WelcomeScreen, GameScreen)
└── animations/   # Animation components (ScreenFlash, LandingAnimation)
```

### Type Safety
All game state, words, and configuration are strongly typed:
- [src/types/game.types.ts](src/types/game.types.ts) - Core game interfaces
- [src/types/speech.types.ts](src/types/speech.types.ts) - Speech recognition types
- [src/types/pwa.types.ts](src/types/pwa.types.ts) - PWA installation event types
- [src/components/game/DinoProgressBar/types.ts](src/components/game/DinoProgressBar/types.ts) - DinoState, AnimalType, animation props

### Configuration Constants
Located in [src/constants/gameConfig.ts](src/constants/gameConfig.ts):
- `GAME_CONFIG` - Game rules (countdown: 5s, total words: 12, Levenshtein threshold: 2)
- `SPEECH_CONFIG` - Speech recognition settings
- `CAMERA_CONFIG` - Camera stream constraints
- `PERFORMANCE_TARGETS` - Target metrics for optimization
- `DINO_CONFIG` - Dinosaur animation timings, animal types, scales, and CEFR levels
- `LEVEL_POINTS` - Points awarded per CEFR level (A1=2 → C2=7)
- `MAX_LEVEL_SCORE` - Maximum possible score (54 points)

## Adding New Words

Edit [src/data/wordDataset.ts](src/data/wordDataset.ts):
```typescript
{
  russian: 'СЛОВО',
  englishAnswers: ['word', 'term'], // Multiple accepted answers
  level: 'A1' // CEFR level (A1, A2, B1, B2, C1, C2)
}
```
Words are shuffled each game. Currently uses 12 words per game (2 per CEFR level).

To modify animals/levels, update `DINO_CONFIG.animals` and `DINO_CONFIG.animalLevels` in gameConfig.ts.

## Build Configuration

[vite.config.ts](vite.config.ts) includes:
- Manual code splitting: `vendor` (React), `motion` (Framer Motion), `audio` (Howler)
- Terser minification for production
- CSS code splitting enabled
- Path alias `@` → `./src`

## Browser Requirements

- **Speech Recognition**: Chrome/Edge (WebKit Speech API)
- **Camera Access**: All modern browsers with MediaStream API
- **PWA**: Service Worker support for offline functionality
- **Mobile**: Optimized for 9:16 aspect ratio, camera facing mode 'user'

## Performance Considerations

- Camera stream acquired on mount in GameScreen
- Speech recognition extracts first word immediately on match, otherwise waits 250ms for stabilization
- Audio files loaded via Howler.js should be preloaded on app init
- Framer Motion animations use transform/opacity for GPU acceleration
- Road3D uses CSS keyframe animations for smooth infinite scrolling
- Build output uses code splitting to reduce initial bundle size
