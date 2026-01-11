import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen relative">
      <h2 className="text-3xl font-light tracking-wide mb-8">All Products</h2>

      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border text-sm bg-gray-50 tracking-wide">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Actions</span>
        </div>

        {/* Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-3 px-4 border text-sm hover:bg-gray-50 transition"
          >
            <img
              className="w-18 h-18 object-cover border"
              src={item.image}
              alt=""
            />

            <p className="truncate">{item.name}</p>

            <p className="text-gray-500">{item.category}</p>

            <p className="font-medium">
              {currency}
              {item.price}
            </p>

            <div className="flex justify-center gap-4">
              <Link
                to={`/edit/${item._id}`}
                className="hover:text-blue-600 transition"
                title="Edit"
              >
                <FaPencilAlt size={20} />
              </Link>

              <button
                onClick={() => {
                  setConfirmId(item._id);
                  setShowConfirm(true);
                }}
                className="hover:text-red-600 hover:shadow-2xl transition"
                title="Delete"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-80 border text-center">
            <h3 className="text-lg font-medium mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure this action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeProduct(confirmId);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 bg-black text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
