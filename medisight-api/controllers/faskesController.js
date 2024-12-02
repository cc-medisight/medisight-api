const mysql = require('mysql2');
const db = require('../db');

// Mengambil data faskes dari database
const getFaskes = (req, res) => {
    const query = 'SELECT id, nama_faskes, foto_url, link_maps FROM faskes';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err.stack);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Mengirimkan data faskes dalam format JSON
        const faskesData = results.map(faskes => ({
            id: faskes.id,
            nama_faskes: faskes.nama_faskes,
            foto_url: faskes.foto_url,
            link_maps: faskes.link_maps
        }));

        res.json(faskesData);
    });
};

// Mengambil data faskes berdasarkan id
const getFaskesById = (req, res) => {
    const { id } = req.params; // Mengambil id dari parameter URL

    const query = 'SELECT id, nama_faskes, foto_url, link_maps FROM faskes WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err.stack);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Faskes not found' });
        }

        // Mengirimkan data faskes dalam format JSON
        const faskesData = {
            id: results[0].id,
            nama_faskes: results[0].nama_faskes,
            foto_url: results[0].foto_url,
            link_maps: results[0].link_maps
        };

        res.json(faskesData);
    });
};

// Menambahkan data faskes ke database
const addFaskes = (req, res) => {
    const { nama_faskes, foto_url, link_maps } = req.body;
    const query = 'INSERT INTO faskes (nama_faskes, foto_url, link_maps) VALUES (?, ?, ?)';
    db.query(query, [nama_faskes, foto_url, link_maps], (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err.stack);
            return res.status(500).json({ message: 'Failed to insert data' });
        }

        res.status(201).json({ message: 'Faskes added successfully', id: results.insertId });
    });
};

module.exports = { getFaskes, getFaskesById, addFaskes };
