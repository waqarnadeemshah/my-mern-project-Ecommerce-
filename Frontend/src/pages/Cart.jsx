import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementquantity,
  getcart,
  incrementquantity,
  removeitem,
} from "../features/cartslice";

function Cart() {
  const dispatch = useDispatch();
  const { cartdata, loading } = useSelector((store) => store.cart);
  const { user } = useSelector((s) => s.auth);

  const userid = user.id;

  useEffect(() => {
    if (userid) {
      dispatch(getcart(userid));
    }
  }, [userid, dispatch]);

  const cartItems = cartdata?.items || [];

  const handleIncrement = async (productid, selectedsize) => {
    const data = {
      productid,
      selectedsize,
      userid,
    };
    await dispatch(incrementquantity(data));
    await dispatch(getcart(userid));
  };

  const handleDecrement = async (productid, selectedsize) => {
    const data = {
      productid,
      selectedsize,
      userid,
    };
    await dispatch(decrementquantity(data));
    await dispatch(getcart(userid));
  };

  const handleRemove = async (productid, selectedsize) => {
    const data = {
      productid,
      selectedsize,
      userid,
    };
    await dispatch(removeitem(data));
    await dispatch(getcart(userid));
  };

  // 🧮 Price calculations
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.productid?.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal>=5000 ? 0: 50;
  const tax = cartItems.length > 0 ? 8.32 : 0;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          // 🛒 Empty Cart
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.45h12.9M7 13l1.35-2.7A1 1 0 019.25 10h5.5a1 1 0 01.9.55L17 13m-5 8a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            <h1 className="text-xl font-semibold text-gray-400 mb-2">
              Your cart is empty
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>
            <Link
              to="/"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          //  Cart Items + Summary
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SUMMARY */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>Rs {subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping estimate</dt>
                    <dd>Rs {shipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Tax estimate</dt>
                    <dd>Rs {tax.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 border-t pt-2 text-base">
                    <dt>Total</dt>
                    <dd>Rs {total.toFixed(2)}</dd>
                  </div>
                </dl>
                <Link to={"/checkout"}>
                  <button className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>

            {/* ITEMS */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100"
                  >
                    <img
                      src={item.productid?.images?.[0]?.src}
                      alt={item.productid?.images?.[0]?.alt}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.productid?.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {item.selectedsize}
                        </p>
                        <p className="text-base font-medium text-gray-900 mt-1">
                          Rs {item.productid?.price}
                        </p>

                        {/* ✅ Quantity Section */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded-full flex items-center justify-center transition"
                            onClick={() =>
                              handleDecrement(
                                item.productid._id,
                                item.selectedsize
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>

                          <span className="text-gray-700 font-medium">
                            {item.quantity}
                          </span>

                          <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center transition"
                            onClick={() =>
                              handleIncrement(
                                item.productid._id,
                                item.selectedsize
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* ✅ Highlights */}
                        <p className="mt-2 text-sm text-gray-500">
                          {item.productid?.highlights}
                        </p>
                      </div>

                      {/* ✅ Remove Button */}
                      <div className="mt-4 sm:mt-0 sm:ml-4 flex justify-end sm:block">
                        <button
                          className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition"
                          onClick={() =>
                            handleRemove(item.productid._id, item.selectedsize)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m5 0H6"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
