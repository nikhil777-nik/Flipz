
import { v2 as cloudinary } from "cloudinary"
// import connectCloudinary from "../config/cloudinary.js"
import productModel from "../models/productModel.js"
// funtion for add product 

const addProducts = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageurl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(imageurl)
        const productdata = {
            name, description, category, price: Number(price), subCategory, bestseller: bestseller === "true" ? true : false, sizes: JSON.parse(sizes), image: imageurl, date: Date.now()
        }
        console.log(productdata)
        const product = new productModel(productdata)
        await product.save()
        res.json({ success:true,message:"product added successfully"})


    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// funtion for list product 

const listProducts = async (req, res) => {
    try {
        const products=await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
         console.log(error)
         res.json({ success: false, message: error.message })
    }
}


// funtion for remove product 

const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"product removed successfully"});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const removeAllProducts = async (req, res) => {
    try {
        await productModel.deleteMany({});
        res.json({ success: true, message: "All products removed successfully" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// funtion for single product info 

const singleProduct = async (req, res) => {
    try {
        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addProducts, listProducts, removeProducts, removeAllProducts, singleProduct }



