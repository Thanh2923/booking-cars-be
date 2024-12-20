const mongoose = require('mongoose');

// Định nghĩa schema cho Cars
const carSchema = new mongoose.Schema({
    car_name: { 
        type: String, 
        required: true, 
        trim: true 
    },

    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', // Tham chiếu đến model Category
        required: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    price_per_day: { 
        type: Number, 
        required: true, 
        min: 0 // Giá phải lớn hơn hoặc bằng 0
    },
    availability_status: { 
        type: Boolean, 
        default: true // Mặc định xe khả dụng
    },
    image: { 
        type: Array, // URL hoặc đường dẫn hình ảnh
        trim: true 
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{ timestamps: true });

// Tạo model từ schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
