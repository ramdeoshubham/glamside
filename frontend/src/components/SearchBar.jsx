"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  const { setSearch } = useContext(ShopContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input);
    }, 400); // debounce delay

    return () => clearTimeout(timer);
  }, [input, setSearch]);

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w:1/2">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IoSearchOutline size={25} />
      </div>
    </div>
  );
};

export default SearchBar;
