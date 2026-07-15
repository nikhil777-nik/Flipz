import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4 // 🔥 important fix for many DNS issues
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;