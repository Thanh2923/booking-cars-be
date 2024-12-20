const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const Middleware = require("../controllers/middleware");

// Routes CRUD cho Booking

router.post("/",
  Middleware.verifyToken,
  Middleware.verifyOnlyUserBooking,
  bookingController.createBooking
); // Tạo booking
router.get("/", Middleware.verifyToken, bookingController.getAllBookings); // Lấy tất cả bookings
router.get("/:id", Middleware.verifyToken, bookingController.getBookingById); // Lấy booking theo ID
router.patch("/:id", Middleware.verifyToken, bookingController.updateBooking); // Cập nhật booking
router.delete("/:id", bookingController.deleteBooking); // Xóa booking



module.exports = router;
