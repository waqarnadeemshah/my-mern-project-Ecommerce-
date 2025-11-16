import React, { useEffect, useState } from "react";
import image from '../assets/elegant-dress-jumper-trousers-other-fashion-outfit-pastel-beige-color-spring-cleaning-home-wardrobe-copy-space-summer-women-s-169745122.webp'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";

import ProductComponents from "../Components/ProductComponents";
import { fetchallproduct } from "../features/categoryslice";

function Homepage() {
  const { product } = useSelector((s) => s.category);
  const dispatch = useDispatch();
  const [newArrivalsmen, setnewArrivalsmen] = useState([]);
  const [newArrivalswomen, setnewArrivalswomen] = useState([]);


  useEffect(() => {
    dispatch(fetchallproduct());
  }, [dispatch]);
  useEffect(() => {
    if (product.length > 0) {
      const menid = "68c018ed414d4b74e0cfddeb";
      const womenid = "68e2543c1039441b44ca9f43";
      const Arrivalsmen = product
        .filter((item) => item.mainCategory === menid)
        .slice(0, 8);
      const Arrivalswomen = product
        .filter((item) => item.mainCategory === womenid)
        .slice(0, 8);
      setnewArrivalsmen(Arrivalsmen);
      setnewArrivalswomen(Arrivalswomen);
    }
  }, [product]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Right Image */}
          <div className="flex justify-center order-1 lg:order-2">
            <img
              className="w-full max-w-sm sm:max-w-md rounded-xl shadow-lg"
              src={image}
              alt="Clothing banner"
            />
          </div>

          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
              Upgrade Your Wardrobe
            </h1>

            <p className="hidden lg:block text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
              Explore our latest collection of modern and premium clothing,
              crafted for comfort and designed for style. Perfect for every
              season.
            </p>

       
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            New Arrivals in men
          </h2>
          <div className="flex-1 border-t border-gray-400 ml-3"></div>
          <ProductComponents products={newArrivalsmen} />
        </div>
      </section>
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            New Arrivals <span>in women</span>
          </h2>
          <div className="flex-1 border-t border-gray-400 ml-3"></div>
          <ProductComponents products={newArrivalswomen} />
        </div>
      </section>
    </div>
  );
}

export default Homepage;
