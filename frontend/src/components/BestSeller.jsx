import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        // Only update when products change
        if (products.length > 0) {
            setBestSellers(products.filter(product => product.bestseller === true));
        }
    }, [products]); 
  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title text1={'Best'} text2={'Seller'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, et.
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {bestSellers.map((item, index) => (
                <ProductItem
                    key={index}
                    id={item._id}
                    image={item.image[0]} // Access the first image in the array
                    name={item.name}
                    price={item.price}
                />
            ))}
        </div>
    </div>
  )
}

export default BestSeller