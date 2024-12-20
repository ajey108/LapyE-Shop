import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  console.log(token);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data); // Debugging API response
      setLoading(false);
      if (response.data.success && Array.isArray(response.data.products)) {
        setList(response.data.products);
        console.log("Updated list:", response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const removeProduct = async (id, token) => {
    console.log("Token:", token);
    if (!id || typeof id !== "string") {
      toast.error("Invalid product ID.");
      return;
    }

    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => {
            return status >= 200 && status < 300;
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the product list after deletion
      } else {
        toast.error(response.data.message || "Error removing product");
      }
    } catch (error) {
      console.error("Error removing product:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || "No response from the server.";
        toast.error(errorMessage);
      } else {
        toast.error("Error removing product: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchList();
    }
  }, [token]);

  return (
    <>
      <p className="text-xl font-bold mb-4">All Products List</p>
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-700">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(list) && list.length > 0 ? (
                list.map((product) => (
                  <tr
                    key={product._id} // Use product._id for unique keys
                    className="md:table-row block mb-4 border-b border-gray-600 md:border-none"
                  >
                    <td className="py-2 px-4">
                      <img
                        className="w-16 h-16 object-cover rounded"
                        src={product.image[0]}
                        alt={product.name}
                      />
                    </td>
                    <td className="py-2 px-4 md:table-cell block">
                      <span className="md:hidden font-bold">Name: </span>
                      {product.name}
                    </td>
                    <td className="py-2 px-4 md:table-cell block">
                      <span className="md:hidden font-bold">Category: </span>
                      {product.category}
                    </td>
                    <td className="py-2 px-4 md:table-cell block">
                      <span className="md:hidden font-bold">Price: </span>
                      {currency} {product.price}
                    </td>
                    <td className="py-2 px-4 md:table-cell block">
                      <button
                        onClick={() => removeProduct(product._id, token)}
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
        )}
      </div>
    </>
  );
};

export default List;
