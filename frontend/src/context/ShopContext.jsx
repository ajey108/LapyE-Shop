import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  console.log(cartItems);

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Add item to cart
  const addToCart = async (itemId, selectedVariant) => {
    console.log("itemId:", itemId);
    console.log(`clicked ${itemId} ${selectedVariant}`);

    // create a shallow copy of the current cartItems
    let cartData = Object.assign({}, cartItems);

    // create a deep copy of the nested objects
    for (let key in cartData) {
      if (Object.prototype.hasOwnProperty.call(cartData, key)) {
        cartData[key] = JSON.parse(JSON.stringify(cartData[key]));
      }
    }

    // if the item is already in the cart, increment the quantity
    if (cartData[itemId]) {
      if (cartData[itemId][selectedVariant]) {
        cartData[itemId][selectedVariant] += 1;
      } else {
        cartData[itemId][selectedVariant] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][selectedVariant] = 1;
    }

    // get the quantity from the cartData
    const quantity = cartData[itemId][selectedVariant];

    setCartItems(cartData);

    // if we are logged in, then update the cart
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, selectedVariant, quantity },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //get cart count

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      totalCount += Object.keys(cartItems[items]).reduce(
        (acc, variant) => acc + cartItems[items][variant],
        0
      );
    }
    return totalCount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  //update quantity

  const updateQuantity = async (itemId, selectedVariant, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity > 0) {
      // Update quantity if it's more than 0
      cartData[itemId][selectedVariant] = quantity;
    } else {
      // Remove the variant if quantity is 0
      delete cartData[itemId][selectedVariant];

      // If no variants are left for a product, remove the product from the cart
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, selectedVariant, quantity },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  //get cart amount

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      }
    }
    return totalAmount;
  };

  //get user cart data
  useEffect(() => {
    const getUserCart = async () => {
      const localToken = localStorage.getItem("token");
      if (!localToken) return;

      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          {
            headers: { authorization: `Bearer ${localToken}` },
          }
        );
        console.log("response", response);

        if (response.data.success && response.data.cart) {
          setCartItems(response.data.cart);
        } else {
          toast.error(response.data.message || "Failed to retrieve cart");
          localStorage.removeItem("token");
          // Optionally redirect to login
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };

    getUserCart();
  }, [backendUrl]);

  //get products data

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    getProductsData();
  }, [backendUrl]); // Add any other dependencies here

  //set token from local storage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
