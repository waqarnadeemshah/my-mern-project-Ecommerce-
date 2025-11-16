import React, { useEffect } from "react";
import SlideBar from "../Components/SlideBar";
import { useDispatch, useSelector } from "react-redux";
import { getorders } from "../features/Orderslice";
import { useNavigate } from "react-router-dom";



function Order() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {orders}=useSelector((s)=>s.order)

  useEffect(()=>{
const data =dispatch(getorders()).unwrap()
console.log(data)
  },[dispatch])
  const handledetpage=(id)=>{
    navigate(`/admin/Orderdetail/${id}`)
  }
  return (
    <div>
      <div className="flex">
       <SlideBar/>
        <div className="flex-1 p-6">
        <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
          >
            {/* Left Side: Order Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                Order #{order._id}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Customer:</span>{" "}
                {order.shippingAddress.fullName} ({order.shippingAddress.phone}) {order.shippingAddress.address}
              </p>
            </div>

            {/* Middle: Payment + Status */}
            <div className="mt-4 md:mt-0 flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
              <p
                className={`font-medium ${
                  order.paymentstatus === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.paymentstatus === "paid" ? "Paid ✅" : "Unpaid ❌"}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium text-center w-fit ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Right Side: Total + Button */}
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-lg font-bold text-gray-800">
                Rs {order.totalPrice}
              </p>
              <button onClick={()=>handledetpage(order._id)} className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
