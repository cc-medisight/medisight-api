const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route untuk mendapatkan semua artikel
router.get('/', articleController.getArticles);

// Route untuk menambahkan artikel baru
router.post('/', articleController.addArticle);

// Route untuk mendapatkan artikel berdasarkan ID
router.get('/:id', articleController.getArticleById);

// Route untuk memperbarui artikel berdasarkan ID
router.put('/:id', articleController.updateArticle);

// Route untuk menghapus artikel berdasarkan ID
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
