import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../features/cartslice";
import { placeorder } from "../features/Orderslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { cartdata } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const {loading}=useSelector((s)=>s.order)
  const userid = user.id;
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();
  const countryRef = useRef();
  const paymentRef = useRef("COD");
  useEffect(() => {
    if (userid) {
      dispatch(getcart(userid));
    }
  }, [dispatch, userid]);


  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartItems = cartdata?.items || [];
  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.productid.price * item.quantity
  // );
    const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.productid?.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal >= 5000 ? 0 : 50;
  const total = shipping + subtotal;
  const handleplaceorder = async (e) => {
    e.preventDefault();
    const shippingAddress = {
      fullName: fullNameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      postalCode: postalRef.current.value,
      country: countryRef.current.value,
    };
    const paymentMethod = paymentRef.current.value;
    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {

          return toast.error("Please fill all shipping fields");

    
    }
    const data = {
      userid,
      shippingAddress,
      paymentMethod,
    };
    try {
      await dispatch(placeorder(data)).unwrap();
            toast.success("✅ order place successfully");
      navigate(`/placeorderitem/${userid}`)

      e.target.reset();
    } catch (err) {
      toast.error(err?.msg || " Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* LEFT FORM */}
        <div className="p-10">
          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Choose Payment Method
            </h3>
            <select
              ref={paymentRef}
              className="border p-2 rounded-md text-sm w-full"
              defaultValue="COD"
            >
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Credit Card">Credit / Debit Card</option>
            </select>
          </div>

          {/* SHIPPING FORM */}
          <form
            className="space-y-4 transition-all duration-300 ease-in-out"
            onSubmit={handleplaceorder}
          >
            <input
              ref={fullNameRef}
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              ref={phoneRef}
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              ref={addressRef}
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                ref={cityRef}
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                ref={postalRef}
                type="text"
                placeholder="Postal Code"
                className="border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <input
              ref={countryRef}
              type="text"
              placeholder="Country"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-semibold py-3 rounded-md mt-6 transition`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* RIGHT ORDER SUMMARY */}
        <div className="bg-gray-50 p-10 border-l">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Your Order</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.productid?.images?.[0]?.src}
                    alt={item.productid?.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {item.productid?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedsize}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  Rs {item.productid?.price}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs {shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-3 text-base">
              <span>Total</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
