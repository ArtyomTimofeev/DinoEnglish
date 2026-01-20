# Audio Assets

This directory should contain the following audio files for game feedback:

## Required Audio Files

- `success.mp3` - Positive feedback sound (250-500ms)
- `error.mp3` - Error/incorrect answer sound (250-500ms)
- `rocket-launch.mp3` - Rocket launch sound effect (1-2 seconds)

## Audio Specifications

### success.mp3
- **Duration**: 250-500ms
- **Type**: Upbeat, positive, rewarding sound
- **Examples**: Bell chime, success chime, level up sound, coin collect
- **Volume**: Moderate, not too loud
- **Format**: MP3, 128kbps or higher

### error.mp3
- **Duration**: 250-500ms
- **Type**: Gentle error sound, not harsh or alarming
- **Examples**: Soft buzzer, wrong answer tone, gentle "oops" sound
- **Volume**: Moderate, slightly quieter than success sound
- **Format**: MP3, 128kbps or higher

### rocket-launch.mp3
- **Duration**: 1-2 seconds
- **Type**: Rocket engine/launch sound with fade out
- **Examples**: Whoosh, rocket engine ignition, space launch
- **Volume**: Moderate to loud, exciting
- **Format**: MP3, 128kbps or higher

## Where to Get Free Sound Effects

### Option 1: Freesound.org (Recommended)
Website: https://freesound.org/
- Free sound library with Creative Commons licenses
- Search terms: "success", "error", "rocket launch", "whoosh"
- Filter by license: CC0 (public domain) for easiest use
- Download and rename files as needed

### Option 2: Zapsplat.com
Website: https://www.zapsplat.com/
- Free with attribution or premium without
- High-quality sound effects
- Search by category: UI sounds, game sounds, space sounds

### Option 3: Mixkit.co
Website: https://mixkit.co/free-sound-effects/
- Completely free, no attribution required
- Good selection of UI and game sounds

### Option 4: Create Your Own
Use tools like:
- **Audacity** (free audio editor)
- **GarageBand** (Mac/iOS)
- **FL Studio** (trial version)

Simple sounds can be created with:
1. Synthesizers (for beeps and tones)
2. Foley recording (for organic sounds)
3. Voice recording + effects

## Quick Testing Solution

For quick testing without audio files, the app will:
- Try to load audio files
- Fail silently if not found (Howler.js handles this gracefully)
- Game will work without sound, just no audio feedback

You can test the app functionality without sounds and add them later.

## Installation Instructions

1. Download or create the three audio files
2. Rename them exactly as specified above:
   - `success.mp3`
   - `error.mp3`
   - `rocket-launch.mp3`
3. Place them in this `/public/sounds/` directory
4. Restart the development server if running
5. Test in the game - sounds should play on correct/incorrect answers

## Current Status

⚠️ **Audio files not yet added** - App will run without sound
Add audio files for complete experience!

## License Considerations

- Ensure you have the right to use any downloaded sounds
- Check license requirements (attribution, commercial use, etc.)
- For CC-licensed sounds, add attribution in a CREDITS.txt file
- CC0/Public domain sounds require no attribution
