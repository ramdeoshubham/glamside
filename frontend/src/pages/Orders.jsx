import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      {token ? (orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center">
            <p>You don't have any previous order, please order Something first.</p>
          </div>
        ) :
        <div className="border-t pt-16">
          <div className="text-2xl">
            <h3 className="text-2xl mb-7">MY ORDERS</h3>
          </div>

          <div>
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 dark:text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:w-20" src={item.image} alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700 dark:text-gray-200">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Tags: {item.meta[0]}</p>
                    </div>
                    <p className="mt-1">
                      Date: <span>{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="mt-1">
                      Payment: <span>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-600">
          <p>Please login to view your orders ♡</p>
        </div>
      )}
    </>
  );
};

export default Orders;
