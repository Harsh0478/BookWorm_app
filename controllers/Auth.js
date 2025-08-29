import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mailSender from "../utils/mailSender.js";
import registerTemplate from "../mailTemplates/registerTemplate.js";

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should 6 character long",
      });
    }

    //   User already exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        success: false,
        message: "Username already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: profile,
    });

    const token = generateToken(newUser._id);

    await mailSender(
      newUser.email,
      "Welcome to BookWorm 📚",
      registerTemplate(newUser.email, newUser.username)
    );

    res.status(201).json({
      success: true,
      message: "User register Successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in register controller",
      error: error.message,
    });
  }
};

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered with Us, Please Register to Continue",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    re;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error , Error in Login controller",
      error: error.message,
    });
  }
};
