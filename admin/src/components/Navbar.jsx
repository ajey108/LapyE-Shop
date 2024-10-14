import React from 'react'
import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <RiAdminFill/> <h1>AdminPannel</h1>
        <button className='bg-red-500 py-2 px-4 rounded text-white'>Logout</button>
    </div>
  )
}

export default Navbar