import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String,required: true },
    price: { type: Number, required: true,},
    image:{type:Array,required:true},
    category: { type: String, required: true },
    variants: { type: Array, required: true },
    specs: { type: Object, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
   

});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;