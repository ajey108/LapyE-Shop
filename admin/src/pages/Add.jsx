import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";

const Add = () => {
  return (
   <>
  <form action="">
    <div>
      <p>upload Image</p>
    </div>
    <div>
      <label htmlFor="image">
        <FaCloudUploadAlt />
        <input type="file"  id="image" hidden />
      </label>
    </div>
    <div className="">
      <p>Product Name</p>
      <input type="text" placeholder='type here' required/>
    </div>
  </form>
   
   </>
  )
}

export default Add