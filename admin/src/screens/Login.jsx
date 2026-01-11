import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { IoMdRose } from "react-icons/io";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md border p-10 bg-white shadow-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <IoMdRose size={40} className="mb-2 text-black hover:text-pink-800" />
          <h1 className="text-3xl font-light tracking-wide">GlamSide Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to continue</p>
        </div>

        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-600">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 border focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-600">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border focus:outline-none focus:border-black transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white hover:bg-gray-900 transition tracking-wide"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
