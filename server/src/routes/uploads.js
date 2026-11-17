const path = require('path');
const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const { asyncHandler } = require('../utils');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED_MIME = new Set([
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'video/mp4', 'video/webm',
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, crypto.randomUUID() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('Unsupported file type — only JPG, PNG, GIF, WEBP images or MP4/WEBM video are allowed'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post('/', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
}));

// Surfaces multer errors (e.g. file too large, bad type) as JSON instead of an HTML crash page.
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(400).json({ error: err.message || 'Upload failed' });
});

module.exports = router;
module.exports.UPLOAD_DIR = UPLOAD_DIR;
