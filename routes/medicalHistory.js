const express = require('express');
const router = express.Router();
const { getMedicalHistory, getMedicalHistoryById, addMedicalHistory, updateMedicalHistory, deleteMedicalHistory } = require('../controllers/medicalHistoryController');

// Mendapatkan semua data medical history
router.get('/', getMedicalHistory);

// Mendapatkan data medical history berdasarkan id
router.get('/:id', getMedicalHistoryById);

// Menambahkan data medical history baru
router.post('/', addMedicalHistory);

// Memperbarui data medical history berdasarkan id
router.put('/:id', updateMedicalHistory);

// Menghapus data medical history berdasarkan id
router.delete('/:id', deleteMedicalHistory);

module.exports = router;
