const db = require('../db/database');
const jwt = require('jsonwebtoken');

// Inscription
const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d’utilisateur ou mot de passe manquant' });
  }

  const checkSql = `SELECT * FROM users WHERE username = ?`;
  db.get(checkSql, [username], (err, user) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });

    if (user) {
      return res.status(409).json({ message: 'Nom d’utilisateur déjà pris' });
    }

    const insertSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(insertSql, [username, password], function (err) {
      if (err) return res.status(500).json({ message: 'Erreur lors de la création du compte' });

      const token = jwt.sign(
        { id: this.lastID, username },
        process.env.JWT_SECRET || 'SECRET_KEY',
        { expiresIn: '24h' }
      );

      res.status(201).json({ token });
    });
  });
};

// Connexion
const login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.get(sql, [username, password], (err, user) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '24h' }
    );

    res.json({ token });
  });
};

module.exports = { register, login };
