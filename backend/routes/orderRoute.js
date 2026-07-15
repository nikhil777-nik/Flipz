import express from "express"
import adminAuth from "../middleWare/adminAuth.js"
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrder,updateStatus,verifyOrderStripe,verifyOrderRazorpay} from "../controllers/orderController.js"
import authUser from "../middleWare/auth.js"
const orderRoute=express.Router()


// Admin Features
orderRoute.post('/list',adminAuth,allOrders)
orderRoute.post('/status',adminAuth,updateStatus)

//  Payment Features
orderRoute.post('/userorders',authUser,userOrder)
orderRoute.post('/place',authUser,placeOrder)
orderRoute.post('/stripe',authUser,placeOrderStripe)
orderRoute.post('/razorpay',authUser,placeOrderRazorpay)

// User Features
orderRoute.post('/userorders',authUser,userOrder)
orderRoute.post('/remove',authUser,userOrder)


// verify payment
orderRoute.post('/verifyStripe',authUser,verifyOrderStripe)
orderRoute.post('/verifyRazorpay',authUser,verifyOrderRazorpay)
export default orderRoute
