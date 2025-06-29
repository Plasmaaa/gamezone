const API = 'http://localhost:3000';

export async function fetchGames() {
  const res = await fetch(`${API}/games`);
  return await res.json();
}

export async function fetchComments(gameId) {
  const res = await fetch(`${API}/comments/${gameId}`);
  return await res.json();
}

export async function postComment(gameId, content) {
  return await fetch(`${API}/comments`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id: gameId, content })
  });
}
