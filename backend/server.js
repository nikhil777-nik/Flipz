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



// ✅ Start server ONLY after DB + Cloudinary connect
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed default admin credentials in MongoDB
    try {
      const userModel = (await import('./models/userModels.js')).default;
      const bcrypt = (await import('bcrypt')).default;
      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      
      const adminExists = await userModel.findOne({ email });
      if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new userModel({
          name: "Sowmith Admin",
          email: email,
          password: hashedPassword,
          role: "admin"
        });
        await newAdmin.save();
        console.log("👑 Default admin user seeded successfully in MongoDB!");
      } else {
        if (adminExists.role !== 'admin') {
          adminExists.role = 'admin';
          await adminExists.save();
          console.log("👑 Updated existing user role to admin.");
        }
      }
    } catch (err) {
      console.error("❌ Error seeding admin user:", err);
    }

    await connectCloudinary();

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