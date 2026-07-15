import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name: {type:String ,required:true},
    description: {type:String ,required:true},
    price: {type:Number,required:true},
    image:{type:Array,required:true},
    category: {type:String,required:true},
    subCategory: {type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
    isApproved:{type:Boolean,default:true},
    status:{type:String,default:'Approved',enum:['Pending','Approved','Rejected']},
    royalty:{type:Number,default:0},
    designerId:{type:String,default:''},
    designerName:{type:String,default:''},
    userDesignId:{type:String,default:''}
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)


export default productModel
