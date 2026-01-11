import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { FaRegTrashCan } from "react-icons/fa6";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    token,
    getCartCount,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const temp = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          temp.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }

      setCartData(temp);
    }
  }, [cartItems, products]);

  return (
    <>
      {token ? (
        getCartCount() === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="border-t pt-14">
              <div className="text-2xl mb-3">
                <h3 className="text-2xl mb-7">YOUR CART</h3>
              </div>

              <div>
                {cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id
                  );

                  return (
                    <div
                      key={index}
                      className="py-4 border-t border-b text-gray-700 dark:text-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                    >
                      <div className="flex items-start gap-6">
                        <img
                          className="w-16 sm:w-20"
                          src={productData.image}
                          alt=""
                        />
                        <div>
                          <p className="text-xs sm:text-lg font-medium">
                            {productData.name}
                          </p>
                          <div className="flex items-center gap-5 mt-2">
                            <p>
                              {currency}
                              {productData.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(item._id, Number(e.target.value))
                        }
                        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                      <FaRegTrashCan
                        size={25}
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end my-20">
                <div className="w-full sm:w-112.5">
                  <CartTotal />
                  <div className="w-full text-end">
                    <button
                      onClick={() => navigate("/place-order")}
                      className="bg-black text-white  dark:bg-white dark:text-black text-sm my-8 px-8 py-3"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-600">
          <p>Please login to view your cart ♡</p>
        </div>
      )}
    </>
  );
};

export default Cart;
