export function renderComments(comments) {
if (!comments || comments.length === 0) {
return '<p><i>Aucun commentaire pour ce jeu.</i></p>';
}

const list = comments
.map(c => <li><strong>${c.username} :</strong> ${c.content}</li>)
.join('');

return <ul>${list}</ul>;
}