import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found , access denied",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default protectRoute;
