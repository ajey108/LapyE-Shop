import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { SiRazorpay } from "react-icons/si";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";

const PlaceOrder = () => {
  console.log("page loaded Now");
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
    delivery_fee,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const initPay = (order) => {
    console.log("initPay called with order:", order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Payment successful", response);
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error placing order", error);
          toast.error(error.response?.data?.message || "Error placing order.");
        }
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay script not loaded");
    }
  };

  // Submit handler function
  const onSubmitHandler = async (e) => {
    console.log("onSubmitHandler started");
    e.preventDefault();
    try {
      console.log("Inside try block");
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        userId: token,
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        payment: false,
        date: Date.now(),
      };

      switch (method) {
        case "cod": {
          console.log("cod triggered");
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        // Razorpay payment method
        case "razorpay": {
          console.log("Razorpay method selected");

          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            console.log("Razorpay response:", responseRazorpay.data);
            // ...
          } else {
            console.error("Error:", responseRazorpay.data.message);
            toast.error(responseRazorpay.data.message);
          }
          break;
        }

        default:
          toast.error("Invalid payment method.");
          break;
      }
    } catch (error) {
      console.error("Error placing order", error);
      toast.error("Error placing order.");
    }
    console.log("onSubmitHandler finished");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="tel"
          placeholder="Phone Number"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-12">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "razorpay" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <SiRazorpay className="text-blue-500" />
              <span>Razorpay</span>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "cod" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <LiaMoneyCheckAltSolid className="text-green-500" />
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full flex justify-end">
          <button
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            type="submit"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
