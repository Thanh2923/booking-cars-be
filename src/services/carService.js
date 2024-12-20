const Car = require("../models/car"); // Đường dẫn tới file model Car
const CarOwnerRequest = require("../models/carOwnerRequest");
const Category = require("../models/category");
const createCar = async (data) => {
  const car = new Car(data);
  return await car.save();
};

const getAllCars = async (ownerId, page, limit) => {
  try {
    const query = { owner_id: ownerId };

    let carsQuery = Car.find(query);

    if (page && limit) {
      const skip = (page - 1) * limit;
      carsQuery = carsQuery.skip(skip).limit(limit);
    }

    // Populate category name from category_id
    carsQuery = carsQuery.populate({
      path: 'category_id',
      select: 'category_name' // Fetch category_name from Category
    });

    // Get the total number of cars for pagination
    const totalCars = await Car.countDocuments(query);

    // Get the cars data
    const cars = await carsQuery;

    // Calculate the total pages based on total cars and limit
    const totalPages = Math.ceil(totalCars / limit);

    // Return the result with pagination details
    return {
      data: cars,
      totalCars,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error; // Rethrow error to be handled by the caller
  }
};


const getCarById = async (id) => {
  return await Car.findById(id);
};

const updateCar = async (id, data) => {
  return await Car.findByIdAndUpdate(id, data, { new: true });
};

const deleteCar = async (id) => {
  return await Car.findByIdAndDelete(id);
};

const getOwnerId = async (userId) => {
  return await CarOwnerRequest.findOne({ user_id: userId });
};
const getIdCategory = async (chooseCategory) => {
  return await Category.findOne({ category_name: chooseCategory });
};

const getAll = async (page = 1, limit = 10) => {
  try {
    // Tạo query tìm tất cả các xe
    let carsQuery = Car.find();

    // Nếu có phân trang (page và limit), áp dụng skip và limit
    if (page && limit) {
      const skip = (page - 1) * limit;
      carsQuery = carsQuery.skip(skip).limit(limit);
    }

    // Lấy tổng số xe để tính số trang
    const totalCars = await Car.countDocuments();

    carsQuery = carsQuery.populate({
      path: 'category_id',
      select: 'category_name' // Fetch category_name from Category
    });


    // Lấy dữ liệu xe
    const cars = await carsQuery;

    // Tính số trang
    const totalPages = Math.ceil(totalCars / limit);

    // Trả về dữ liệu xe và các thông tin phân trang
    return {
      data: cars,
      totalCars,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error; // Rethrow error to be handled by the caller
  }
};


module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getOwnerId,
  getIdCategory,
  getAll
};
