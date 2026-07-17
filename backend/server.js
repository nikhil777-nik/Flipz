import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Initialize Cloudinary config
connectCloudinary();

// 🔥 DEBUG (keep this temporarily)
console.log("MONGO URI:", process.env.MONGODB_URI);
console.log("RAZORPAY ID Loaded:", process.env.RAZORPAY_KEY_ID ? "YES" : "NO");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// Database connection middleware for serverless/Vercel environments
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed: " + error.message });
  }
});

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("API WORKING");
});



import bcrypt from 'bcrypt';
import userModel from './models/userModels.js';

// ✅ Start server ONLY after DB + Cloudinary connect
const autoSeedAdmin = async () => {
  try {
    const adminEmail = "admin@ecommerce.com";
    const adminExists = await userModel.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      const newAdmin = new userModel({
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      await newAdmin.save();
      console.log("✅ Admin user seeded in MongoDB successfully!");
    } else {
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log("✅ Existing admin user role verified/restored in MongoDB!");
      }
    }
  } catch (error) {
    console.log("❌ Admin seeding error:", error);
  }
};

// ✅ Start server locally or in non-serverless environments
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();
      await autoSeedAdmin();

      app.listen(port, () => {
        console.log("✅ Server started locally on PORT:", port);
      });

    } catch (error) {
      console.log("❌ Startup Error:", error);
    }
  };
  startServer();
} else {
  // On serverless Vercel, auto-seed admin on demand (non-blocking)
  connectDB().then(() => autoSeedAdmin()).catch(err => console.log("❌ Seeding failed:", err));
}

export default app;