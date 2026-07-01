"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductItem from "../../components/ProductItem";
import SearchBar from "../../components/SearchBar";
import { IoIosArrowForward } from "react-icons/io";

const CollectionClient = ({ initialProducts }) => {
  const { search } = useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(initialProducts);

  const allMeta = Array.from(
    new Set(initialProducts.map((p) => p.meta?.[0]).filter(Boolean))
  );

  const toggleMeta = (value) => {
    setSelectedMeta((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let copy = [...initialProducts];

    // 🔍 Apply search
    if (search) {
      copy = copy.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 Apply meta filter
    if (selectedMeta.length > 0) {
      copy = copy.filter((p) => selectedMeta.includes(p.meta?.[0]));
    }

    // ↕ Sorting
    if (sortType === "low-high") copy.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") copy.sort((a, b) => b.price - a.price);

    setVisibleProducts(copy);
  }, [initialProducts, sortType, selectedMeta, search]);

  return (
    <>
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <IoIosArrowForward
              className={`sm:hidden ${showFilter ? "rotate-90" : ""}`}
            />
          </p>

          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <div className="flex flex-col gap-2 text-sm font-light text-gray-800 dark:text-gray-200 uppercase">
              {allMeta.map((meta) => (
                <label className="flex gap-2 cursor-pointer" key={meta}>
                  <input
                    className="w-3"
                    type="checkbox"
                    checked={selectedMeta.includes(meta)}
                    onChange={() => toggleMeta(meta)}
                  />
                  {meta}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-end text-base mb-4 sm:text-2xl">
            {/* Product Sorting */}
            <select
              className="border border-gray-300 bg-transparent text-sm px-3 py-3"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option className="text-black" value="relevant">Sort by: Relevant</option>
              <option className="text-black" value="low-high">Sort by: Low to High</option>
              <option className="text-black" value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
            {visibleProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionClient;
