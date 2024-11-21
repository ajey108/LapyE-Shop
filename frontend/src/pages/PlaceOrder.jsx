import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { SiRazorpay } from "react-icons/si";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
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

  const [fomrData, setFomrData] = useState({
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
    const name = e.target.name;
    const value = e.target.value;
    setFomrData((data) => ({ ...data, [name]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      // Add products from the cart items
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
        console.log(orderItems);
      }

      // orderData
      let orderData = {
        userId: token,
        items: orderItems,
        address: fomrData,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        payment: false,
        date: Date.now(),
      };

      switch (method) {
        // API call for cod
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  //UI

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* leftSide */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Your"} text2={"order"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={fomrData.firstName}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="FirstName"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={fomrData.lastName}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="LastName"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={fomrData.email}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={fomrData.street}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Street address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={fomrData.city}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={fomrData.state}
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
            value={fomrData.zipCode}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="number"
            placeholder="ZipCode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={fomrData.country}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={fomrData.phone}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="number"
          placeholder="Phone number"
        />
      </div>

      {/* RightSide */}
      <div className="mt-8">
        <div className="mt-8 min-w-80 ">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />

          {/* paymentMethods */}

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-100"
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
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-100"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <LiaMoneyCheckAltSolid className="text-green-500" />
              <span>CashOnDelivery</span>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
