import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { TiDelete } from "react-icons/ti";


const Cart = () => {
  const { products, currency, cartItems,updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  console.log(cartData);

  useEffect(() => {
    const tempData = Object.keys(cartItems).flatMap(productId => 
      Object.keys(cartItems[productId]).map(size => ({
        _id: productId,
        size,
        quantity: cartItems[productId][size]
      }))
    );
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text={'Your'} text2={'cart'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);
            
            // Check to ensure productData is defined and has image array
            if (!productData) return null;

            return (
              <div key={index} className="py-3 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] items-center gap-4">
                <div className="flex gap-4 items-start">
                  <img 
                    className="w-16 sm:w-20" 
                    src={productData.image && productData.image[0] ? productData.image[0] : '/default-image.jpg'} 
                    alt={productData.name} 
                  />
                  <div className=''>
                    <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                    <p className="text-gray-500 text-sm">Variant: {item.size}</p>
                   
                    
                  </div>

                </div>
                <TiDelete onClick={() => updateQuantity(item._id, item.size, 0)} className="text-2xl cursor-pointer" />
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Cart;
