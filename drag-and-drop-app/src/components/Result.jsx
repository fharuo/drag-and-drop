import DotPattern from './DotPattern';
import sentences from '../data/sentences';

const MESSAGES = [
  { min: 0, max: 1, text: 'Continue aprendendo! Os valores da empresa são o coração da nossa cultura.' },
  { min: 2, max: 3, text: 'Bom esforço! Você já conhece parte dos nossos valores corporativos.' },
  { min: 4, max: 4, text: 'Muito bem! Você demonstra um sólido conhecimento dos nossos valores.' },
  { min: 5, max: 5, text: 'Parabéns! Você domina completamente os valores que nos guiam.' },
];

function getMessage(score) {
  return MESSAGES.find((m) => score >= m.min && score <= m.max)?.text ?? '';
}

export default function Result({ score, onRestart }) {
  const total = sentences.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="screen result-screen">
      <DotPattern position="top-left" />

      <div className="result-content">
        <p className="score-label">Sua pontuação</p>

        <div className="score-display">
          <span className="score-number">{score}</span>
          <span className="score-de">de</span>
          <span className="score-total">{total}</span>
        </div>

        <div className="score-bar-wrapper">
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="score-percentage">{percentage}%</span>
        </div>

        <p className="score-message">{getMessage(score)}</p>
      </div>

      <button className="btn btn-primary btn-lg" onClick={onRestart}>
        Voltar ao Início
      </button>

      <DotPattern position="bottom-right" />
    </div>
  );
}
