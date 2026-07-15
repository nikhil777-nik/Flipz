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

// 🔥 DEBUG (keep this temporarily)
console.log("MONGO URI:", process.env.MONGODB_URI);
console.log("RAZORPAY ID Loaded:", process.env.RAZORPAY_KEY_ID ? "YES" : "NO");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

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

const resetAllUserRoyalties = async () => {
  try {
    const result = await userModel.updateMany({}, {
      $set: {
        royaltyEarned: 0,
        royaltyBalance: 0
      }
    });
    console.log(`✅ Reset all user money earnings. Modified ${result.modifiedCount} user documents to ₹0.`);
  } catch (error) {
    console.log("❌ Error resetting user royalties:", error);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    await autoSeedAdmin();
    await resetAllUserRoyalties();

    app.listen(port, () => {
      console.log("✅ Server started on PORT:", port);
    });

  } catch (error) {
    console.log("❌ Startup Error:", error);
  }
};

// ✅ CALL the function
startServer(); 

export default app;