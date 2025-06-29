const db = require('../db/database');

db.run('DELETE FROM comments', (err) => {
  if (err) return console.error("Erreur suppression :", err);
  console.log("✅ Tous les commentaires ont été supprimés");
});
