import express from 'express'
import { loginuser,registeruser,adminlogin,getUserProfile,forgotPassword,resetPassword,validateResetToken } from '../controllers/userControllers.js'
import authUser from '../middleWare/auth.js'
 
const userRouter = express.Router();

userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.post('/admin',adminlogin)
userRouter.get('/profile',authUser,getUserProfile)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password/:token',resetPassword)
userRouter.get('/reset-password/:token',validateResetToken)

export default userRouter