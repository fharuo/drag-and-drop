import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import DragDropGame from './components/DragDropGame';
import Result from './components/Result';
import { saveToSheets } from './utils/sheets';
import pluxeeLogo from './assets/pluxee_logo.png';
import './App.css';

const SCREENS = { START: 'start', GAME: 'game', RESULT: 'result' };

function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [userData, setUserData] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = useCallback((data) => {
    setUserData(data);
    setScreen(SCREENS.GAME);
  }, []);

  const handleFinish = useCallback((score, respostas) => {
    setFinalScore(score);
    saveToSheets({ nome: userData.nome, email: userData.email, score, respostas });
    setScreen(SCREENS.RESULT);
  }, [userData]);

  const handleRestart = useCallback(() => {
    setFinalScore(0);
    setUserData(null);
    setScreen(SCREENS.START);
  }, []);

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
