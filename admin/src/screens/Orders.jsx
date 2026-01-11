import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaBoxOpen } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-10 bg-white min-h-screen">
      <h2 className="text-3xl font-light tracking-wide mb-8">Orders</h2>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 text-sm hover:bg-gray-50 transition"
          >
            {/* Items & Customer */}
            <div className="flex gap-4">
              <FaBoxOpen className="m-4 w-15 border" size={50} />

              <div>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                    {item.meta && ` (${item.meta.join(", ")})`}
                  </p>
                ))}

                <p className="mt-3 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-500">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}
                </p>
                <p className="text-gray-500">
                  {order.address.country} — {order.address.zipcode}
                </p>
                <p className="text-gray-500">{order.address.phone}</p>
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-1">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount & Status */}
            <div className="flex flex-col justify-between items-start md:items-end gap-3">
              <p className="text-lg font-medium">
                {currency}
                {order.amount}
              </p>

              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="border px-3 py-2 text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
