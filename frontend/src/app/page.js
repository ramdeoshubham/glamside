import React from "react";
import { IoMdRose } from "react-icons/io";
import LatestCollection from "../components/LatestCollection";
import RandomCollection from "../components/RandomCollection";
import Link from "next/link";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    const data = await res.json();
    if (data.success) {
      return data.products;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6">
        {/* Brand Logo */}
        <p className="text-2xl md:text-3xl font-bold font-dancing flex items-center gap-2 mb-6 tracking-wide">
          <IoMdRose size={60} className="text-black dark:text-white hover:text-pink-700 active:text-pink-700" />
        </p>

        <h1 className="text-6xl md:text-8xl font-light tracking-wide leading-tight">
          Modern Fashion.
          <br /> Minimal Soul.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
          Crafted for bold minimalists who express confidence through
          simplicity.
        </p>

        <Link href="/collection">
          <button className="mt-10 px-10 py-3 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black tracking-widest text-sm uppercase">
            Shop Collection
          </button>
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-gray-200 dark:border-gray-700 my-16" />

      {/* Latest Collection */}
      <section className="px-6 md:px-20 mb-20">
        <LatestCollection products={products} />
      </section>

      {/* Full width banner */}
      <section className="h-[50vh] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide">
            Designed for Confidence
          </h2>
          <p className="mt-4 text-gray-300 dark:text-gray-600">
            Every piece is created to feel powerful, effortless, and timeless.
          </p>
        </div>
      </section>

      {/* Random Picks */}
      <section className="px-6 md:px-20 my-20">
        <RandomCollection products={products} />
      </section>
    </div>
  );
}
