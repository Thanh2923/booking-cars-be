const authService = require("../services/authService");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwtHelper");
// Đăng ký
const register = async (req, res) => {
  try {
    const users = await authService.register(req.body);
    res.status(201).json({ message: "Đăng ký thành công", users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const users = await authService.addUser(req.body);
    res.status(201).json({ message: "Đăng ký thành công", users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
 
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại không
    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Tài khoản không tồn tại. Vui lòng kiểm tra lại."
      });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Mật khẩu không đúng. Vui lòng kiểm tra lại."
      });
    }

    // Lấy thông tin vai trò người dùng
    const role = await authService.getRoleByRoleId(user.role_id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy vai trò người dùng."
      });
    }

    // Tạo token (JWT)
    const token = generateToken(
      user._id,
      user.fullName,
      user.email,
      user.phone,
      role.roleName
    );

    
    // Trả về kết quả thành công
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        roleName: role.roleName
      },
      token
    });
  } catch (error) {
    console.error("Lỗi trong controller login:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống. Vui lòng thử lại sau."
    });
  }
};

const getAllUser = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const users = await authService.getAllUser(Number(page), Number(limit));
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserById(id);
    res.status(200).json({ success: true, data:[user] });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await authService.updateUser(id, req.body.formData);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await authService.deleteUser(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser
};
