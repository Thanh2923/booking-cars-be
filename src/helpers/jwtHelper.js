const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Đảm bảo đọc các giá trị trong file .env

// Hàm tạo JWT
const generateToken = (userId, fullName, email, phone, role_id) => {
  const payload = {
    userId,
    fullName,
    email,
    phone,
    role_id
  };

  // Lấy giá trị secret từ biến môi trường
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error('JWT secret key is missing!');
  }

  // Tạo token với payload và secret key (từ biến môi trường)
  const token = jwt.sign(payload, secretKey, { expiresIn: '2d' });

  return token;
};

module.exports = { generateToken };