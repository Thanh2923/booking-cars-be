const express = require("express");
const connectDB = require("./src/config/db");
const index = require("./src/routes/index"); // Đảm bảo import đúng router
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
// Kết nối với MongoDB
connectDB();
app.use("/api/uploads", express.static(path.join(__dirname, "")));
// Middleware xử lý JSON
app.use(express.json());
app.use(cors());

// Đảm bảo sử dụng router đúng cách
app.use("/api", index);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
