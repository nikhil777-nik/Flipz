import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {type:String ,required:true},
    email: {type:String ,required:true,unique:true},
    password: {type:String,required:true},
    cartData:{type:Object,default:{}},
    royaltyEarned:{type:Number,default:0},
    royaltyBalance:{type:Number,default:0},
    role:{type:String,default:'user',enum:['user','admin']},
    resetPasswordToken:{type:String,default:''},
    resetPasswordExpires:{type:Date}
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel 