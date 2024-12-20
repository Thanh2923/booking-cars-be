const express = require("express");
const router = express.Router();
const owner = require("../controllers/owner");
const Middleware = require("../controllers/middleware");

router.get(
  "/listBooking",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  owner.getListBooking
);
router.patch(
  "/updateBooking/:bookingId",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  owner.updateBooking
);
module.exports = router;
