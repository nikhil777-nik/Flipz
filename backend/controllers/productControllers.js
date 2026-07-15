
import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import fs from "fs"

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
                // delete temp file
                fs.unlink(item.path, (err) => {
                    if (err) console.error("Error deleting temp file:", err);
                });
                return result.secure_url
            })
        )

        const productdata = {
            name, description, category, price: Number(price), subCategory, bestseller: bestseller === "true" ? true : false, sizes: JSON.parse(sizes), image: imageurl, date: Date.now(), isApproved: true, status: 'Approved'
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
        const { showAll } = req.query;
        let query = { isApproved: { $ne: false } };
        if (showAll === "true") {
            query = {};
        }
        const products = await productModel.find(query);
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

// Function to upload creator design
const uploadDesign = async (req, res) => {
    try {
        const { name, description, category, subCategory, sizes, bestseller, royalty, designerId, designerName } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageurl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                // clean up local file
                fs.unlink(item.path, (err) => {
                    if (err) console.error("Error deleting temp file:", err);
                });
                return result.secure_url
            })
        )

        // Calculate dynamic selling price depending on subcategory: Topwear (800), Bottomwear (1000), Set (1200)
        let baseCost = 800;
        if (subCategory === "Bottomwear") {
            baseCost = 1000;
        } else if (subCategory === "Set") {
            baseCost = 1200;
        }
        const calculatedPrice = Number(royalty) + baseCost;

        const productdata = {
            name,
            description,
            category,
            price: calculatedPrice,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageurl,
            date: Date.now(),
            isApproved: false, // requires admin approval
            status: 'Pending',
            royalty: Number(royalty),
            designerId,
            designerName: designerName || "Anonymous Creator"
        }

        const product = new productModel(productdata)
        await product.save()
        res.json({ success: true, message: "Design submitted successfully! Pending admin approval." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get all pending creator designs
const getPendingDesigns = async (req, res) => {
    try {
        const pending = await productModel.find({ status: 'Pending' })
        res.json({ success: true, data: pending })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Approve design
const approveDesign = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findByIdAndUpdate(productId, {
            status: 'Approved',
            isApproved: true
        }, { new: true })
        
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }
        res.json({ success: true, message: "Design approved successfully! Published to marketplace." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Reject design
const rejectDesign = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findByIdAndUpdate(productId, {
            status: 'Rejected',
            isApproved: false
        }, { new: true })

        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }
        res.json({ success: true, message: "Design rejected successfully." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get designs uploaded by a specific designer
const getDesignerDesigns = async (req, res) => {
    try {
        const { designerId } = req.body
        const designs = await productModel.find({ designerId })
        res.json({ success: true, data: designs })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addProducts, listProducts, removeProducts, removeAllProducts, singleProduct, uploadDesign, getPendingDesigns, approveDesign, rejectDesign, getDesignerDesigns }



