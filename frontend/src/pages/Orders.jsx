import React from 'react'
import { useContext } from 'react'  
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  return (
    <div className='border-t pt-10 px-4 md:px-10'>
      <div className="text-center text-2xl mb-8">
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div className="flex flex-col gap-6">
        {
          products.slice(0, 4).map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row justify-between border-b pb-6'>
              <div className='flex gap-4 md:gap-6'>
                <img className='w-20 h-20 object-cover' src={item.image} alt={item.name} />
                <div>
                  <p className='font-semibold text-lg'>{item.name}</p>
                  <p className='text-gray-500'>{currency}{item.price}</p>
                  <p className='text-gray-500'>Quantity: 1</p>
                  <p className='text-gray-500'>Variant: 8GB/256GB</p>
                </div>
              </div>
              
              <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-4 md:mt-0'>
                <p className='text-sm md:text-base'>Date: <span className='font-medium text-gray-600'>01/01/2022</span></p>

                <div className="flex items-center gap-2">
                  <span className='block w-2 h-2 rounded-full bg-green-500'></span>
                  <p className='text-sm md:text-base'>Ready To Ship</p>
                </div>
                
                <button className='bg-black text-white text-xs md:text-sm w-full md:w-28 h-9'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
