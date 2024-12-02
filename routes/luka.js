const express = require('express');
const db = require('../db'); 
const router = express.Router();

// Get all luka
router.get('/', (req, res) => {
    db.query(
        "SELECT id, jenis_luka, langkah_penanganan, tips_tambahan FROM luka",
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json(results);
        }
    );
});

// Get specific luka by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT id, jenis_luka, langkah_penanganan, tips_tambahan FROM luka WHERE id = ?",
        [id],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length === 0) return res.status(404).json({ message: 'Luka not found' });
            res.status(200).json(results[0]);
        }
    );
});

// Create new luka
router.post('/', (req, res) => {
    const { jenis_luka, langkah_penanganan, tips_tambahan } = req.body;

    if (!jenis_luka || !langkah_penanganan || !tips_tambahan) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query(
        "INSERT INTO luka (jenis_luka, langkah_penanganan, tips_tambahan) VALUES (?, ?, ?)",
        [jenis_luka, langkah_penanganan, tips_tambahan],
        (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(201).json({ message: 'Luka created successfully' });
        }
    );
});

// Update luka by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { jenis_luka, langkah_penanganan, tips_tambahan } = req.body;

    db.query(
        "UPDATE luka SET jenis_luka = ?, langkah_penanganan = ?, tips_tambahan = ? WHERE id = ?",
        [jenis_luka, langkah_penanganan, tips_tambahan, id],
        (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json({ message: 'Luka updated successfully' });
        }
    );
});

// Delete luka by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM luka WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json({ message: 'Luka deleted successfully' });
    });
});

module.exports = router;
