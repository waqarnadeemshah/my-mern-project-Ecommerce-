import React from "react";
import SlideBar from "../Components/SlideBar";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmonthlyrevenue, getrecord, totalsales } from "../features/adminproductslice";
import { useState } from "react";

function Sales() {
  const [month,setmonth]=useState('')
  const { totalsalerevence, getsalesrecord,monthlyrevence,countdelivered } = useSelector(
    (s) => s.adminproductslice,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalsales()).unwrap();
  }, [dispatch]);
  useEffect(() => {
    dispatch(getrecord())
  }, [dispatch]);
  useEffect(()=>{
    console.log(month)
    dispatch(getmonthlyrevenue(month));

  },[month,dispatch])
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-full md:w-64">
        <SlideBar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 min-h-full">
          {/* PAGE TITLE */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
            Sales Dashboard
          </h1>

          {/* MONTH FILTER */}
          <div className="border rounded-xl shadow-sm p-5 mb-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <FaCalendarAlt className="text-indigo-600" />
              Monthly Sales
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month, index) => (
                <button
           
                onClick={(e)=>setmonth(index+1)}
                  key={index}
                  className="px-4 py-2 rounded-lg border text-sm font-medium
                  text-gray-700 hover:bg-black hover:text-white transition"
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="border rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">total Revenue</p>
                  {totalsalerevence.map((v, i) => {
                    return (
                      <h3 key={i} className="text-xl sm:text-2xl font-bold">
                        {v.totalsale}
                      </h3>
                    );
                  })}
                </div>
                <FaMoneyBillWave className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="border rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <h3 className="text-xl sm:text-2xl font-bold">{countdelivered}</h3>
                </div>
                <FaShoppingCart className="text-3xl text-indigo-600" />
              </div>
            </div>

            <div className="border rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Customers</p>
                  <h3 className="text-xl sm:text-2xl font-bold">95</h3>
                </div>
                <FaUsers className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="border rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revence</p>
                  <h3 className="text-xl sm:text-2xl font-bold">Rs {monthlyrevence}</h3>
                </div>
                <FaChartLine className="text-3xl text-pink-600" />
              </div>
            </div>
          </div>

          {/* SALES TABLE */}
          <div className="border rounded-2xl shadow-sm p-5 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sales Records
            </h3>

            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {getsalesrecord.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{v._id}</td>
                    <td className="py-3 px-4">{v.user.name}</td>
                    <td className="py-3 px-4">{v.createdAt}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {v.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      Rs {v.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
