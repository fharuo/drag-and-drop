import { useState, useEffect } from 'react';
import questions, { OPTIONS } from '../data/sentences';
import WordChip from './WordChip';

export default function DragDropGame({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedChip, setPlacedChip] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [slideClass, setSlideClass] = useState('slide-in');
  const [dzHover, setDzHover] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    if (!placedChip || answered) return;

    const validate = setTimeout(() => {
      const correct = placedChip === question.answer;
      const newScore = correct ? score + 1 : score;
      const newAnswers = [...answers, placedChip];

      if (correct) setScore(newScore);
      setAnswers(newAnswers);
      setIsCorrect(correct);
      setAnswered(true);

      setTimeout(() => {
        if (isLast) { onFinish(newScore, newAnswers); return; }
        setSlideClass('slide-out');
        setTimeout(() => {
          setPlacedChip(null);
          setIsCorrect(null);
          setAnswered(false);
          setCurrentIndex((i) => i + 1);
          setSlideClass('slide-in');
        }, 350);
      }, 1500);
    }, 700);

    return () => clearTimeout(validate);
  }, [placedChip, answered, question, score, answers, isLast, onFinish]);

  function handleDrop(word) {
    if (answered) return;
    setPlacedChip(word);
  }

  const dzClass = [
    'top-drop-zone',
    dzHover && !placedChip ? 'dz-hover' : '',
    placedChip ? 'dz-filled' : '',
    answered ? (isCorrect ? 'dz-correct' : 'dz-wrong') : '',
  ].filter(Boolean).join(' ');

  const placedOption = OPTIONS.find((o) => o.label === placedChip);

  return (
    <div className="card-inner game-card">
      <div className="progress-counter">
        {currentIndex + 1}<span>/{questions.length}</span>
      </div>

      <div key={currentIndex} className={`question-slide ${slideClass}`}>
        <p className="question-sentence">{question.text}</p>
        <p className="pillar-label">Qual é este pilar?</p>

        <div id="drop-zone" className={dzClass}>
          {placedChip ? (
            <span className={`placed-chip ${placedOption?.colorClass}`}>{placedChip}</span>
          ) : (
            <span className="dz-hint">arraste aqui</span>
          )}
        </div>

        <div className="chips-grid">
          {OPTIONS.map((opt) =>
            opt.label === placedChip ? (
              <div key={opt.label} className="chip-empty-slot" />
            ) : (
              <WordChip
                key={opt.label}
                word={opt.label}
                colorClass={opt.colorClass}
                answered={answered}
                isCorrectAnswer={opt.label === question.answer}
                onDrop={handleDrop}
                onHoverChange={setDzHover}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
