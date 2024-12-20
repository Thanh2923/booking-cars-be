const RevenueService = require("../services/revenueService");
const Revenue = {
  calculatorTotalRevenue: async (req, res) => {
    try {
      const getPaymentAmount = await RevenueService.totalRevenue();
      if (!getPaymentAmount) {
        return res.status(404).json({ message: "Current revenue not found !" });
      }
      return res.status(200).json({
        message: "Total revenue calculated successfully!",
        totalRevenue: getPaymentAmount // Tổng doanh thu
      });
    } catch (err) {
      console.error("Error calculating total revenue:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getTotalRevenueByUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy userId từ URL params
      const totalRevenue = await RevenueService.totalRevenueByUser(id);
       
      if (totalRevenue === 0) {
        return res.status(404).json({ message: "No revenue found for this user" });
      }
      
      return res.status(200).json({
        message: "Total revenue for user calculated successfully!",
        totalRevenue: totalRevenue
      });
    } catch (err) {
      console.error("Error calculating total revenue for user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
module.exports = Revenue;
