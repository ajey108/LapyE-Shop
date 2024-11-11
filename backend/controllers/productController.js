import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, variants, specs, bestseller } = req.body;

        console.log("Request Body:", req.body); // Log the incoming request body

        // Initialize imageUrl
        let imageUrl = null;

        // Handle file upload with Cloudinary if req.file exists
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: 'image',
                    folder: 'products'
                });
                imageUrl = result.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image to Cloudinary"
                });
            }
        }

        // Helper function to handle arrays or JSON strings
        const parseJSON = (data) => {
            if (Array.isArray(data)) return data;
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error(`Error parsing JSON for data: ${data}`, error);
                return [];
            }
        };

        // Prepare the product data for MongoDB
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            variants: parseJSON(variants), // Use parseJSON to handle array or string
            specs: parseJSON(specs),       // Same for specs
            bestseller: bestseller === "true",
            image: imageUrl,
            date: Date.now()
        };

        console.log("Product Data:", productData); // Log the processed product data

        // Save the product data to the database
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
                variants: productData.variants,
                specs: productData.specs,
                bestseller: productData.bestseller,
                image: imageUrl
            }
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Server error while adding product",
            error: error.message
        });
    }
};







// function for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}



// function for removing product

const removeProduct = async (req, res) => {
    console.log('Authorization:', req.headers.authorization);
    try {
        const productId = req.params.id; // Get the product ID from URL path parameter
        console.log(`Attempting to delete product with ID: ${productId}`);

        const product = await productModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    }
};








// function for single product info

const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

export { addProduct, listProducts, removeProduct, singleProduct };