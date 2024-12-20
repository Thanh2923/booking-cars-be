const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const Middleware = require("../controllers/middleware");
 
router.get("/getAllCars", carController.carAll);
 
const upload = require('../middleware/upload')
// Routes CRUD cho Carrouter
 
router.post(
  "/",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  upload.array('images', 5), // Cho phép tối đa 5 ảnh
  carController.createCar
);

router.get(
  "/",carController.carAll
);
 
router.get(
  "/getListCar",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  carController.getAllCars
); // Lấy danh sách xe
router.get("/getCarById/:id", carController.getCarById); // Lấy xe theo ID
router.patch("/:id", upload.array('images', 5), carController.updateCar); // Cập nhật xe
router.delete("/:id", carController.deleteCar); // Xóa xe

module.exports = router;
