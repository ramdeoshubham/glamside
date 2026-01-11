import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // ---------------- Constants ----------------
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ---------------- State ----------------
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // ---------------- Cart Actions ----------------

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        toast("Added to your cart", {autoClose:500,pauseOnHover:false,closeOnClick:true})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      } catch (error) {}
    }

    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      try {
        if (itemInfo && cartItems[itemId] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      } catch (error) {}
    }

    return totalAmount;
  };

  // ---------------- API ----------------

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ---------------- Wishlist Actions ----------------

  const addToWishlist = async (itemId) => {
    if (wishlistItems.includes(itemId)) return;

    const newWishlist = [...wishlistItems, itemId];
    setWishlistItems(newWishlist);

    if (token) {
      await axios.post(
        backendUrl + "/api/wishlist/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromWishlist = async (itemId) => {
    const newWishlist = wishlistItems.filter((id) => id !== itemId);
    setWishlistItems(newWishlist);

    if (token) {
      await axios.post(
        backendUrl + "/api/wishlist/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getUserWishlist = async (token) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/wishlist/get",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setWishlistItems(res.data.wishListData || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getWishlistCount = () => wishlistItems.length;

  // ---------------- Effects ----------------

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      getUserCart(storedToken);
      getUserWishlist(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // ---------------- Context Value ----------------

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    getWishlistCount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
