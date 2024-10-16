import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');

    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();

    // Add item to cart
    const addToCart = async (itemId, selectedVariant) => {
        console.log(`clicked ${itemId} ${selectedVariant}`)

        //a deep copy of the current cartItems
        let cartData = structuredClone(cartItems)

        //if the item is already in the cart incr quantity
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
        setCartItems(cartData);
       
    }

    //get cart count

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            totalCount += Object.keys(cartItems[items]).reduce((acc, variant) => acc + cartItems[items][variant], 0);
        }
        return totalCount;
    }




    useEffect(() => {
       console.log(cartItems)
    }, [cartItems])


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
      };

      //get cart amount

      const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
          let itemInfo = products.find((product) => product._id === items);
          for(const item in cartItems[items]) {
              try{
                if(cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
              } catch(error) {
              }
          }
        }
        return totalAmount;
      }
      
    
      //get products data

      const getProductsData = async ()=>{
        try{
          const response = await axios.get(`${backendUrl}/api/product/list`);
         if(response.data.success){
            setProducts(response.data.products)
         }else{
            toast.error(response.data.message)
         }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }
      }

      //get products data 
      useEffect(() => {
        getProductsData();
      }, [])


      //set token from local storage
      useEffect(() => {
       if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
       }
      }, [])


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,setCartItems,
        cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,
        token,setToken
    
    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;