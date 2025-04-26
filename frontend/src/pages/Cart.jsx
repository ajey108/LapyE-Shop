import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  //console.log(cartData);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t dark:text-white pt-14 px-4 sm:px-8">
      {/* Title */}
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item, index) => {
          console.log(item);
          const productData = products.find(
            (product) => product._id === item._id
          );

          console.log(productData);

          return (
            <div
              key={index}
              className="py-4 border-t border-b  grid gap-4 grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] items-center"
            >
              {/* Product Details */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-7">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm sm:text-base">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-2 border  text-xs sm:text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border text-gray-700 w-full sm:w-20 px-2 py-1 text-center text-sm sm:text-lg"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Button */}
              <FaTrashAlt
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="text-xl sm:text-2xl cursor-pointer text-gray-600 hover:text-red-500"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-center sm:justify-end my-10">
        <div className="w-full sm:w-[450px] space-y-4">
          <CartTotal />
          <div className="text-center sm:text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition duration-200"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
