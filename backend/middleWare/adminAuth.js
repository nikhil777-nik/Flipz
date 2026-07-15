import jwt from 'jsonwebtoken'
import userModel from '../models/userModels.js'

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
        // Standard check (via ENV variables)
        if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return next()
        }

        // Database-driven Check (via MongoDB role === 'admin')
        if (token_decode && token_decode.id) {
            const user = await userModel.findById(token_decode.id)
            if (user && user.role === 'admin') {
                return next()
            }
        }

        return res.json({success:false,message:"Not Authorized Login Again"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default adminAuth