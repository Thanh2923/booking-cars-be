const paymentService = require("../services/paymentService");
const bookingService = require("../services/bookingService");
// Tạo thanh toán mới

const createPayment = async (req, res) => {
  try {
     
    const {bookingId}  = req.body;
    // Here ! check valid booking id exist
    const booking = await paymentService.booking(bookingId);
    console.log(booking.total_price);
    const transaction = await paymentService.createTransaction(
      booking._id,
      booking.total_price
    );
    console.log(transaction);
    if (!transaction) {
      return res.status(400).json({ message: "Failed to create transaction!" });
    }
    // Kiểm tra trạng thái giao dịch
    if (transaction.return_code === 1) {
      // 1: Success
      // Lưu thông tin thanh toán vào bảng Payment
      const dataPayment = {
        booking_id: bookingId,
        payment_date: new Date(),
        payment_status: "Completed",
        payment_method: "ZaloPay",
        payment_amount: booking.total_price
      };
      const newPayment = await paymentService.createPayment(dataPayment);

      // update status booking
      const updateBooking = await bookingService.updateStatusBooking(
        bookingId,
        "completed"
      );
      if (!updateBooking) {
        return res
          .status(400)
          .json({ message: "Failed to update booking status!" });
      }
      return res.status(201).json({
        message: "Payment successful!",
        transaction: transaction,
        payment: newPayment
      });
    } else {
      return res.status(400).json({
        message: "Payment failed!",
        transaction: transaction
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả thanh toán
const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy thanh toán theo ID
const getPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentService.getPaymentById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thanh toán
const updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPayment = await paymentService.updatePayment(id, data);
    if (!updatedPayment)
      return res.status(404).json({ message: "Payment not found" });
    return res.status(200).json(updatedPayment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa thanh toán
const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPayment = await paymentService.deletePayment(id);
    if (!deletedPayment)
      return res.status(404).json({ message: "Payment not found" });
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};
