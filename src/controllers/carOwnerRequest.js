const carOwnerRequests = require ("../services/carOwnerRequest");
// const wbm = require("wbm");
const Nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");
const authService = require("../services/authService");
// when user want to request a car owner
const CartOwnerRequest = async (req, res) => {
  try {
    const dataToSend = req.body;
    const userId = req.user.userId;
    const requestData = { ...dataToSend, user_id: userId };
    const carOwnerRequest = await carOwnerRequests.carOwnerRequests(
      requestData
    );
    if (!carOwnerRequest) {
      return res.status(400).json({ data:[] });
    }
    return res
      .status(201)
      .json({ message: "Request created successfully", data: carOwnerRequest });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// only can admin views list request

const ViewCarOwnerRequest = async (req, res) => {
  try {
    // Lấy page và limit từ query, nếu không có thì sử dụng giá trị mặc định
    const { page = 1, limit = 10 } = req.query;

    // Gọi service để lấy tất cả yêu cầu của chủ xe với phân trang
    const result = await carOwnerRequests.getAllCarOwnerRequest(page, limit);

    // Kiểm tra nếu không có dữ liệu
    if (!result || result.data.length === 0) {
      return res.status(404).json({ data: [], message: "No data found" });
    }

    // Trả về dữ liệu kèm theo tổng số bản ghi và số trang
    return res.status(200).json({
      data: result.data,
      total: result.totalCarOwnerRequests,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      success: true,
    });
  } catch (err) {
    // Lỗi từ server
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const UpdateCarOwnerRequestStatus = async (req, res) => {
  //   const userId = req.user.userId;

  const { id } = req.params; // id  cartRequest
  const { status, message } = req.body;
  
  try {
    const getUserOwner = await carOwnerRequests.getCarOwnerRequestById(id);
    if (!getUserOwner) {
      return res.status(400).json({ data:[]});
    }
    getUserOwner.status = status;

    const saveUpdate = await carOwnerRequests.updateCarOwnerRequest(
      getUserOwner
    );

    if (!saveUpdate) {
      return res.status(400).json({ message: "Failed to update request" });
    }

    const getEmail = await carOwnerRequests.getEmail(getUserOwner.user_id);

      const roleName =  status === "Approved" ? "ownerCar" : "user" ;
   
      const ownerCarRole = await authService.getRoleByName(roleName);
      if (!ownerCarRole) {
        return res.status(400).json({ message: "Role not found" });
      }

      const updateRole = await authService.updateUserRole(
        getUserOwner.user_id,
        ownerCarRole._id
      );
    

    //
    const TOKEN = "12ca1b117ae28fb61627c0973da2586f";

    const client = new MailtrapClient({
      token: TOKEN
    });

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Send email"
    };
    const recipients = [
      {
        email: "thannv2923@gmail.com"
      }
    ];

    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: "bd9dce39-54a7-4924-a59f-f103b4bcf3e0",
        template_variables: {
          company_info_name: "3H1D",
          email: getUserOwner.email,
          first_name: getUserOwner.nameOwnerCar,
          last_name: getUserOwner.status,
          company_info_address: "Test_Company_info_address",
          company_info_city: "Test_Company_info_city",
          company_info_zip_code: "Test_Company_info_zip_code",
          company_info_country: "Test_Company_info_country"
        }
      })
      .then(
        res.status(200).json({ message: message, data: saveUpdate }),
        console.error
      );

    // return res.status(200).json({ message: message, data: saveUpdate });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  CartOwnerRequest,
  ViewCarOwnerRequest,
  UpdateCarOwnerRequestStatus
};
