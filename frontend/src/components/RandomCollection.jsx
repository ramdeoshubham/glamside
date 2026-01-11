import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RandomCollection = () => {
  const { products } = useContext(ShopContext);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 4)); // same count as RelatedProducts
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-2xl mb-15">
        <h2>CURATED FOR YOU</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {randomProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomCollection;
