import userModel from "../models/userModels.js";

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const quantity = Number(req.body.quantity) || 1;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // If item doesn't exist, create it
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // If size already exists, increase quantity
    if (cartData[itemId][size]) {
      cartData[itemId][size] += quantity;
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Cart Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    res.status(200).json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };