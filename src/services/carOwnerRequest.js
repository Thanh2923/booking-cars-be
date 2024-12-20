const CarOwnerRequest = require("../models/carOwnerRequest");
const User = require("../models/user");
const validatePhoneNumber = (phone) => {
  // Regex for Vietnamese phone numbers (starts with 0, 9-11 digits)
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

  return phoneRegex.test(phone);
};
const carOwnerRequests = async (requestData) => {
  // send request
  const carOwnerRequest = new CarOwnerRequest(requestData);
  return await carOwnerRequest.save();
};

const getAllCarOwnerRequest = async (page = 1, limit = 10) => {
  try {
    // Tạo điều kiện query (nếu cần)
    const query = {};

    // Xác định giá trị skip (số dòng bỏ qua) cho phân trang
    const skip = (page - 1) * limit;

    // Truy vấn dữ liệu với phân trang nếu có
    let carOwnerRequestsQuery = CarOwnerRequest.find(query);

    // Nếu có limit và page, thì sử dụng skip và limit
    if (limit) {
      carOwnerRequestsQuery = carOwnerRequestsQuery.skip(skip).limit(limit);
    }

    // Tính tổng số lượng CarOwnerRequest
    const totalCarOwnerRequests = await CarOwnerRequest.countDocuments(query);

    // Lấy dữ liệu
    const carOwnerRequests = await carOwnerRequestsQuery;

    // Tính số trang tổng cộng
    const totalPages = Math.ceil(totalCarOwnerRequests / limit);

    // Trả về dữ liệu cùng với tổng số lượng và số trang
    return {
      data: carOwnerRequests,
      totalCarOwnerRequests,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getCarOwnerRequestById = async (id) => {
  try {
    return await CarOwnerRequest.findById(id);
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};

const updateCarOwnerRequest = async (getUserOwner) => {
  try {
    const updateStatus = new CarOwnerRequest(getUserOwner);
    return await updateStatus.save();
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

const getEmail = async (userId) => {
  try {
    return await User.findOne({_id : userId });
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};
const checkOwner = async (userId) => {
try {
return await CarOwnerRequest.findOne({user_id : userId})
}catch(err){
    console.log(err);
    throw Error(err.message);
}
}

module.exports = {
  carOwnerRequests,
  getAllCarOwnerRequest,
  getCarOwnerRequestById,
  updateCarOwnerRequest,
  getEmail,checkOwner
};
