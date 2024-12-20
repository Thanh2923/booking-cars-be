const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const Middleware = require("../controllers/middleware");
const revenue = require("../controllers/revenueController");
// Routes CRUD cho Payment
router.get("/totalRevenue", revenue.calculatorTotalRevenue);
router.get("/totalRevenue/:id", revenue.getTotalRevenueByUser);
router.post(
  "/",
  Middleware.verifyToken,
  Middleware.verifyOnlyUserBooking,
  paymentController.createPayment
); // Tạo thanh toán mới
router.get("/", paymentController.getAllPayments); // Lấy tất cả thanh toán
router.get("/:id", paymentController.getPaymentById); // Lấy thanh toán theo ID
router.put("/:id", paymentController.updatePayment); // Cập nhật thanh toán
router.delete("/:id", paymentController.deletePayment); // Xóa thanh toán
module.exports = router;
