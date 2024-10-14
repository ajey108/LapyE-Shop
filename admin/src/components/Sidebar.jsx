import React from 'react'
import {NavLink} from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

const Sidebar = () => {
  return (
   <div className="">
    <div className="">
        <NavLink className='flex items-center gap-3 border border-gray-200' to="/add">
            < MdAddCircle/>
            <p className='hidden md:block'>Add items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-200' to="/list">
            < FaRegListAlt/>
            <p className='hidden md:block'>List items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-200' to="/orders">
            < FaCalendarCheck/>
            <p className='hidden md:block'>Order items</p>
        </NavLink>

    </div>
   </div>
  )
}

export default Sidebar;