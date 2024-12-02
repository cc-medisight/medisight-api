const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user');
const articlesRouter = require('./routes/articles');
const faskesRoutes = require('./routes/faskes');
const obatRouter = require('./routes/obat');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const lukaRoutes = require('./routes/luka');

// Middleware untuk parsing JSON body
app.use(express.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: '34.50.90.157',
  user: 'root',
  password: 'Medisight123#',
  database: 'medisight'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Endpoint POST /register (untuk registrasi pengguna)
app.post('/register', (req, res) => {
  const { email, password, confirmPassword, fullname, phoneNumber, dateOfBirth, address } = req.body;

  // Validasi jika password dan confirmPassword tidak sama
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Enkripsi password sebelum menyimpan ke database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error encrypting password' });
    }

    // Query untuk memasukkan data ke tabel 'auth'
    const query = 'INSERT INTO auth (email, password) VALUES (?, ?)';

    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user into auth table:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }

      // Mengambil auth_id yang baru dimasukkan
      const authId = result.insertId;

      // Masukkan data pengguna ke tabel 'users'
      const userQuery = 'INSERT INTO users (auth_id, fullname, phoneNumber, dateOfBirth, address) VALUES (?, ?, ?, ?, ?)';

      db.query(userQuery, [authId, fullname, phoneNumber, dateOfBirth, address], (err, userResult) => {
        if (err) {
          console.error('Error inserting user details into users table:', err);
          return res.status(500).json({ message: 'Error saving user details' });
        }
        res.status(201).json({ message: 'User registered successfully', authId });
      });
    });
  });
});

// Endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query untuk mencari user berdasarkan email di tabel 'auth'
  const query = 'SELECT * FROM auth WHERE email = ?';

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Jika email tidak ditemukan
    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    // Verifikasi password menggunakan bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Jika password cocok, kembalikan informasi pengguna
      res.status(200).json({
        message: 'Login successful',
        authId: user.id,
        email: user.email
      });
    });
  });
});

// Menggunakan route
app.use('/api/user', userRoutes);
app.use('/articles', articlesRouter);
app.use('/api/faskes', faskesRoutes);
app.use('/api/obat', obatRouter);
app.use('/api/medicalhistory', medicalHistoryRoutes);
app.use('/api/luka', lukaRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});