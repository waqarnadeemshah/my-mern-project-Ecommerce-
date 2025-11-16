import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";

function SlideBar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const handleLogout = async(e) => {
    e.preventDefault();
await dispatch(logout()).unwrap();

    navigate("/login");
  };
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-white shadow hover:bg-gray-50"
        >
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 shadow-sm h-screen">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">ADMIN</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to={"/admin/add-product"}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <PlusIcon className="h-5 w-5 mr-3 text-gray-400" />
            Add List
          </Link>
          <Link
            to={"/admin/list"}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <ListBulletIcon className="h-5 w-5 mr-3 text-gray-400" />
            List Item
          </Link>
          <Link
            to={"/admin/Order"}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-3 text-gray-400" />
            Order
          </Link>
        </nav>

        {/* Logout at bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar (Mobile Drawer) */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="relative flex flex-col w-64 bg-white border-r border-gray-200 shadow-xl h-full">
            {/* Logo + Close */}
            <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
              <span className="text-lg font-bold text-indigo-600">MyApp</span>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                to={"/admin/add-product"}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                <PlusIcon className="h-5 w-5 mr-3 text-gray-400" />
                Add List
              </Link>
              <Link
                to={"/admin/list"}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                <ListBulletIcon className="h-5 w-5 mr-3 text-gray-400" />
                List Item
              </Link>
              <Link
                to={"/admin/Order"}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-3 text-gray-400" />
                Order
              </Link>
            </nav>

            {/* Logout at bottom (Mobile) */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
              {loading?"logout-out....":"logout"}
              </button>
            </div>
          </div>
           {error && error.msg && (
          <p className="mt-4 text-center text-sm text-red-500">{error.msg}</p>
        )}

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default SlideBar;
