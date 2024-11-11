import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

//api endpoints
productRouter.post('/add',adminAuth, upload.single('image'), addProduct);
productRouter.get('/list',listProducts);
productRouter.delete('/remove/:id', adminAuth, removeProduct);

productRouter.get('/single',singleProduct);

export default productRouter;