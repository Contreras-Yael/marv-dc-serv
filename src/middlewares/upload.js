const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads/images");
        cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null,'Image-' + Date.now() + "-"+ file.originalname); // Unique filename
  }
});
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
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: fileFilter
});

module.exports = upload;
