"use client";

import ShopContextProvider from "../context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
  return (
    <ShopContextProvider>
      <ToastContainer />
      {children}
    </ShopContextProvider>
  );
}
