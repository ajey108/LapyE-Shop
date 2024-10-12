import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

//api endpoints 
productRouter.post('/add', upload.single('image'), addProduct);
productRouter.get('/list',listProducts);
productRouter.delete('/remove',removeProduct);
productRouter.get('/single',singleProduct);

export default productRouter;