import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);  // Initial state should be null
  const [image, setImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(''); // State for selected variant

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set the first image
      setSelectedVariant(foundProduct.variants[0].config); // Set the first variant as default
    } else {
      console.log('Product not found');
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData(); // Fetch product when products are available
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gray-100 text-black mb-3">
      {/* Product Data */}
      <div className="flex justify-center items-center flex-col sm:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={image}
            alt={productData.name}
            className="w-full max-w-[400px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left text-black">
          <h1 className="text-3xl font-bold uppercase">{productData.name}</h1>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-black font-semibold text-lg">4.5</span>
            <span className="text-gray-900">★★★★☆</span>
            <p className="text-sm text-gray-400">(24 reviews)</p>
          </div>
          <p className="text-lg mt-2">{productData.description}</p>
          <p className="text-lg mt-2">{productData.subCategory}</p>

          {/* Specifications */}
          {productData.specs && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">Specifications:</h3>
              <ul className="text-gray-400 flex flex-col gap-1">
                {Object.entries(productData.specs).map(([key, value], index) => (
                  <li key={index}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variant Selection */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Select Variant:</h3>
            {productData.variants.map((variant, index) => (
              <button
                onClick={() => setSelectedVariant(variant.config)} // Set selected variant
                className={`border py-2 px-3 ml-2 bg-gray-100 ${
                  selectedVariant === variant.config ? 'bg-gray-950 text-white' : ''
                }`}
                key={index}
              >
                {variant.config}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-xl font-semibold">Price: <span className="text-black">{currency}{productData.price}</span></p>
          </div>

          {/* Add to Cart Button */}
          <button onClick={()=>  addToCart(productData._id,selectedVariant)} className="mt-6 px-6 py-2 bg-gray-300 text-black font-semibold uppercase rounded-md hover:bg-gray-500 transition-all">
            Add to Cart
          </button>

          {/* Delivery Info */}
          <div className="mt-6">
            <p className="text-gray-500">Estimated Delivery: 3-5 Business Days</p>
            <p className="text-gray-400 text-sm">Free Shipping on orders over ₹20000</p>
          </div>

          <div className="mt-2">
            <p className="text-red-600">Only 2 left in stock – order soon!</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : <div className="opacity-0">Loading...</div>;
};

export default Product;
