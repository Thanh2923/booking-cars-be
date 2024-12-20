const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role_id : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Role',  // Liên kết với bảng Role
      required: true,
    },
    avatar: {
      type: String,  // Lưu trữ URL hoặc tên file của ảnh đại diện
      required: false,  // Trường này không bắt buộc
    },
  },
  {
    timestamps: true, // Thêm trường createdAt và updatedAt tự động
  }
);

// // Middleware mã hóa mật khẩu khi lưu mới
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // Middleware mã hóa mật khẩu khi cập nhật
// userSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate();
//   if (update.password) {
//     const salt = await bcrypt.genSalt(10);
//     update.password = await bcrypt.hash(update.password, salt);
//     this.setUpdate(update);
//   }
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;