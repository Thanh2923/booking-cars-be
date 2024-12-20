const express = require("express");
const router = express.Router();

const roleRoutes = require("./roleRoutes");
const carRoutes = require("./carRoutes");
const bookingRoutes = require("./bookingRoutes");
const paymentRoutes = require("./paymentRoutes");
const eventRoutes = require("./eventRoutes");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");
const carOwnerRouter = require("./carOwnerRequestRoutes");
const ownerRouter = require("./ownerRouter");
const bookingController = require("../controllers/bookingController");

// Định nghĩa các route

router.use("/role", roleRoutes);
router.use("/car", carRoutes);
router.use("/auth", authRoutes);
router.use("/booking", bookingRoutes);
router.use("/bookingRoleAdmin", bookingController.getAllBookingsRoleAdmin);
router.use("/payment", paymentRoutes);
router.use("/event", eventRoutes);
router.use("/category", categoryRoutes);
router.use("/carOwnerRequest", carOwnerRouter);
router.use("/owner", ownerRouter);

module.exports = router;
