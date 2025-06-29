const db = require('../db/database');

// Voir tous les jeux
const getAllGames = (req, res) => {
  db.all('SELECT * FROM games', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    res.json(rows);
  });
};

const getCommentsByGame = (req, res) => {
  const game_id = req.params.id;
  const sql = `
    SELECT comments.id, content, created_at, users.username
    FROM comments
    JOIN users ON users.id = comments.user_id
    WHERE game_id = ?
    ORDER BY created_at DESC
  `;

  db.all(sql, [game_id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    res.json(rows);
  });
};



// jeu par son ID
const getGameById = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM games WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });
    if (!row) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json(row);
  });
};

// Ajouter un nouveau jeu (admin seulement)
const addGame = (req, res) => {
  const { title, description, image_url, release_date } = req.body;
  const sql = `INSERT INTO games (title, description, image_url, release_date)
               VALUES (?, ?, ?, ?)`;
  db.run(sql, [title, description, image_url, release_date], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur en ajoutant le jeu' });
    res.status(201).json({ message: 'Jeu ajouté', id: this.lastID });
  });
};

const updateGame = (req, res) => {
  const id = req.params.id;
  const { title, description, image_url, release_date } = req.body;
  const sql = `UPDATE games SET title = ?, description = ?, image_url = ?, release_date = ?
               WHERE id = ?`;
  db.run(sql, [title, description, image_url, release_date, id], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur en mettant à jour le jeu' });
    if (this.changes === 0) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json({ message: 'Jeu mis à jour' });
  });
};

const deleteGame = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM games WHERE id = ?`;
  db.run(sql, [id], function (err) {  
    if (err) return res.status(500).json({ message: 'Erreur en supprimant le jeu' });
    if (this.changes === 0) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json({ message: 'Jeu supprimé' });
  });
} 


module.exports = { getAllGames, getGameById, addGame };
