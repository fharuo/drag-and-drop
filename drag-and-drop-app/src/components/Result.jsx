import questions from '../data/sentences';

const RESULTS = [
  {
    score: 0,
    titleFirst: true,
    title: 'Poxa... vamos tentar de novo?',
    body: 'Essa foi só a primeira tentativa! Que tal jogar novamente e descobrir mais sobre como nossos pilares aparecem no dia a dia?',
  },
  {
    score: 1,
    titleFirst: true,
    title: 'Cada passo conta!',
    body: 'Continue explorando e entendendo como suas atitudes podem gerar impacto no futuro do trabalho.',
  },
  {
    score: 2,
    titleFirst: true,
    title: 'Você já deu os primeiros passos!',
    body: 'Que tal tentar de novo e aprofundar sua conexão com os nossos pilares?',
  },
  {
    score: 3,
    titleFirst: true,
    title: 'Já dá para ver que você está no caminho!',
    body: 'Continue jogando e fortalecendo seu olhar sobre o impacto das suas ações.',
  },
  {
    score: 4,
    titleFirst: false,
    title: 'Bora avançar ainda mais?',
    body: 'Você já demonstra uma boa conexão com nossos pilares.',
  },
  {
    score: 5,
    titleFirst: false,
    title: 'Continue assim e vá ainda mais longe!',
    body: 'Você já vive muitos dos nossos pilares na prática.',
  },
  {
    score: 6,
    titleFirst: false,
    title: 'Falta pouco para chegar no topo!',
    body: 'Muito bem! Você está claramente conectado com a nossa cultura.',
  },
  {
    score: 7,
    titleFirst: true,
    title: 'Quase perfeito!',
    body: 'Você está muito alinhado com nossos pilares. Bora tentar mais uma vez para alcançar o máximo?',
  },
  {
    score: 8,
    titleFirst: true,
    title: 'Incrível! Você é o verdadeiro Be the Change!',
    body: 'Você vive nossos pilares no dia a dia e representa o futuro do trabalho na prática. Parabéns!',
  },
];

export default function Result({ score, onRestart }) {
  const total = questions.length;
  const result = RESULTS.find((r) => r.score === score) ?? RESULTS[0];

  const titleEl = <p className="result-title">{result.title}</p>;
  const bodyEl  = <p className="result-body">{result.body}</p>;

  return (
    <div className="card-inner result-card">
      <div className="score-box">
        <p className="score-label">Você acertou</p>
        <div className="score-row">
          <span className="score-num">{score}</span>
          <span className="score-de">de</span>
          <span className="score-total">{total}</span>
        </div>
      </div>

      <div className="result-message">
        {result.titleFirst ? <>{titleEl}{bodyEl}</> : <>{bodyEl}{titleEl}</>}
      </div>

      <button className="btn-action" onClick={onRestart}>
        Tente novamente
      </button>
    </div>
  );
}
