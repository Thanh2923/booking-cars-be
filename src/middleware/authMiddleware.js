const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Chỉ lấy token từ Authorization header

  if (!token) {
    return res.status(401).json({ message: "Bạn chưa xác thực. Vui lòng đăng nhập lại." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Xác thực token với secret key
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại." });
  }
};

module.exports = authMiddleware;
