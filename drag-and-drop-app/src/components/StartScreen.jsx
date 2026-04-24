import { useState } from 'react';

export default function StartScreen({ onStart }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;
    onStart({ nome, email });
  }

  return (
    <div className="card-inner start-card">
      <p className="start-text">
        Você já parou para pensar como suas atitudes impactam o ambiente de trabalho?
      </p>
      <p className="start-text">
        Neste jogo rápido, você vai responder a algumas situações do dia a dia e descobrir qual pilar da nossa cultura está mais presente na sua forma de agir.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="given-name"
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button className="btn-action" type="submit" disabled={!nome.trim() || !email.trim()}>
          Começar
        </button>
      </form>
    </div>
  );
}
