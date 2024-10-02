import React, { useState } from 'react';
import { NavLink,Link } from 'react-router-dom'

import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiShoppingBag } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

const Navbar = () => {

  const [visible,setVisible] =useState(false);
  return (
    <div className=' flex  justify-between py-5 font-medium cursor-pointer'>
      <Link to='/'>
      
      <h1 className='text-white rounded-sm font-bold bg-gray-950 font-serif'>LapyE-shop</h1>
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

      <NavLink to='/' className='flex flex-col items-center gap-1'>
        <p>Home</p>
        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
      </NavLink>

      <NavLink to='/about' className='flex flex-col items-center gap-1'>
        <p>About</p>
        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
      </NavLink>

      <NavLink to='/collection' className='flex flex-col items-center gap-1'>
        <p>Collection</p>
        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
      </NavLink>

      <NavLink to='/contact' className='flex flex-col items-center gap-1'>
        <p>Contact</p>
        <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
      </NavLink>


      </ul>

      <div className="flex items-center gap-5">
      <CiSearch/>


      <div className='group relative'>
      <CgProfile />

      <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text">
         <p className='hover:text-black'>MyProfile</p>
         <p className='hover:text-black'>Orders</p>
         <p className='hover:text-bg-red-400'>Logout</p>
        </div>

      </div>
      </div>

     <Link to='/cart ' className='relative'>
     <HiShoppingBag className='w-[35px]'/>
     <p className='absolute right-[-2px] bottom-[-5px] w-[15px] text-center leading-4 text-black aspect-square rounded-full text-[10px]'>10</p>
     </Link>

     <IoMenu className='sm:hidden' onClick={()=>setVisible(true)} />
      
      </div>

    {/* side bar menu for small screen */}

    <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full': 'w-0'}`}>
    <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    
                    <IoMdArrowRoundBack />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
    </div>

    </div>
  )
}

export default Navbar