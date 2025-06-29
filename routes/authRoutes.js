const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route POST /auth/register → Inscription d’un nouvel utilisateur
router.post('/register', register);

// Route POST /auth/login → Connexion d’un utilisateur existant
router.post('/login', login);

module.exports = router;
