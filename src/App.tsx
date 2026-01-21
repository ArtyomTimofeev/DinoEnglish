import { useState } from 'react';
import { GameScreen } from './components/screens/GameScreen';

function App() {
  const [gameKey, setGameKey] = useState(0); // Force remount on play again

  const handlePlayAgain = () => {
    setGameKey(prev => prev + 1); // Force GameScreen remount
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <GameScreen key={gameKey} onPlayAgain={handlePlayAgain} />
    </div>
  );
}

export default App;
