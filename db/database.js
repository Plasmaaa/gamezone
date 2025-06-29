const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crée ou ouvre le fichier gamezone.db
const db = new sqlite3.Database(path.resolve(__dirname, 'gamezone.db'), (err) => {
  if (err) {
    console.error('Erreur de connexion à la base :', err.message);
  } else {
    console.log('✅ Connecté à la base de données SQLite');
  }
});

module.exports = db;
