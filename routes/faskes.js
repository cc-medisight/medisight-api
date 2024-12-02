const express = require('express');
const router = express.Router();
const faskesController = require('../controllers/faskesController');

// GET: Mengambil semua data faskes
router.get('/', faskesController.getFaskes);

// GET: Mengambil data faskes berdasarkan ID
router.get('/:id', faskesController.getFaskesById);

// POST: Menambahkan data faskes
router.post('/', faskesController.addFaskes);

module.exports = router;
