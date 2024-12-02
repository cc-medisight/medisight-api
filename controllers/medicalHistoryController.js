const mysql = require('mysql2');
const db = require('../db');

// Fungsi untuk mengambil semua data medical history
const getMedicalHistory = (req, res) => {
  const query = 'SELECT * FROM medical_history'; // Mengambil semua data dari tabel medical_history

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json(results); // Mengirimkan data medical history dalam format JSON
  });
};

// Fungsi untuk mengambil data medical history berdasarkan id
const getMedicalHistoryById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM medical_history WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Medical history not found' });
    }

    res.json(results[0]); // Mengirimkan data medical history dengan id tertentu
  });
};

// Fungsi untuk menambahkan data medical history ke database
const addMedicalHistory = (req, res) => {
  const { user_id, kondisi, image_url, presentase, deskripsi, treatment } = req.body;

  const query = 'INSERT INTO medical_history (user_id, kondisi, image_url, presentase, deskripsi, treatment) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [user_id, kondisi, image_url, presentase, deskripsi, treatment], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json({ message: 'Medical history added successfully', id: result.insertId });
  });
};

// Fungsi untuk memperbarui data medical history berdasarkan id
const updateMedicalHistory = (req, res) => {
  const { id } = req.params;
  const { user_id, kondisi, image_url, presentase, deskripsi, treatment } = req.body;

  const query = 'UPDATE medical_history SET user_id = ?, kondisi = ?, image_url = ?, presentase = ?, deskripsi = ?, treatment = ? WHERE id = ?';

  db.query(query, [user_id, kondisi, image_url, presentase, deskripsi, treatment, id], (err) => {
    if (err) {
      console.error('Error updating data in database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Medical history updated successfully' });
  });
};

// Fungsi untuk menghapus data medical history berdasarkan id
const deleteMedicalHistory = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM medical_history WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting data from database:', err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Medical history deleted successfully' });
  });
};

module.exports = { getMedicalHistory, getMedicalHistoryById, addMedicalHistory, updateMedicalHistory, deleteMedicalHistory };
