// Import Multer và cấu hình
const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu ảnh vào thư mục uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');  // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);  // Đặt tên file là timestamp
  },
});

// Kiểm tra định dạng file là hình ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Chỉ chấp nhận file hình ảnh'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;