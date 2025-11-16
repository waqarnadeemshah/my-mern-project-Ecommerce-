import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { delproduct, getallproduct } from "../features/adminproductslice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminProductlist() {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.adminproductslice);

  
  useEffect(() => {
    dispatch(getallproduct());
  }, [dispatch]);

  return (
    <div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}  />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product.images]);

  const handleUpdate = (id) => {
    navigate(`/admin/add-product/${id}`);
  };
   const handleget = (id) => {
    navigate(`/admin/productdetail/${id}`);
  };

  const handleDelete = async (id) => {
    try {

      await dispatch(delproduct(id)).unwrap(); 
      toast.success("✅ Product deleted successfully");
      await dispatch(getallproduct());
    } catch (err) {
      toast.error(err?.msg || "❌ Failed to delete product");
    }
  };



  return (
    <div className="group relative">
      <Link to={`/productdet/${product._id}`}>
        <img
          alt={product.images[currentIndex]?.alt || product.name}
          src={product.images[currentIndex]?.src}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.subCategory}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </Link>

     
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => handleUpdate(product._id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
              <button
            onClick={() => handleget(product._id)}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-red-600"
          >
            Detail
          </button>
        </div>
    
    </div>
  );
}

export default AdminProductlist;
