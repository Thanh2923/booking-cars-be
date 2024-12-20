const mongoose = require("mongoose");

// Định nghĩa schema cho Bookings
const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model User
      required: true
    },
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // Tham chiếu đến model Car
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    driver_option: {
      type: Boolean,
      default: false // Mặc định là không thuê tài xế
    },
    total_price: {
      type: Number,
      required: true,
      min: 0 // Giá tổng phải không âm
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected" , "cancelled" , 'completed'], // Tình trạng đặt xe
      default: "pending"
    }
  },
  { timestamps: true }
); // Tự động thêm createdAt và updatedAt

// Tạo model từ schema
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
