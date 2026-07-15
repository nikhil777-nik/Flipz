import express from 'express'
import { loginuser,registeruser,adminlogin,getUserProfile } from '../controllers/userControllers.js'
import authUser from '../middleWare/auth.js'
 
const userRouter = express.Router();

userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.post('/admin',adminlogin)
userRouter.get('/profile',authUser,getUserProfile)

export default userRouter