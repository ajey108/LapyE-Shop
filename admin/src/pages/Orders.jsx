import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  }, [token]); // Dependencies: token

  // Call fetchAllOrders when component mounts or token changes
  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Handle order status updates
  const statusHandler = async (event, orderId) => {
    if (!orderId || !token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders(); // Refresh orders after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error updating order status"
      );
    }
  };

  return (
    <div className="orders-page p-4 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h3>
      <div className="orders-container space-y-4">
        {orders.length > 0 ? (
          orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="order-item bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <FaBox className="text-3xl text-gray-600 bg-gray-200 p-2 rounded-full" />
                <div className="order-details text-sm text-gray-700">
                  {/* Customer's Full Name */}
                  <p className="font-semibold">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.zipCode}, {order.address.country}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {order.items.map((item, itemIndex) => (
                  <p key={itemIndex} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-gray-500">({item.size})</span>
                    </span>
                  </p>
                ))}
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  Items:{" "}
                  <span className="font-medium">{order.items.length}</span>
                </p>
                <p>
                  Payment Method:{" "}
                  <span className="font-medium">{order.paymentMethod}</span>
                </p>
                <p>
                  Payment:{" "}
                  <span
                    className={`font-medium ${
                      order.payment ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>
                  Date:{" "}
                  <span className="font-medium">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  {currency} {order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  className="mt-2 px-2 py-1 border rounded-md text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={order.status}>Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
