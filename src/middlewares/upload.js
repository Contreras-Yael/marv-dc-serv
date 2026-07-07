
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/images'); 
  },
  filename: (req, file, cb) => {
    cb(null,'Image-' + Date.now() + "-"+ file.originalname); // Unique filename
  }
});

// Configure file filter function to allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('formatos invalidos, solo puedes con ( jpeg, jpg, png, gif)'));
  }
};

// Initialize Multer with storage, file size limit, and file filter options
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: fileFilter
});

module.exports = upload;
// // Single file upload route
// app.post('/upload-single', upload.single('profilePic'), (req, res) => {
//   try {
//     res.send('Single file uploaded successfully');
//   } catch (err) {
//     res.status(400).send({ error: err.message });
//   }
// });

// // Multiple files upload route
// app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
//   try {
//     res.send('Multiple files uploaded successfully');
//   } catch (err) {
//     res.status(400).send({ error: err.message });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(400).send({ error: err.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
