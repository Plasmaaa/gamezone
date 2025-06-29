import { fetchGames, fetchComments, postComment } from './api.js';
import { createGameCard } from './components/gameCard.js';
import { renderComments } from './components/commentSection.js';

document.addEventListener('DOMContentLoaded', async () => {
const container = document.getElementById('games');
const games = await fetchGames();

for (const game of games) {
const comments = await fetchComments(game.id);
const commentsHTML = renderComments(comments);
const card = createGameCard(game, commentsHTML);
container.appendChild(card);
}
}