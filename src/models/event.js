const mongoose = require('mongoose');

// Định nghĩa schema cho Events
const eventSchema = new mongoose.Schema({
    image:{
        type: String, 
        required: true, 
    },
    event_name: { 
        type: String, 
        required: true, 
        trim: true // Loại bỏ khoảng trắng đầu và cuối
    },
    event_date: { 
        type: Date, 
        required: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo model từ schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
