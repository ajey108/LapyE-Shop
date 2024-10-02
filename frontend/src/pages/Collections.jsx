import React, { useContext } from 'react'

const Collections = () => {
  const {products}=useContext(ShopContext);
  const [category, setCategory]=useState([false]); 

  return (
   <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
    {/* filter options */}

    <div className='min-w-60'>
      <p className='my-2 text-xl flex items-center gap-2 cursor-pointer'>Filters</p>
      {/* categoryFilte */}
      <div className={`border border-gray-400 pl-5 py-2 mt-6 ${category ? '' : "hidden" } sm:display-block`}>
        <p className='mb-3 text-sm font-medium'> Categories</p>
      </div>
    </div>
   </div>
  )
}

export default Collections