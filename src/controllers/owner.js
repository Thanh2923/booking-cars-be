const carService = require("../services/carService");
// const mongoose = require("mongoose");
const bookingService = require("../services/bookingService");


const getListBooking = async (req, res) => {
  try {
    //get userid
    // user see list car
    const userId = req.user.userId;
    const getOwnerId = await carService.getOwnerId(userId);
    const ownerId = getOwnerId._id;
    const cars = await carService.getAllCars(ownerId);
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No car found" });
    }

    // Lấy danh sách `car_id`
    const carIds = cars.data.map((car) => car._id);
    // Tìm bookings
    const bookings = await bookingService.getBookings(carIds);
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for your cars" });
    }

    return res.status(200).json({ bookings: bookings });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const { status } = req.body;
    // check if booking exists
    const checkBookingExist = await bookingService.checkBookingExist(bookingId);
    if (!checkBookingExist) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // update status booking
    const updateStatus = await bookingService.updateStatusBooking(
      bookingId,
      status
    );
    if (!updateStatus) {
      return res.status(500).json({ message: "Failed to update status" });
    }
    res.status(200).json({ message: updateStatus });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getListBooking, updateBooking };
