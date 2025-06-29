const db = require('../db/database');

const addComment = (req, res) => {
  const { content, game_id } = req.body;
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: "Utilisateur non authentifié" });

  const sql = `INSERT INTO comments (content, user_id, game_id) VALUES (?, ?, ?)`;
  db.run(sql, [content, user_id, game_id], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    res.status(201).json({ message: 'Commentaire ajouté ✅', id: this.lastID });
  });
};

const getCommentsByGame = (req, res) => {
  const game_id = req.params.id;
  const sql = `
    SELECT comments.id, comments.content, comments.created_at, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.game_id = ?
    ORDER BY comments.created_at DESC
  `;

  db.all(sql, [game_id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    res.json(rows);
  });
};

const deleteComment = (req, res) => {
  const commentId = req.params.id;
  const user = req.user;

  db.get(`SELECT * FROM comments WHERE id = ?`, [commentId], (err, comment) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });

    if (user.id === comment.user_id || user.is_admin) {
      db.run(`DELETE FROM comments WHERE id = ?`, [commentId], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la suppression' });
        return res.json({ message: 'Commentaire supprimé' });
      });
    } else {
      return res.status(403).json({ message: 'Non autorisé' });
    }
  });
};

module.exports = {
  addComment,
  getCommentsByGame,
  deleteComment
};
