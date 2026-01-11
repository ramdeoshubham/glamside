import { NavLink } from 'react-router-dom'

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";
import { TiHomeOutline } from "react-icons/ti";


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/">
                <TiHomeOutline size={25}/>
                <p className='hidden md:block'>Home</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                <IoMdAddCircleOutline size={25}/>
                <p className='hidden md:block'>Add Product</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                <FaListCheck size={25}/>
                <p className='hidden md:block'>List Products</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
                <LuPackageOpen size={25}/>
                <p className='hidden md:block'>All Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar