import express from 'express'
import { 
    addProducts, 
    listProducts, 
    removeProducts, 
    removeAllProducts, 
    singleProduct, 
    uploadDesign, 
    getPendingDesigns, 
    approveDesign, 
    rejectDesign, 
    getDesignerDesigns,
    getApprovedDesigns
} from '../controllers/productControllers.js'
import upload from '../middleWare/multer.js';
import adminAuth from '../middleWare/adminAuth.js';
import authUser from '../middleWare/auth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProducts)
productRouter.post('/remove', adminAuth, removeProducts)
productRouter.post('/remove-all', adminAuth, removeAllProducts)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)

// Creator Royalty Program Endpoints
productRouter.post('/upload-design', authUser, upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), uploadDesign)
productRouter.get('/pending-designs', adminAuth, getPendingDesigns)
productRouter.post('/approve-design', adminAuth, approveDesign)
productRouter.post('/reject-design', adminAuth, rejectDesign)
productRouter.post('/designer-designs', authUser, getDesignerDesigns)
productRouter.get('/approved-designs', adminAuth, getApprovedDesigns)

export default productRouter