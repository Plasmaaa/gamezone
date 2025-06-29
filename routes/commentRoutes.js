const express = require('express');
const router = express.Router();
const { addComment, getCommentsByGame, deleteComment } = require('../controllers/commentController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, addComment);
router.get('/:id', getCommentsByGame);
router.delete('/:id', verifyToken, deleteComment); // 👈 NEW

module.exports = router;
