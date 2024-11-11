import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Gaming");
  const [variants, setVariants] = useState([]);
  const [bestseller, setBestseller] = useState(true);
  const [specs, setSpecs] = useState([""]); // Updated to store multiple specs

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("specs", JSON.stringify(specs));
      variants.forEach((variant) => formData.append("variants[]", variant));

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message);
        // Reset form after successful submission
        setName("");
        setImage(null);
        setDescription("");
        setPrice("");
        setCategory("Gaming");
        setVariants([]);
        setBestseller(true);
        setSpecs([""]);
      } else {
        toast.error(response.data.message || "Unexpected response");
      }
    } catch (error) {
      console.error("Error response:", error.response); // Log error response
      if (error.response && error.response.data) {
        // Attempt to show backend error message if available
        toast.error(error.response.data.message || "Server Error");
      } else {
        toast.error("Error adding product");
      }
    }
  };

  // Function to handle adding new specs
  const addSpec = () => {
    setSpecs([...specs, ""]);
  };

  // Function to handle removing a spec
  const removeSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Function to handle spec input change
  const handleSpecChange = (index, value) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <form onSubmit={submitHandler} className="space-y-6">
        {/* Upload Image */}
        <div>
          <p className="text-lg mb-2">Upload Image</p>
          <label
            htmlFor="image"
            className="flex items-center justify-center bg-gray-700 py-4 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300"
          >
            {!image ? (
              <FaCloudUploadAlt size={20} />
            ) : (
              <img
                className="w-[50px] h-[50px]"
                src={URL.createObjectURL(image)}
                alt="upload"
              />
            )}
            <span className="text-sm">Choose an image</span>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <p className="text-lg">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Type here"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <p className="text-lg">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description here"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Specs */}
        <div className="space-y-2">
          <p className="text-lg">Product Specs</p>
          {specs.map((spec, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={spec}
                onChange={(e) => handleSpecChange(index, e.target.value)}
                placeholder="Enter spec"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
                required
              />
              {specs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg"
          >
            Add Spec
          </button>
        </div>

        {/* Product Category */}
        <div className="space-y-2">
          <p className="text-lg">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:green-500"
            required
          />
        </div>

        {/* Product Variants */}
        <div className="space-y-2">
          <p className="text-lg">Product Variants</p>
          <div className="flex flex-wrap gap-4">
            {["8GB/256GB/512GB", "16GB/1TB"].map((variant) => (
              <button
                key={variant}
                onClick={() =>
                  setVariants((prev) =>
                    prev.includes(variant)
                      ? prev.filter((item) => item !== variant)
                      : [...prev, variant]
                  )
                }
                className={`px-4 py-2 rounded-lg cursor-pointer transition duration-300 ${
                  variants.includes(variant)
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                title={`Select ${variant}`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="bestseller" className="text-sm">
            Add to bestseller
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 py-3 rounded-lg text-white font-semibold hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
