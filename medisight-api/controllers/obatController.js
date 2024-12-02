const mysql = require('mysql2');
const db = require('../db');

// Fungsi untuk mengambil semua data obat dari database
const getObat = (req, res) => {
  const query = 'SELECT * FROM obat';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Mengirimkan data obat dalam format JSON
    res.json(results);
  });
};

// Fungsi untuk mengambil data obat berdasarkan id
const getObatById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM obat WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Mengecek apakah obat ditemukan
    if (results.length === 0) {
      return res.status(404).json({ message: 'Obat not found' });
    }

    // Mengirimkan data obat berdasarkan id
    res.json(results[0]);
  });
};

// Fungsi untuk menambahkan data obat ke database
const addObat = (req, res) => {
  const { nama, deskripsi, harga } = req.body;

  const query = 'INSERT INTO obat (nama, deskripsi, harga) VALUES (?, ?, ?)';

  db.query(query, [nama, deskripsi, harga], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json({ message: 'Obat added successfully', id: result.insertId });
  });
};

module.exports = { getObat, getObatById, addObat };
