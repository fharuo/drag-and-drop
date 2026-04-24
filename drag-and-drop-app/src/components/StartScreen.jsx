import companyLogo from '../assets/company-logo.svg';
import DotPattern from './DotPattern';

export default function StartScreen({ onStart }) {
  return (
    <div className="screen start-screen">
      <DotPattern position="top-left" />

      <img src={companyLogo} alt="Logo da Empresa" className="brand-logo" />

      <h1>Bem-vindos!</h1>

      <p className="start-description">
        Neste jogo você irá arrastar a palavra correta para completar frases
        sobre os valores que nos guiam como organização.
      </p>

      <div className="start-info">
        <div className="info-item">
          <span className="info-icon">📋</span>
          <span>5 frases para completar</span>
        </div>
        <div className="info-item">
          <span className="info-icon">✋</span>
          <span>Arraste a palavra certa para o espaço em branco</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🏆</span>
          <span>Veja sua pontuação ao final</span>
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={onStart}>
        Iniciar
      </button>

      <DotPattern position="bottom-right" />
    </div>
  );
}
