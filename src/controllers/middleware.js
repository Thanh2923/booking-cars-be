const jwt = require("jsonwebtoken");
const carOwnerRequest = require("../services/carOwnerRequest");
const Middleware = {
  verifyToken: (req, res, next) => {
    const tokenBear = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.headers.token;
    if (tokenBear || token) {
      const accessToken = tokenBear ? tokenBear : token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ message: "Token not valid . Please Login again" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json(`You're not authentication`);
    }
  }, 

  verifyTokenRole: (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role_id;
      console.log(userRole);
      if (roles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({
          message: "You do not have permission to perform this action"
        });
      }
    };
  },

  verifyOwnerCar: async (req, res, next) => {
    const userId = req.user.userId;
    console.log(userId);
    // check if the user is the owner of the car
    const checkOwner = await carOwnerRequest.checkOwner(userId);

    if (!checkOwner) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this car" });
    }

    if (checkOwner.status !== "Approved") {
      return res
        .status(403)
        .json({
          message:
            "Bạn đã gửi yêu trở thành chủ xe nhưng chưa được chấp nhận . Vui lòng chờ xác nhận từ hệ thống"
        });
    }
    next();
  },
 
  verifyOnlyUserBooking : async (req, res, next) => {
    const role = req.user.role_id;
    if(role !== 'user') {
        return res.status(403).json({ message: "Chỉ có user mới có thể đặt xe" });
    }
    next()
  }
};

module.exports = Middleware;
