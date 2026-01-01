import mongoose from "mongoose";
import { DB_URI } from "./dotenvConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Connected database successfully!");
  } catch (error) {
    console.log("❌ Connect database failed!");
    console.log("👉 Error:", error.message);
    process.exit(1); // dừng app nếu DB fail
  }
};

export default connectDB;
