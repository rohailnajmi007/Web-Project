import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-100'>
      <div className="flex flex-col gap-6 pt-8 pl-[10%] text-[14px]">
        <NavLink 
          className='flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-200 transition-all' 
          to="/add"
        >
          <img className='w-6 h-6' src={assets.add_icon} alt="Add Icon" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink 
          className='flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-200 transition-all' 
          to="/list"
        >
          <img className='w-6 h-6' src={assets.order_icon} alt="List Icon" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink 
          className='flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-200 transition-all' 
          to="/orders"
        >
          <img className='w-6 h-6' src={assets.order_icon} alt="Orders Icon" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar