import { useState } from 'react';
import sentences from '../data/sentences';
import WordChip from './WordChip';

export default function DragDropGame({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filledWord, setFilledWord] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [slideClass, setSlideClass] = useState('slide-in');

  const sentence = sentences[currentIndex];
  const isLast = currentIndex === sentences.length - 1;
  const parts = sentence.text.split('___');

  function handleDrop(word) {
    if (answered) return;
    setFilledWord(word);
  }

  function handleConfirm() {
    if (!filledWord || answered) return;

    const correct = filledWord === sentence.answer;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setIsCorrect(correct);
    setAnswered(true);

    setTimeout(() => {
      if (isLast) {
        onFinish(newScore);
        return;
      }
      setSlideClass('slide-out');
      setTimeout(() => {
        setFilledWord(null);
        setIsCorrect(null);
        setAnswered(false);
        setCurrentIndex((i) => i + 1);
        setSlideClass('slide-in');
      }, 400);
    }, 1500);
  }

  function handleClearDrop() {
    if (!answered) setFilledWord(null);
  }

  const dropZoneClass = [
    'drop-zone',
    filledWord ? 'drop-zone-filled' : '',
    answered && isCorrect ? 'drop-zone-correct' : '',
    answered && !isCorrect ? 'drop-zone-incorrect' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="screen game-screen">
      <div className="quiz-dots-indicator">
        {sentences.map((_, i) => (
          <span key={i} className={`quiz-dot ${i <= currentIndex ? 'active' : ''}`} />
        ))}
      </div>

      <div key={currentIndex} className={`question-card ${slideClass}`}>
        <p className="sentence-hint">Complete a frase arrastando a palavra correta:</p>

        <div className="sentence-wrapper">
          <p className="sentence-text">
            <span>{parts[0]}</span>
            <span
              id="sentence-drop-zone"
              className={dropZoneClass}
              onClick={handleClearDrop}
              title={filledWord && !answered ? 'Toque para remover' : undefined}
            >
              {filledWord || <span className="drop-zone-placeholder">arraste aqui</span>}
            </span>
            <span>{parts[1]}</span>
          </p>
        </div>

        {answered && (
          <p className={`feedback-text ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {isCorrect ? '✓ Correto!' : `✗ A resposta certa é "${sentence.answer}"`}
          </p>
        )}

        <div className="chips-container">
          {sentence.options.map((word) => (
            <WordChip
              key={word}
              word={word}
              answered={answered}
              isAnswer={word === sentence.answer}
              isPlaced={filledWord === word}
              onDrop={handleDrop}
            />
          ))}
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={handleConfirm}
          disabled={!filledWord || answered}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
