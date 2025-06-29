const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(express.json());

// Servir les fichiers HTML/CSS/JS depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const gamesRoutes = require('./routes/gamesRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/games', gamesRoutes);
app.use('/comments', commentRoutes);

// Page d'accueil (optionnel, redirige vers le HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 GameZone API en ligne sur http://localhost:${PORT}`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
