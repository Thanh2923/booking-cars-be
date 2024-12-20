const mongoose = require('mongoose');

// Định nghĩa schema cho Payment
const paymentSchema = new mongoose.Schema({
    booking_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking', // Tham chiếu đến model Booking
        required: true 
    },
    payment_date: { 
        type: Date, 
        required: true, 
        default: Date.now // Mặc định là thời gian hiện tại
    },
    payment_status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], // Các trạng thái hợp lệ
        required: true 
    },
    payment_method: { 
        type: String, 
        enum: ['Credit Card','ZaloPay','PayPal', 'Bank Transfer', 'Cash'], // Các phương thức thanh toán hợp lệ
        required: true 
    }, 
    currency: {
        type: String,
        default: 'VND',
        required: true,
    },
    payment_amount: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo model từ schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
