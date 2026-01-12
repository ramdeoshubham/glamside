import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import DarkModeButton from "./DarkModeButton";
import { IoMdRose } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { LuHeart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setToken, navigate, token, getCartCount, getWishlistCount } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <p className="text-2xl font-bold font-dancing flex items-center gap-2 font-dancing">
            <IoMdRose className="inline" />
            GlamSide
          </p>
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-6">
          <div className="group relative">
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders ")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative hidden sm:block">
            {/* bottom-[-5px] right-[-5px] */}
            <LuShoppingBag size={20} />
            {token && (
              <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] dark:bg-white dark:text-black">
                {getCartCount()}
              </p>
            )}
          </Link>
          <Link to="/wishlist" className="relative hidden sm:block">
            {/* bottom-[-5px] right-[-5px] */}
            <LuHeart size={20} />
            {token && (
              <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] dark:bg-white dark:text-black">
                {getWishlistCount()}
              </p>
            )}
          </Link>
          <div className="group relative cursor-pointer hidden sm:block">
            <FaRegUser
              size={20}
              onClick={() => (token ? null : navigate("/login"))}
            />

            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded dark:bg-gray-800">
                <a href="https://glamside-admin.vercel.app/" target="_blank">
                  Admin Panel
                </a>
                <p onClick={() => navigate("/orders ")}>Orders</p>
                {token ? (
                  <p onClick={logout}>Logout</p>
                ) : (
                  <p onClick={() => navigate("/login")}>Login</p>
                )}
              </div>
            </div>
          </div>

          <DarkModeButton />
          <button onClick={() => setVisible(true)} className="sm:hidden">
            <HiOutlineMenuAlt3 size={24} />
          </button>
        </div>
      </div>
      <hr className="text-gray-300" />
      {visible && (
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-black transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 dark:text-gray-200">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <HiArrowLeft size={20} />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/contact"
            >
              CONTACT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/wishlist"
            >
              WISHLIST
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/cart"
            >
              CART
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/orders"
            >
              ORDERS
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/login"
            >
              {token ? (
                <p onClick={logout}>LOGOUT</p>
              ) : (
                <p onClick={() => navigate("/login")}>LOGIN / SIGNUP</p>
              )}
            </NavLink>
            <a
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border bg-gray-300 dark:bg-gray-800"
              href="https://glamside-admin.vercel.app/"
              target="_blank"
            >
              ADMIN PANEL
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
