import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar, FaRegStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import RandomCollection from "../components/RandomCollection";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    token,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const isInWishlist = wishlistItems.includes(productData._id);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*------------------ Product data ------------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*----------- Product Images ---------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-md"
              src={productData.image}
              alt=""
            />
          </div>
        </div>
        {/* -------------- Product Info --------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 mb-10 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                token
                  ? addToCart(productData._id)
                  : toast("Please Login or Signup first")
              }
              className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={() =>
                token
                  ? isInWishlist
                    ? removeFromWishlist(productData._id)
                    : addToWishlist(productData._id)
                  : toast("Please Login or Signup first")
              }
              className={`flex items-center gap-2 px-6 py-2 rounded-md transition
    ${
      isInWishlist
        ? "bg-red-500 text-white hover:bg-red-600"
        : "border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
            >
              <FaHeart />
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5 text-gray-200" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* ---------- Description & Review Section ---------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* ---------- Display Related Products ---------- */}
      <RandomCollection />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
