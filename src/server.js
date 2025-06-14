const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Static folder for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Upload server running at http://localhost:3000');
});
