import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

import { LiaMoneyCheckAltSolid } from "react-icons/lia";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    token,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //check if user is logged in

    if (!token) {
      toast.error("Please log in to place an order.");
      setTimeout(() => {
        window.location.replace("/login"); // Redirect to login page
      }, 2000);
      return;
    }
    try {
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

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API Calls for COD

        case "cod": {
          // Log the token and the Authorization header before the request
          // console.log("Token being sent:", token);
          // console.log("Authorization header:", `Bearer ${token} {header}`);

          try {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              {
                headers: { Authorization: `Bearer ${token}` }, // Ensure proper format
              }
            );
            // console.log("COD response:", response.data); // Log the response data
            if (response.data.success) {
              setCartItems({});
              toast.success("Order has been placed");
              setTimeout(() => {
                navigate("/orders");
              }, 1000);
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error(
              "Error placing order:",
              error.response?.data || error.message
            );
          }
          break;
        }

        // API Calls for Stripe
        case "stripe": {
          //console.log("orderData from stripe is:", orderData);
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex dark:text-white flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border dark:text-gray-500 dark:bg-gray-80  px-3 py-2 rounded w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border dark:text-gray-500 dark:bg-gray-80  px-3 py-2 rounded w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
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
            className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border dark:text-gray-500 dark:bg-gray-80 px-3 py-2 rounded w-full"
          type="tel"
          placeholder="Phone Number"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8 dark:text-white ">
        <div className="mt-12">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "stripe" ? "bg-blue-400" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-blue-600" : ""
                }`}
              ></p>

              <span>Stripe</span>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "cod" ? "bg-green-700" : ""
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
        <div className="mt-10 w-full flex justify-end mb-2">
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
