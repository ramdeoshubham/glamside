"use client";
import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

const Wishlist = () => {
  const {
    wishlistItems,
    products,
    removeFromWishlist,
    token,
    getWishlistCount,
  } = useContext(ShopContext);

  const wishlistProducts = products.filter((p) =>
    wishlistItems.includes(p._id)
  );

  if (!token) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 dark:text-gray-400 min-h-screen">
        <p>Please login to view your wishlist ♡</p>
      </div>
    );
  }

  if (getWishlistCount() === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400 min-h-screen">
        <p>Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((p) => (
          <div
            key={p._id}
            className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-gray-800"
          >
            <Link href={`/product/${p._id}`} className="block">
              <div className=" p-4">
                <img
                  src={Array.isArray(p.image) ? p.image[0] : p.image}
                  alt={p.name}
                  className="h-40 w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            <div className="flex items-center justify-between bg-gray-50 dark:bg-black px-4 py-3">
              <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {p.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeFromWishlist(p._id);
                }}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-500"
                title="Remove from wishlist"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
