import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getplaceorderstatus } from "../features/Orderslice";

const PlaceOrderStatus = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { getplaceorders, loading } = useSelector((s) => s.order);

  useEffect(() => {
    if (user?.id) {
      dispatch(getplaceorderstatus(user.id));
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return <p className="text-center py-10">Loading your orders...</p>;
  }

  if (!getplaceorders || getplaceorders.length === 0) {
    return <p className="text-center py-10">No orders found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {/* 🔁 Iterate through all orders */}
      {getplaceorders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg shadow-md mb-6 p-5 bg-white"
        >
          {/* 🧾 Order Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold">
              <span className="text-gray-600">Order ID:</span>{" "}
              {order._id.slice(-6).toUpperCase()}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* 🚚 Shipping Info */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Shipping Information:</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
          </div>

          {/* 🛍️ Items */}
          <div>
            <h3 className="font-semibold mb-2">Order Items:</h3>
            {order.orderItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-gray-200 py-2"
              >
                <div className="flex items-center gap-3">
                  {item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-14 h-14 rounded object-cover border"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.selectedSize} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">Rs. {item.price}</p>
              </div>
            ))}
          </div>

          {/* 💰 Price Summary */}
          <div className="mt-4">
            <p>
              <span className="font-semibold">Items Price:</span> Rs.{" "}
              {order.itemsPrice}
            </p>
            <p>
              <span className="font-semibold">Shipping:</span> Rs.{" "}
              {order.shippingPrice}
            </p>
            <p className="text-lg font-bold mt-1">
              Total: Rs. {order.totalPrice}
            </p>
          </div>

          {/* 🔖 Status */}
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.orderStatus === "Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {order.orderStatus || "Pending"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.paymentstatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.paymentstatus}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceOrderStatus;
