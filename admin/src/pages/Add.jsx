import React from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const Add = ({token}) => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Gaming');
  const [variants, setVariants] = useState([]);
  const [bestseller, setBestseller] = useState('true');
  const [specs, setSpecs] = useState([]);


  const submitHandler = async (e)=>{
    e.preventDefault();

    try{

      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('variants', JSON.stringify(variants));
      formData.append('bestseller', bestseller);
      formData.append('specs', JSON.stringify(specs));

      const response = await  axios.post(`${backendUrl}/api/product/add`, formData,{headers:{token}});
      console.log(response.data)
    }catch(error){

    }
  }


  return (
    <div className="max-w-lg min-h-screen mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <form onSubmit={submitHandler} className="space-y-6">
        {/* Upload Image */}
        <div>
          <p className="text-lg mb-2">Upload Image</p>
          <label
            htmlFor="image"
            className="flex items-center justify-center bg-gray-700 py-4 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300"
          >
            {!image ? <FaCloudUploadAlt size={20} /> : <img className=' w-[50px] h-[50px]' src={URL.createObjectURL(image)} alt="upload" />}
            <span className="text-sm">Choose an image</span>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <p className="text-lg">Product Name</p>
          <input onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeholder="Type here"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <p className="text-lg">Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description here"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>



        {/* Product Specs */}
        <div className="space-y-2">
          <p className="text-lg">Product Specs</p>
          <textarea onChange={(e) => setSpecs(e.target.value)}
            value={specs}
            placeholder="Specs here"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Category */}
        <div className="space-y-2">
          <p className="text-lg">Product Category</p>
          <select
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
          >
            <option value="Professional">Professional</option>
            <option value="OfficeWork">Office Work</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>

        {/* Product Price */}
        <div className="space-y-2">
          <p className="text-lg">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Variants */}
        <div className="space-y-2">
          <p className='text-lg'> Product Variants </p>
          <div className="flex flex-wrap gap-4">
            <div onClick={(e) => setVariants(prev => prev.includes('8GB/256GB/512GB') ? prev.filter(item => item !== '8GB/256GB/512GB') : [...prev, '8GB/256GB/512GB'])} className="bg-gray-700 px-4 py-2 rounded-lg">
              <p className={`text-lg ${variants.includes('8GB/256GB/512GB') ? 'text-green-500' : ''}`}>8GB/256GB/512GB</p>
            </div>
            <div onClick={(e) => setVariants(prev => prev.includes('16GB/1TB') ? prev.filter(item => item !== '16GB/1TB') : [...prev, '16GB/1TB'])} className="bg-gray-700 px-4 py-2 rounded-lg">
              <p className={`text-lg ${variants.includes('16GB/1TB') ? 'text-green-500' : ''}`}>16GB/1TB</p>
            </div>
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center space-x-2">
          <input onChange={() => setBestseller(prev => !prev)}
            value={bestseller}
            checked={true}
            type="checkbox"
            id="bestseller"
            className="h-5 w-5 text-green-500 focus:green-500 border-gray-300 rounded"
          />
          <label htmlFor="bestseller" className="text-sm">Add to bestseller</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 py-3 rounded-lg text-white font-semibold hover:bg-green-500 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
