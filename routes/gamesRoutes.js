const express = require('express');
const router = express.Router();
const { getAllGames, getGameById, addGame } = require('../controllers/gamesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', verifyToken, addGame); // 🔒 protégé

module.exports = router;
