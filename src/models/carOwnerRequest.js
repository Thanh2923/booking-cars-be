const mongoose = require("mongoose");


const carOwnerRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
    nameOwnerCar: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },
    phoneNumber: {
      type: String,
      min: 10,
      required: true
    },
    car_type: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    license: {
    type: String,
    required: true
  },
    
  
},
  { timestamps: true }
);

const CarOwnerRequest = mongoose.model(
  "CarOwnerRequest",
  carOwnerRequestSchema
);
module.exports = CarOwnerRequest;
