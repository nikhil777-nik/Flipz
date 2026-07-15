// Placing orders using COD Method 
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModels.js"
import Stripe from 'stripe'
import Razorpay from 'razorpay'
import crypto from 'crypto'
// global variable
const currency = 'inr'
const deliveryCharge = 10

// gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Razorpay initialization
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing order using COD Method
const placeOrder = async (req, res) => {
    try {
        console.log("placeOrder req.body:", req.body)
        const { userId, items, amount, address } = req.body

        // Safely calculate amount if it's missing or zero
        let finalAmount = amount;
        if (!finalAmount) {
            const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
            finalAmount = itemsTotal + deliveryCharge; // Fallback to items total plus flat delivery charge
        }

        const orderData = {
            userId,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            status: "Ready to ship"
        }

        const neworder = orderModel(orderData)
        await neworder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order placed successfully' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}

// Placing orders using Stripe Method 
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;


        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            status: "Ready to ship"
        }

        const neworder = orderModel(orderData)
        await neworder.save()

        const line_items = items.map((item) => ({

            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}


// verify Stripe
const verifyOrderStripe = async (req, res) => {
    try {
        const { success, orderId } = req.body;
        const { userId } = req.body;
        const order = await orderModel.findById(orderId);
        if (success == "true" || success === true) {
            order.payment = true;
            await order.save();
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: 'Order placed successfully' })
        } else {
            await orderModel.findByIdAndUpdate(orderId, { status: 'Cancelled' })
            res.json({ success: false, message: 'Order placed failed' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}


// Placing orders using Razorpay Method 
const placeOrderRazorpay = async (req, res) => {

    try {


        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "RazorPay",
            payment: false,
            date: Date.now(),
            status: "Ready to ship"
        }

        const neworder = orderModel(orderData)
        await neworder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: neworder._id.toString()
        }

        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order, orderId: neworder._id })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}

const verifyOrderRazorpay = async (req, res) => {
    try {
        const { userId, orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpayOrderId)
        
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Payment Verification Failed" })
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        // Populate missing amount on the fly
        const updatedOrders = orders.map(order => {
            const orderObj = order.toObject();
            if (orderObj.amount === undefined || orderObj.amount === null) {
                const itemsTotal = orderObj.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                orderObj.amount = itemsTotal + deliveryCharge;
            }
            return orderObj;
        });
        res.json({ success: true, data: updatedOrders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}

//  User Order data For Forntend 
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        // Populate missing amount on the fly
        const updatedOrders = orders.map(order => {
            const orderObj = order.toObject();
            if (orderObj.amount === undefined || orderObj.amount === null) {
                const itemsTotal = orderObj.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                orderObj.amount = itemsTotal + deliveryCharge;
            }
            return orderObj;
        });
        res.json({ success: true, data: updatedOrders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Order placed failed' })
    }
}

// update order status form Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { verifyOrderRazorpay,verifyOrderStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrder, updateStatus }