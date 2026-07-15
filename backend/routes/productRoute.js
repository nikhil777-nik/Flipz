import express from 'express'
import { addProducts,listProducts,removeProducts,removeAllProducts,singleProduct } from '../controllers/productControllers.js'
import upload from '../middleWare/multer.js';
import adminAuth from '../middleWare/adminauth.js';

const productRouter =express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProducts)
productRouter.post('/remove',adminAuth,removeProducts)
productRouter.post('/remove-all',adminAuth,removeAllProducts)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProducts)

export default productRouter