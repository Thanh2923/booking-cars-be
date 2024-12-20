const Booking = require("../models/booking"); // Đường dẫn tới file model Booking
const Car = require("../models/car");
const createBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

const getAllBookings = async (userBooking) => {
  return await Booking.find({ user_id: userBooking })
    .populate("user_id", "name email") // Tham chiếu thông tin User
    .populate("car_id", "car_name category_id image price_per_day"); // Tham chiếu thông tin Car
};

const getAllBookingsRoleAdmin = async () => {
    try {
      // Lấy tất cả các booking không cần userId
      const bookings = await Booking.find()
        .populate("user_id", "name email")  // Tham chiếu thông tin người dùng
        .populate("car_id", "car_name category_id image price_per_day");  // Tham chiếu thông tin xe
  
      if (!bookings || bookings.length === 0) {
        return { message: "No bookings found" };
      }
  
      return bookings;
    } catch (err) {
      throw new Error("Error fetching bookings: " + err.message);
    }
  };
  

const getBookingById = async (id, userId) => {
  return await Booking.findOne({ _id: id, user_id: userId })
    .populate("user_id", "name email")
    .populate("car_id", "car_name category_id");
};

const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

//
const checkCarId = async (carId) => {
  return await Car.findById({ _id: carId });
};

const getPriceCar = async (carId) => {
  try {
    const price_per_day = await Car.findOne({ _id: carId });
    return price_per_day;
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};
// check booking from Owner
const findBooking = async (car_id) => {
  const find = await Booking.find({ car_id: car_id });
  return find;
};

// getAllCar(userId)
const getAllCar = async (userId) => {
  const findAllCars = await Car.find({ owner_id: userId });
  return findAllCars;
};

const getBookings = async (carIds) => {
  return await Booking.find({ car_id: { $in: carIds } })
    .populate("user_id", "name email") // Tham chiếu thông tin User
    .populate("car_id", "car_name category_id image price_per_day"); // Tham chiếu thông tin Car
};

const checkBookingExist = async (bookingId) => {
  const checkBooking = await Booking.findById(bookingId);
  return checkBooking;
};

const updateStatusBooking = async (bookingId, status) => {
  const updateStatus = await Booking.findByIdAndUpdate(
    bookingId,
    { status: status },
    { new: true }
  );
  return updateStatus;
};
module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  checkCarId,
  getPriceCar,
  findBooking,
  getAllCar,
  getBookings,
  checkBookingExist,
  updateStatusBooking,
  getAllBookingsRoleAdmin
};
