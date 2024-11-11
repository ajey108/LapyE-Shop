import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { SiRazorpay } from "react-icons/si";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* leftSide */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Your"} text2={"order"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="FirstName"
          />
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="LastName"
          />
        </div>
        <input
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Email address"
        />
        <input
          className="border border-gray-400 px-3 py-2 rounded w-full"
          type="text"
          placeholder="Street address"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="number"
            placeholder="ZipCode"
          />
          <input
            className="border border-gray-400 px-3 py-2 rounded w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
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
                } `}
              ></p>
              <SiRazorpay className="text-blue-500 " span />{" "}
              <span>Razorpay</span>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-100"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod" ? "bg-green-400" : ""
                } `}
              ></p>
              <LiaMoneyCheckAltSolid className="text-green-500 " />{" "}
              <span>CashOnDelievery</span>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
