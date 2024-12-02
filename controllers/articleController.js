const db = require('../db');

// Fungsi untuk get semua artikel
const getArticles = (req, res) => {
    const query = 'SELECT * FROM articles';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve articles' });
        }
        res.status(200).json({ articles: results });
    });
};

// Fungsi untuk menambahkan artikel baru
const addArticle = (req, res) => {
    const { title, content, author, editor, source, published_date } = req.body;

    // Menyusun query untuk menambahkan artikel
    const query = 'INSERT INTO articles (title, content, author, editor, source, published_date) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [title, content, author, editor, source, published_date], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to add article' });
        }
        res.status(201).json({ message: 'Article added successfully', articleId: result.insertId });
    });
};

// Fungsi untuk mengambil artikel berdasarkan ID
const getArticleById = (req, res) => {
    const articleId = req.params.id;
    const query = 'SELECT * FROM articles WHERE id = ?';

    db.query(query, [articleId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve article' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({ article: result[0] });
    });
};

// Fungsi untuk memperbarui artikel
const updateArticle = (req, res) => {
    const articleId = req.params.id;
    const { title, content, author, editor, source, published_date } = req.body;

    const query = 'UPDATE articles SET title = ?, content = ?, author = ?, editor = ?, source = ?, published_date = ? WHERE id = ?';

    db.query(query, [title, content, author, editor, source, published_date, articleId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update article' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({ message: 'Article updated successfully' });
    });
};

// Fungsi untuk menghapus artikel
const deleteArticle = (req, res) => {
    const articleId = req.params.id;
    const query = 'DELETE FROM articles WHERE id = ?';

    db.query(query, [articleId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete article' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    });
};

module.exports = {
    getArticles,
    addArticle,
    getArticleById,
    updateArticle,
    deleteArticle
};
