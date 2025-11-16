import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaTruck,
  FaBoxOpen,
  FaRegClock,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getoneorder, updateorderstatus } from "../features/Orderslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ViewOneOrder() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewoneorder, loading } = useSelector((s) => s.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getoneorder(id));
  }, [dispatch, id]);

  const orderData = Array.isArray(viewoneorder)
    ? viewoneorder[0]
    : viewoneorder;

  const [orderStatus, setOrderStatus] = useState(
    orderData?.orderStatus || "Pending"
  );
  const [paymentstatus, setPaymentstatus] = useState(
    orderData?.paymentstatus || "unpaid"
  );
  const [editMode, setEditMode] = useState(false);
  const handleupdatestatus = async (e,id) => {
setEditMode(true)
      e.preventDefault();
   if (!editMode) {
    setEditMode(true);
    return;
  }
  
    const Data = {
      orderStatus,
      paymentstatus,
    };
    try {
     await  dispatch(updateorderstatus({ id, Data })).unwrap();
      toast.success(" Order status Update successfully!");
       
    setEditMode(false);
    } catch (err) {
      toast.error(err?.msg || "❌ Failed to product");
    }
  };
  const handleget=(id)=>{
    navigate(`/admin/productdetail/${id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-700">
        Loading order details...
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-700">
        No order found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaBoxOpen /> Order Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition"
          >
            <RiArrowGoBackLine /> Back
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="col-span-1 space-y-6">
            {/* Customer Info */}
            <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <FaUser className="text-indigo-600" /> Customer Info
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span>{" "}
                {orderData?.user?.name || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {orderData?.user?.email || "N/A"}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <FaMapMarkerAlt className="text-indigo-600" /> Shipping Address
              </h3>
              <p className="text-gray-700">
                {orderData?.shippingAddress?.fullName || "N/A"}
              </p>
              <p className="text-gray-700">
                {orderData?.shippingAddress?.address || "N/A"}
              </p>
              <p className="text-gray-700">
                {orderData?.shippingAddress?.city || "N/A"},{" "}
                {orderData?.shippingAddress?.country || "N/A"}
              </p>
              <p className="text-gray-700">
                Postal Code: {orderData?.shippingAddress?.postalCode || "N/A"}
              </p>
              <p className="text-gray-700 flex items-center gap-2 mt-2">
                <FaPhone className="text-indigo-600" />{" "}
                {orderData?.shippingAddress?.phone || "N/A"}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <MdPayments className="text-indigo-600" /> Payment Info
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Method:</span>{" "}
                {orderData?.paymentMethod || "N/A"}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Status:</span>{" "}
                {paymentstatus.charAt(0).toUpperCase() + paymentstatus.slice(1)}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-2 space-y-6">
            {/* Ordered Items */}
            <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <FaTruck className="text-indigo-600" /> Ordered Items
              </h3>
              <div className="divide-y">
                {orderData?.orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image?.url || item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                      />
                      <div>
                      
                        <p
  onClick={() => handleget(item.product?._id)}
  className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors duration-200 underline-offset-2 hover:underline"
>
  {item.name} ({item.product?._id})
</p>
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-indigo-600">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + Update Section */}
            <div className="bg-white border rounded-xl shadow-sm p-5 space-y-4 hover:shadow-md transition">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <FaRegClock className="text-indigo-600" /> Order Summary
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                <div>
                  <p className="text-sm">Items Price</p>
                  <p className="font-medium">${orderData.itemsPrice}</p>
                </div>
                <div>
                  <p className="text-sm">Shipping</p>
                  <p className="font-medium">${orderData.shippingPrice}</p>
                </div>
                <div>
                  <p className="text-sm">Total</p>
                  <p className="font-semibold text-indigo-600">
                    ${orderData.totalPrice}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mt-3">
                <span className="font-medium">Order Status:</span> {orderStatus}
              </p>
              {/* Update Panel (Radio Buttons — manually written, no map used) */}
              {editMode && (
                <div className="mt-5 border-t pt-4">
                  {/* Order Status Radio */}
                  <div>
                    <p className="font-medium text-gray-800 mb-2">
                      Update Order Status:
                    </p>
                    <div className="flex flex-wrap gap-3 text-gray-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="orderStatus"
                          value="Pending"
                          checked={orderStatus === "Pending"}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Pending
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="orderStatus"
                          value="Processing"
                          checked={orderStatus === "Processing"}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Processing
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="orderStatus"
                          value="Shipped"
                          checked={orderStatus === "Shipped"}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Shipped
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="orderStatus"
                          value="Delivered"
                          checked={orderStatus === "Delivered"}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Delivered
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="orderStatus"
                          value="Cancelled"
                          checked={orderStatus === "Cancelled"}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Cancelled
                      </label>
                    </div>
                  </div>

                  {/* Payment Status Radio */}
                  <div className="mt-4">
                    <p className="font-medium text-gray-800 mb-2">
                      Update Payment Status:
                    </p>
                    <div className="flex gap-4 text-gray-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentStatus"
                          value="paid"
                          checked={paymentstatus === "paid"}
                          onChange={(e) => setPaymentstatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Paid
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentStatus"
                          value="unpaid"
                          checked={paymentstatus === "unpaid"}
                          onChange={(e) => setPaymentstatus(e.target.value)}
                          className="accent-indigo-600"
                        />
                        Unpaid
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={(e) => handleupdatestatus(e,orderData._id)}
                  className={`mt-4 px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                    editMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {editMode ? "Close Update Panel" : "Update Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
            <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default ViewOneOrder;
