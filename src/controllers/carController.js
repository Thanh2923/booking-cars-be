const carService = require("../services/carService");

// Tạo xe mới
const createCar = async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy userId từ token đã xác thực
    const { car_name, description, price_per_day, availability_status, category_id } = req.body;
    const getOwnerId = await carService.getOwnerId(userId);
    if (!getOwnerId) {
      return res.status(400).json({ message: "Owner not found!" });
    }
    const ownerId = getOwnerId._id;

    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    // Tạo dữ liệu xe mới
    const carData = {
      car_name,
      description,
      price_per_day,
      availability_status,
      category_id, // category_id đã gửi từ client
      owner_id: ownerId,
      image:imageUrls // Lưu danh sách đường dẫn ảnh
    };
    // Gọi service để lưu xe vào database
    const newCar = await carService.createCar(carData);
    if (!newCar) {
      return res.status(400).json({ message: "Failed to create car" });
    }

    return res.status(201).json({
      message: "Car created successfully!",
      car: newCar,
    });
  } catch (error) {
    console.error("Error in createCar:", error);
    return res.status(500).json({ error: error.message });
  }
};
 
  const getAllCars = async (req, res) => {
    try {
      const userId = req.user.userId;
      
      const getOwnerId = await carService.getOwnerId(userId);
      const ownerId = getOwnerId._id;
      const { page, limit } = req.query;
      const cars = await carService.getAllCars(ownerId,page, limit);
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

// Lấy thông tin xe theo ID
const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === null || id === undefined) {
      return res.status(400).json({ message: "ID is required" });
    }

    const car = await carService.getCarById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin xe
const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    
    if (id === null || id === undefined) {
      return res.status(400).json({ message: "ID is required" });
    }

    const existingCar = await carService.getCarById(id);
    if (!existingCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    const updatedImages = imageUrls.length > 0 ? imageUrls : existingCar.images;

    // Cập nhật dữ liệu
    const updatedData = {
      ...data,
      image: updatedImages,
    };

    const updatedCar = await carService.updateCar(id, updatedData);
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa xe
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCar = await carService.deleteCar(id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// lấy tất cả car của tất cả chử ve
const carAll = async (req, res) => {
  try {
    // Lấy giá trị page và limit từ query string hoặc sử dụng giá trị mặc định
    const { page = 1, limit = 10 } = req.query;

    // Gọi service lấy tất cả xe với phân trang
    const getAll = await carService.getAll(page, limit);

    // Trả về kết quả
    return res.status(200).json({
      message: "Get all car successfully",
      data: getAll.data, // Dữ liệu xe
      totalCars: getAll.totalCars, // Tổng số xe
      totalPages: getAll.totalPages, // Tổng số trang
      currentPage: getAll.currentPage, // Trang hiện tại
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  carAll
};
