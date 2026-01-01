import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

// ĐĂNG KÝ
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // kiểm tra email tồn tại
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// ĐĂNG NHẬP
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // tạo token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
