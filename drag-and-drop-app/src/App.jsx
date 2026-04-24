import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import DragDropGame from './components/DragDropGame';
import Result from './components/Result';
import pluxeeLogo from './assets/pluxee_logo.png';
import './App.css';

const SCREENS = { START: 'start', GAME: 'game', RESULT: 'result' };

function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = useCallback(() => setScreen(SCREENS.GAME), []);
  const handleFinish = useCallback((score) => { setFinalScore(score); setScreen(SCREENS.RESULT); }, []);
  const handleRestart = useCallback(() => { setFinalScore(0); setScreen(SCREENS.START); }, []);

  return (
    <div className="app-layout">
      <div className="left-panel">
        <div className="brand-headline">
          BE<br />THE<br />CHA<br />NGE
        </div>
        <img src={pluxeeLogo} alt="Pluxee" className="pluxee-logo" />
      </div>

      <div className="right-panel">
        <div className="stripes-bg">
          <div className="stripe stripe-1" />
          <div className="stripe stripe-2" />
          <div className="stripe stripe-3" />
          <div className="stripe stripe-4" />
        </div>

        <div className="card">
          {screen === SCREENS.START  && <StartScreen onStart={handleStart} />}
          {screen === SCREENS.GAME   && <DragDropGame onFinish={handleFinish} />}
          {screen === SCREENS.RESULT && <Result score={finalScore} onRestart={handleRestart} />}
        </div>
      </div>
    </div>
  );
}

export default App;
