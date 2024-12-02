const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    db.query(
        "SELECT id, fullname, phoneNumber, dateOfBirth, address FROM users",
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json(results);
        }
    );
});

// Create user
router.post('/', (req, res) => {
    const { fullname, phoneNumber, dateOfBirth, address } = req.body;

    if (!fullname || !phoneNumber || !dateOfBirth || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.query(
        "INSERT INTO users (fullname, phoneNumber, dateOfBirth, address) VALUES (?, ?, ?, ?)",
        [fullname, phoneNumber, dateOfBirth, address],
        (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(201).json({ message: 'User created successfully' });
        }
    );
});

// Update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fullname, phoneNumber, dateOfBirth, address } = req.body;

    db.query(
        "UPDATE users SET fullname = ?, phoneNumber = ?, dateOfBirth = ?, address = ? WHERE id = ?",
        [fullname, phoneNumber, dateOfBirth, address, id],
        (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json({ message: 'User updated successfully' });
        }
    );
});

// Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
