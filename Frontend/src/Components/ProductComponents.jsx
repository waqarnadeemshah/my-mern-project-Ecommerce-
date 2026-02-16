import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { delproduct, getallproduct } from "../features/adminproductslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addtocart } from "../features/cartslice";

function ProductComponents({ products,search }) {
  const dispatch = useDispatch();
  const { productbyCategory } = useSelector((s) => s.category);


  const dataToRender = products || productbyCategory;

  return (
    <div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {dataToRender.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { user } = useSelector((s) => s.auth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product.images]);

  const handleAddToCart = async (productid, size) => {
    try {
      if (!user.id) {
        toast.error("Please login to add items to your cart");
        navigate("/login");
        return;
      }

      const data = {
        userid: user.id,
        productid: productid,
        selectedsize: size,
        quantity: 1,
      };
      await dispatch(addtocart(data)).unwrap();
      toast.success("item has been added");
    } catch (err) {
        console.log("❌ Error object:", err);

        toast.error(err?.msg || err?.error || "Something went wrong");
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

      <Menu as="div" className="relative mt-2">
        <MenuButton className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
          +
        </MenuButton>
        <MenuItems className="absolute left-0 mt-2 w-32 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
          <div className="py-1">
            {product.sizes?.map((sizeObj, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block w-full px-4 py-2 text-sm text-left`}
                    onClick={() => handleAddToCart(product._id, sizeObj.name)}
                  >
                    {sizeObj.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default ProductComponents;
