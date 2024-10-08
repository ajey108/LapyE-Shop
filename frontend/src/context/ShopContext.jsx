import { createContext, useEffect } from 'react';
import { products } from '../assets/assets';
import { useState } from 'react';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

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
      
    


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity
    
    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;