const { ObjectId } = require('mongodb');
const payment = require('../models/payment')
const RevenueService = {
    totalRevenue : async ()=> {
        const result = await payment.aggregate([
            { $match: { payment_status: "Completed" } }, // Chỉ lấy các payment có trạng thái "Completed"
            { $group: { _id: null, totalAmount: { $sum: "$payment_amount" } } } // Tính tổng payment_amount
          ]);
          
          // Nếu không có kết quả, trả về 0
          console.log(result)
          return result.length > 0 ? result[0].totalAmount : 0;
    },

    totalRevenueByUser: async (id) => {
        const result = await payment.aggregate([
          // Kết nối bảng payments với bảng bookings qua booking_id
          {
            $lookup: {
              from: "bookings", // Tên collection của bảng bookings
              localField: "booking_id", // Trường booking_id trong bảng payments
              foreignField: "_id", // Trường _id trong bảng bookings
              as: "bookingDetails" // Kết quả của join sẽ được lưu vào mảng bookingDetails
            }
          },
          { $unwind: "$bookingDetails" }, // Mở mảng bookingDetails
          {
            $lookup: {
              from: "cars", // Tên collection của bảng cars
              localField: "bookingDetails.car_id", // Trường car_id trong bảng bookings
              foreignField: "_id", // Trường _id trong bảng cars
              as: "carDetails" // Kết quả của join sẽ được lưu vào mảng carDetails
            }
          },
          { $unwind: "$carDetails" }, // Mở mảng carDetails
          {
            $lookup: {
              from: "carownerrequests", // Kết nối với bảng carownerrequests
              localField: "carDetails.owner_id", // Trường owner_id trong bảng cars
              foreignField: "user_id", // Trường user_id trong bảng carownerrequests
              as: "ownerRequestDetails" // Kết quả sẽ được lưu vào mảng ownerRequestDetails
            }
          },
          { $unwind: "$ownerRequestDetails" }, // Mở mảng ownerRequestDetails
          {
            $match: {
              "ownerRequestDetails.user_id": id, // Lọc theo user_id trong bảng carownerrequests
              payment_status: "Completed" // Lọc theo trạng thái thanh toán "Completed"
            }
          },
          { 
            $group: {
              _id: "$ownerRequestDetails.user_id", // Nhóm theo user_id
              totalAmount: { $sum: "$payment_amount" } // Tính tổng payment_amount
            }
          }
        ]);
        
        // Nếu không có kết quả, trả về 0
        return result.length > 0 ? result[0].totalAmount : 0;
      }

    
}
module.exports = RevenueService;