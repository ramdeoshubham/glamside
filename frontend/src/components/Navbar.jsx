"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const { setToken, navigate, token, getCartCount, getWishlistCount } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link href="/">
          <p className="text-2xl font-bold font-dancing flex items-center gap-2 font-dancing">
            <IoMdRose className="inline" />
            GlamSide
          </p>
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex flex-col items-center gap-1 ${
                pathname === link.path ? "active" : ""
              }`}
            >
              <p>{link.name}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <div className="group relative">
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
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

          <Link href="/cart" className="relative hidden sm:block">
            <LuShoppingBag size={20} />
            {token && (
              <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] dark:bg-white dark:text-black">
                {getCartCount()}
              </p>
            )}
          </Link>
          <Link href="/wishlist" className="relative hidden sm:block">
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
                <a href="http://localhost:5174/" target="_blank">
                  Admin Panel
                </a>
                <p onClick={() => navigate("/orders")}>Orders</p>
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
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-black transition-all z-50 ${
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                onClick={() => setVisible(false)}
                className={`py-2 pl-6 border ${pathname === link.path ? "active" : ""}`}
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
            <Link
              onClick={() => setVisible(false)}
              className={`py-2 pl-6 border ${pathname === "/wishlist" ? "active" : ""}`}
              href="/wishlist"
            >
              WISHLIST
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`py-2 pl-6 border ${pathname === "/cart" ? "active" : ""}`}
              href="/cart"
            >
              CART
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`py-2 pl-6 border ${pathname === "/orders" ? "active" : ""}`}
              href="/orders"
            >
              ORDERS
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`py-2 pl-6 border ${pathname === "/login" ? "active" : ""}`}
              href="/login"
            >
              {token ? (
                <p onClick={(e) => { e.preventDefault(); logout(); }}>LOGOUT</p>
              ) : (
                <p onClick={(e) => { e.preventDefault(); navigate("/login"); }}>LOGIN / SIGNUP</p>
              )}
            </Link>
            <a
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border bg-gray-300 dark:bg-gray-800"
              href="http://localhost:5174/"
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
