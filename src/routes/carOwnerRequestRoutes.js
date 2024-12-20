const express = require("express");
const Middleware = require("../controllers/middleware");
const router = express.Router();
const carOwnerRequest = require("../controllers/carOwnerRequest");
router.post(
  "/submit",
  Middleware.verifyToken,
  carOwnerRequest.CartOwnerRequest
);
router.get(
  "/viewCarOwnerRequest",
  Middleware.verifyToken,
  Middleware.verifyTokenRole(["admin"]),
  carOwnerRequest.ViewCarOwnerRequest
);
router.patch('/updateCarOwner/:id' ,
 Middleware.verifyToken,
 Middleware.verifyTokenRole(["admin"]),
 carOwnerRequest.UpdateCarOwnerRequestStatus)

 
module.exports = router;
