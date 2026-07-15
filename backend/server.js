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