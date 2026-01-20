# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoiceLearn is a React-based Progressive Web App (PWA) that teaches English vocabulary through voice recognition. Users see Russian words and must speak the English translation within a countdown timer. The app uses the device camera as a background, speech recognition for answers, and provides real-time feedback with audio/haptic responses.

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
- `useGameLogic` - Core game state (score, streak, word progression)
- `useSpeechRecognition` - Web Speech API wrapper for voice input
- `useAudio` - Howler.js audio feedback management
- `useVibration` - Haptic feedback for mobile devices
- `usePWA` - PWA installation prompt handling
- `useCamera` - MediaStream API for camera access

State flows unidirectionally from hooks → components, with callbacks passed down for actions.

### Screen Flow
Three main screens managed by `App.tsx` using local state:
1. **WelcomeScreen** - Permission requests (microphone, camera), PWA installation prompt
2. **GameScreen** - Main game loop with camera background, countdown timer, speech recognition
3. **ResultsScreen** - Final score display and replay option

### Game Logic Flow
Located in [src/hooks/useGameLogic.ts](src/hooks/useGameLogic.ts):
1. Words are shuffled from `WORD_DATASET` on game start
2. Each word has a 5-second countdown timer
3. Speech recognition runs continuously during countdown
4. Answer validation uses exact match OR Levenshtein distance ≤ 2
5. Correct answers increment streak and score
6. Wrong answers reset streak and show correct answer
7. After 10 words, game transitions to results screen

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
- Must be started/stopped manually per word

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
├── ui/           # Reusable UI components (Button, GradientOverlay)
├── game/         # Game-specific components (WordDisplay, CountdownTimer)
├── screens/      # Full-screen views (WelcomeScreen, GameScreen, ResultsScreen)
└── animations/   # Animation components (ScreenFlash, LandingAnimation)
```

### Type Safety
All game state, words, and configuration are strongly typed in [src/types/](src/types/):
- `game.types.ts` - Core game interfaces
- `speech.types.ts` - Speech recognition types
- `pwa.types.ts` - PWA installation event types

### Configuration Constants
Located in [src/constants/gameConfig.ts](src/constants/gameConfig.ts):
- `GAME_CONFIG` - Game rules (countdown: 5s, total words: 10, Levenshtein threshold: 2)
- `SPEECH_CONFIG` - Speech recognition settings
- `CAMERA_CONFIG` - Camera stream constraints
- `PERFORMANCE_TARGETS` - Target metrics for optimization

## Adding New Words

Edit [src/data/wordDataset.ts](src/data/wordDataset.ts):
```typescript
{
  russian: 'СЛОВО',
  englishAnswers: ['word', 'term'] // Multiple accepted answers
}
```
Words are automatically shuffled each game. `GAME_CONFIG.totalWords` determines how many are used per game.

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

- Camera stream should be acquired early (WelcomeScreen) to reduce GameScreen latency
- Speech recognition must be restarted for each new word (not continuous across words)
- Audio files loaded via Howler.js should be preloaded on app init
- Framer Motion animations use transform/opacity for GPU acceleration
- Build output uses code splitting to reduce initial bundle size
