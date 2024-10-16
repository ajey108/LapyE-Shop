import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';


const List = ({token}) => {
  console.log(token);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching products');
      console.log(error);
    }
  };

  //remove Product
  const removeProduct = async (id) => {
    console.log(id);
    
    try {
      // Send the id in the URL path
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message); 
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-xl font-bold mb-4">All Products List</p>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white rounded-lg">
  <thead className="hidden md:table-header-group"> {/* Hide headers on mobile */}
    <tr className="bg-gray-700">
      <th className="py-2 px-4">Image</th>
      <th className="py-2 px-4">Name</th>
      <th className="py-2 px-4">Category</th>
      <th className="py-2 px-4">Price</th>
      <th className="py-2 px-4">Action</th>
    </tr>
  </thead>
  <tbody>
    {list.length > 0 ? (
      list.map((product, index) => (
        <tr
          key={index}
          className="md:table-row block mb-4 border-b border-gray-600 md:border-none"
        >
          <td className="py-2 px-4">
            <img
              className="w-16 h-16 object-cover rounded"
              src={product.image}
              alt={product.name}
            />
          </td>
          <td className="py-2 px-4 md:table-cell block"> {/* Responsive row */}
            <span className="md:hidden font-bold">Name: </span>{product.name}
          </td>
          <td className="py-2 px-4 md:table-cell block">
            <span className="md:hidden font-bold">Category: </span>{product.category}
          </td>
          <td className="py-2 px-4 md:table-cell block">
            <span className="md:hidden font-bold">Price: </span>
            {currency} {product.price}
          </td>
          <td className="py-2 px-4 md:table-cell block">
            <button
              onClick={() => removeProduct(product._id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="text-center py-4">
          No products available
        </td>
      </tr>
    )}
  </tbody>
</table>
      </div>
    </>
  );
};

export default List;
