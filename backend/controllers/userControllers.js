import userModel from "../models/userModels.js";
import validator from "validator"
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"

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

export {loginuser,registeruser,adminlogin,getUserProfile}