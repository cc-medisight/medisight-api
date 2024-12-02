const express = require('express');
const router = express.Router();
const { getObat, getObatById, addObat } = require('../controllers/obatController');

// Mendapatkan semua obat
router.get('/', getObat);

// Mendapatkan obat berdasarkan id
router.get('/:id', getObatById);

// Menambahkan obat baru
router.post('/', addObat);

module.exports = router;
