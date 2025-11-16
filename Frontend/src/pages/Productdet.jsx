import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailproduct } from "../features/categoryslice";
import { addtocart } from "../features/cartslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Productdet() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productdetarray, loading } = useSelector((s) => s.category);
  const { user } = useSelector((s) => s.auth);

 
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(detailproduct(id));
    }
  }, [dispatch, id]);

  const productsdet = productdetarray;


  const reviews = { href: "#", average: 4, totalCount: 117 };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-700 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!productsdet) {
    return (
      <div className="p-10 text-center text-gray-700 text-lg">
        No product found.
      </div>
    );
  }

  const highlightsArray = Array.isArray(productsdet?.highlights)
    ? productsdet.highlights
    : productsdet?.highlights
    ? [productsdet.highlights]
    : [];

  const sizesArray = Array.isArray(productsdet?.sizes) ? productsdet.sizes : [];
  const imagesArray = Array.isArray(productsdet?.images)
    ? productsdet.images
    : [];

  
  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!selectedSize) {
      toast.error("⚠️ Please select a size before adding to cart!");
      return;
    }

    if (!user.id) {
      toast.error("Please log in to add items to your cart!");
      return;
    }

    const Data = {
      userid: user.id,

      productid: productsdet._id,
      selectedsize: selectedSize,
      quantity: 1,
    };
    try {
   await dispatch(addtocart(Data)).unwrap()
    } catch(err) {
      toast.error(err?.msg||" Failed to add item to cart!");
    }
  };

  return (
    <div>
      
      <div className="bg-white">
        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="items">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li key={productsdet?._id}>
                <div className="flex items-center">
                  <a
                    href={productsdet?.href || "#"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {productsdet?.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  href={productsdet?.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productsdet?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {imagesArray.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`relative w-full ${
                  i === 0
                    ? "row-span-2 aspect-[3/4]"
                    : i === 1
                    ? "col-start-2 aspect-[3/2]"
                    : i === 2
                    ? "col-start-2 row-start-2 aspect-[3/2]"
                    : "row-span-2 aspect-[4/5] lg:aspect-[3/4]"
                }`}
              >
                <img
                  alt={img?.alt || productsdet?.name}
                  src={img?.src}
                  className="h-full w-full rounded-lg object-contain bg-white"
                />
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productsdet?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Rs {productsdet?.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              {/* Sizes + Add to Cart */}
              <form className="mt-10" onSubmit={handleAddToCart}>
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      {sizesArray.map((size, index) => (
                        <label
                          key={index}
                          aria-label={size?.name || size}
                          className={`group relative flex items-center justify-center rounded-md border p-3 cursor-pointer ${
                            selectedSize === (size?.name || size)
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "border-gray-300 bg-white text-gray-900"
                          }`}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size?.name || size}
                            className="hidden"
                            onChange={(e) => setSelectedSize(e.target.value)}
                          />
                          <span className="text-sm font-medium uppercase">
                            {size?.name || size}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Add to bag
                </button>
              </form>
            </div>

            {/* Description and details */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productsdet?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlightsArray.map((highlight, i) => (
                      <li key={i} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {productsdet?.details}
                  </p>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productdet;
