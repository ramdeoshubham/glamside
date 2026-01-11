import React from "react";
import { IoMdRose } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <Link to="/">
          <p className="text-2xl font-bold font-dancing flex items-center gap-2 font-dancing">
            <IoMdRose className="inline" />
            GlamSide
          </p>
        </Link>
        <button
          className="px-10 py-3 border border-black hover:bg-black hover:text-white tracking-widest text-sm uppercase"
          onClick={() => setToken("")}
        >
          Logout
        </button>
      </div>
      <hr className="text-gray-300" />
    </>
  );
};

export default Navbar;
