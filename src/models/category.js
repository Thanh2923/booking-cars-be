const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true, // Đảm bảo tên danh mục là duy nhất
        trim: true    // Loại bỏ khoảng trắng đầu và cuối
    }
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
