import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import DragDropGame from './components/DragDropGame';
import Result from './components/Result';
import './App.css';

const SCREENS = {
  START: 'start',
  GAME: 'game',
  RESULT: 'result',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = useCallback(() => setScreen(SCREENS.GAME), []);

  const handleFinish = useCallback((score) => {
    setFinalScore(score);
    setScreen(SCREENS.RESULT);
  }, []);

  const handleRestart = useCallback(() => {
    setFinalScore(0);
    setScreen(SCREENS.START);
  }, []);

  return (
    <div className="app-container">
      {screen === SCREENS.START && <StartScreen onStart={handleStart} />}
      {screen === SCREENS.GAME && <DragDropGame onFinish={handleFinish} />}
      {screen === SCREENS.RESULT && <Result score={finalScore} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
