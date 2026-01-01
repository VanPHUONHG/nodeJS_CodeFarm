import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";
import bcrypt from "bcryptjs";

// REGEX kiểm tra email
const emailRegex = /^\S+@\S+\.\S+$/;

// ĐĂNG KÝ
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Check thiếu dữ liệu
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
        errors: {
          fullname: !fullname ? "Họ tên không được để trống" : null,
          email: !email ? "Email không được để trống" : null,
          password: !password ? "Mật khẩu không được để trống" : null,
        },
      });
    }

    // 2. Check email hợp lệ
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email không hợp lệ",
        errors: {
          email: "Email sai định dạng",
        },
      });
    }

    // 3. Check độ dài password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu quá ngắn",
        errors: {
          password: "Mật khẩu phải có ít nhất 6 ký tự",
        },
      });
    }

    // 4. Check email tồn tại
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
        errors: {
          email: "Email này đã được đăng ký",
        },
      });
    }

    // 5. Hash password
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

    // 1. Check thiếu dữ liệu
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập email và mật khẩu",
        errors: {
          email: !email ? "Email không được để trống" : null,
          password: !password ? "Mật khẩu không được để trống" : null,
        },
      });
    }

    // 2. Check email hợp lệ
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email không hợp lệ",
        errors: {
          email: "Email sai định dạng",
        },
      });
    }

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

    // 3. Tạo token
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
