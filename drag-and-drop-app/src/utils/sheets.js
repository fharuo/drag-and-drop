const SHEETS_URL = import.meta.env.VITE_SHEETS_URL;

export async function saveToSheets({ nome, email, score, respostas }) {
  if (!SHEETS_URL) return;

  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ nome, email, score, respostas }),
    });
  } catch {
    // silently fail — game must not break if saving fails
  }
}
