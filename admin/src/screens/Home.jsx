import React from "react";
import { Link} from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRose } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <IoMdRose size={60} className="inline mb-5 hover:text-pink-700" />
        <h1 className="text-5xl font-light tracking-wide mb-4">
          <span className="font-dancing">GlamSide </span>Admin
        </h1>
        <p className="text-gray-500 mb-16">
          Store overview & operational dashboard
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Link to="/add">
            <div className="border p-10 flex flex-col items-center gap-4 hover:shadow-2xl">
              <IoMdAddCircleOutline size={36}/>
              <p className="text-lg font-medium">Add Products</p>
              <p className="text-sm text-gray-500">
                Make your own products inventory.
              </p>
            </div>
          </Link>
          <Link to='/list'>
          <div className="border p-10 flex flex-col items-center gap-4 hover:shadow-2xl">
            <FaListCheck size={36} />
            <p className="text-lg font-medium">Your Products</p>
            <p className="text-sm text-gray-500">See your whole current inventory.</p>
          </div>
          </Link>
          <Link to='/orders'>
          <div className="border p-10 flex flex-col items-center gap-4 hover:shadow-2xl">
            <LuPackageOpen size={36} />
            <p className="text-lg font-medium">Customer Orders</p>
            <p className="text-sm text-gray-500">All your customer order in one place.</p>
          </div>
        </Link>
        </div>

        <p className="mt-20 text-xs text-gray-400 tracking-wide">
          © {new Date().getFullYear()} GlamSide - Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Home;
