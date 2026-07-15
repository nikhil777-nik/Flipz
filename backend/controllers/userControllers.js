import userModel from "../models/userModels.js";
import validator from "validator"
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"
import crypto from "crypto"
import nodemailer from "nodemailer"

const createtoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//Route for user login
const loginuser=async (req,res)=>{
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if (!user){
             return res.json({success:false , message:"User doesn't exist"})
        }
        const isMatch =await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createtoken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid credentials'})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for user Register

const registeruser =async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        // checking user already exists or not

        const exists =await userModel.findOne({email})

        if(exists){
            return res.json({success:false , message:"User already exists"})
        }
       // validating emaiil format & strong password

        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false , message:"Please enter a strong password"})
        }
       // hashing user password

       const salt = await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

       const newUser =new userModel({
        name,
        email,
        password:hashedPassword

       })
       
       const user =await newUser.save()

       const token = createtoken(user._id)

       res.json({success:true,token})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Route for admin login
const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Try finding the admin user in MongoDB first
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.role !== 'admin') {
                return res.json({ success: false, message: "Not authorized as admin" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
                return res.json({ success: true, token });
            } else {
                return res.json({ success: false, message: "Invalid credentials" });
            }
        }

        // 2. Fallback to env variables (Legacy path)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user profile details
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body; // populated by authUser middleware
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Mailer helper
const sendResetEmail = async (email, link) => {
    let transporter;
    
    // Check if production variables are provided
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else {
        // Fallback to test Ethereal account
        let testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    const mailOptions = {
        from: '"Flipz Recovery" <noreply@flipz.com>',
        to: email,
        subject: "Password Reset Request - Flipz",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${link}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #6366f1; text-align: center;">Flipz Security Hub</h2>
                <p>Hello,</p>
                <p>You requested a password reset for your account on Flipz. Please click the button below to reset your password. This link is valid for <strong>1 hour</strong>.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
                </div>
                <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                <p style="word-break: break-all; color: #6366f1;">${link}</p>
                <p>If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 11px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Flipz. All rights reserved.</p>
            </div>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Log the Ethereal testing link in console if test account was used
    if (!process.env.SMTP_USER) {
        console.log("-----------------------------------------");
        console.log("📨 Ethereal Test Email Sent!");
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        console.log("-----------------------------------------");
        return nodemailer.getTestMessageUrl(info);
    }
    return true;
}

// Forgot Password controller
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "No account exists with this email address." })
        }

        // Generate reset token
        const token = crypto.randomBytes(20).toString('hex')
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

        await user.save()

        // Create reset link (pointing to frontend reset page)
        const origin = req.headers.origin || "http://localhost:5173"
        const resetLink = `${origin}/reset-password/${token}`

        // Send email
        const emailResult = await sendResetEmail(email, resetLink)
        
        // Return success info, including ethereal test email link if applicable
        res.json({ 
            success: true, 
            message: "Password reset link sent to your email!",
            previewUrl: typeof emailResult === 'string' ? emailResult : null
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Reset Password controller
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        // Find user with token that is not expired
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.json({ success: false, message: "Password reset token is invalid or has expired." })
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long." })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update password and clear reset fields
        user.password = hashedPassword
        user.resetPasswordToken = ""
        user.resetPasswordExpires = undefined

        await user.save()

        res.json({ success: true, message: "Your password has been updated successfully!" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Validate Reset Token controller
const validateResetToken = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.json({ success: false, message: "Password reset token is invalid or has expired." });
        }
        res.json({ success: true, message: "Token is valid." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {loginuser,registeruser,adminlogin,getUserProfile,forgotPassword,resetPassword,validateResetToken}