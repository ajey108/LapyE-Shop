import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

// function for add product


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, variants,specs, bestseller } = req.body;

        // after file has been uploaded and is available in req.file
        let imageUrl = null;
        if (req.file) {
            // Manually upload the image to Cloudinary using the path from multer's upload
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                folder: 'products' //  to store in a specific folder in Cloudinary
            });
            imageUrl = result.secure_url; // The Cloudinary URL of the uploaded image
        }

      //save data in mongodb

      const productData = {
        name,
        description,
        price:Number(price),
        category,
        variants:JSON.parse(variants),
        specs:JSON.parse(specs),
        bestseller:bestseller === "true" ? true : false,
        image: imageUrl,
        date:Date.now()
      }
      console.log(productData);

      const product = new productModel(productData);
      await product.save();

        res.json({
            success: true,
            message: 'Product added successfully',
            product: {
                name,
                description,
                price,
                category,
                variants,
                specs,
                bestseller,
                image: imageUrl
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// function for list product

const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({
            success: true,
            products
        });

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}



// function for removing product

const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body._id);
        res.json({
            success: true,
            message: 'Product removed successfully'
        });
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// function for single product info

const singleProduct = async (req, res) => {
    try{
       
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({
            success: true, 
            product
        });
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}

export { addProduct, listProducts, removeProduct, singleProduct };