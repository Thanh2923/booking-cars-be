const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcrypt');
// Đăng ký
const register = async (userData) => {
  const { fullName, password, phone, email } = userData;

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) throw new Error("Số điện thoại đã được sử dụng.");

  const existingEmail = await User.findOne({ email });

  if (existingEmail) throw new Error("Email đã được sử dụng.");
  const roleName = "user";
  const role = await Role.findOne({ roleName: roleName });
  const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng bcrypt để mã hóa mật khẩu với 10 vòng salt

  // Tạo người dùng mới với mật khẩu đã mã hóa
  const newUser = new User({
    fullName,
    password: hashedPassword, // Lưu mật khẩu đã mã hóa
    phone,
    email,
    role_id: role._id
    // Lưu người dùng mới vào cơ sở dữ liệu
  });
  return await newUser.save();
};
 

const getUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const getRoleByRoleId =  async (role_id) => {
  return await Role.findById({ _id :role_id })
}
 
const getAllUser = async (page = 1, limit = 5) => {
  // Tính toán số lượng mục cần bỏ qua
  const skip = (page - 1) * limit;

  // Lấy danh sách users với phân trang và populate roleName từ Role
  const users = await User.find()
    .skip(skip) // Bỏ qua các mục trước trang hiện tại
    .limit(limit)
    .populate('role_id', 'roleName');
     // Giới hạn số lượng mục trả về mỗi trang

  // Lấy tổng số lượng các user để tính tổng số trang
  const totalUsers = await User.countDocuments();

  // Tính tổng số trang
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    data: users,
    totalUsers,
    totalPages,
    currentPage: page
  };
};

// Lấy thông tin user theo ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUser = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true, // Trả về user sau khi cập nhật
    runValidators: true // Kiểm tra validation
  });
  if (!updatedUser) {
    throw new Error("User not found or update failed");
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error("User not found or delete failed");
  }
  return deletedUser;
};

// Hàm thêm người dùng (admin)
const addUser = async (userData) => {
  const { fullName, password, phone, email,role_id } = userData;

  // Kiểm tra xem số điện thoại đã tồn tại chưa
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) throw new Error("Số điện thoại đã được sử dụng.");

  // Kiểm tra xem email đã tồn tại chưa
  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("Email đã được sử dụng.");

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu với bcrypt

  // Tạo người dùng mới với thông tin đã mã hóa mật khẩu
  const newUser = new User({
    fullName,
    password: hashedPassword, // Lưu mật khẩu đã mã hóa
    phone,
    email,
    role_id
  });

  
  // Lưu người dùng mới vào cơ sở dữ liệu
  return await newUser.save();
};


const getRoleByName = async (roleName) => {
  const roleId = await Role.findOne({ roleName: roleName });
  return roleId
} 
const updateUserRole = async (userId, roleId) => {
  return await User.findByIdAndUpdate(userId, { role_id: roleId }, { new: true });
};

module.exports = {
  register,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
  getRoleByRoleId,
  getUserByEmail,getRoleByName,updateUserRole
};
