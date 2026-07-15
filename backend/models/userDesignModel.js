import mongoose from "mongoose";

const userDesignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true },
    isApproved: { type: Boolean, default: false },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
    royalty: { type: Number, required: true },
    designerId: { type: String, required: true },
    designerName: { type: String, required: true }
})

const userDesignModel = mongoose.models.user_design || mongoose.model("user_design", userDesignSchema)

export default userDesignModel;
