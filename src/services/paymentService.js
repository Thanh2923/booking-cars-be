const Payment = require("../models/payment"); // Đường dẫn tới file model Payment
const Booking = require("../models/booking");
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const createPayment = async (data) => {
  const payment = new Payment(data);
  return await payment.save();
};

const getAllPayments = async () => {
  return await Payment.find();
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};

const updatePayment = async (id, data) => {
  return await Payment.findByIdAndUpdate(id, data, { new: true });
};
 
const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};
const booking = async (bookingId) => {
  return await Booking.findOne({ _id: bookingId });
};
const createTransaction = async (bookingId, totalAmount) => {
  try {
    const config = {
      app_id: "2554",
      key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
      key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    const embed_data = { bookingId: bookingId };

    const items = [
      {
        item_name: "Car Booking", // Example item name
        item_quantity: 1,
        item_price: totalAmount
      }
    ];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalAmount,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: "zalopayapp"
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const response = await axios.post(config.endpoint, null, { params: order });
    return response.data;
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  booking,
  createTransaction
};
