import { useState } from 'react';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import type { GameScreen as GameScreenType } from './types/game.types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreenType>('welcome');
  const [finalScore, setFinalScore] = useState(0);
  const [finalMaxStreak, setFinalMaxStreak] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentScreen('game');
    setError(null);
  };

  const handleGameComplete = (score: number, maxStreak: number) => {
    setFinalScore(score);
    setFinalMaxStreak(maxStreak);
    setCurrentScreen('results');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('game');
    setFinalScore(0);
    setFinalMaxStreak(0);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {error && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px'
        }}>
          <p style={{ fontWeight: 600 }}>Error</p>
          <p style={{ fontSize: '14px' }}>{error}</p>
        </div>
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} onError={handleError} />
      )}

      {currentScreen === 'game' && (
        <GameScreen onGameComplete={handleGameComplete} />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          score={finalScore}
          maxStreak={finalMaxStreak}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
