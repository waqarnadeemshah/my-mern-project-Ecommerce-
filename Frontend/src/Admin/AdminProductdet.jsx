import React, { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { admingetoneproduct } from "../features/adminproductslice";


function AdminProductdet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productdetarr, loading } = useSelector((s) => s.adminproductslice);

  useEffect(() => {
    if (id) {
      dispatch(admingetoneproduct(id));
    }
  }, [dispatch, id]);

  const product = productdetarr;
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

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-700 text-lg">
        No product found.
      </div>
    );
  }

  const highlightsArray = Array.isArray(product?.highlights)
    ? product.highlights
    : product?.highlights
    ? [product.highlights]
    : [];

  const sizesArray = Array.isArray(product?.sizes) ? product.sizes : [];
  const imagesArray = Array.isArray(product?.images) ? product.images : [];

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
              <li key={product?._id}>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {product?.name}
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
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image Gallery */}
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
                  alt={img?.alt || product?.name}
                  src={img?.src}
                  className="h-full w-full rounded-lg object-contain bg-white"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.name}
              </h1>
            </div>

            {/* Right Side Info */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Rs {product?.price}
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
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              {/* Sizes (Display only) */}
              {sizesArray.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Available Sizes
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {sizesArray.map((size, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-gray-300 bg-white p-3 text-sm font-medium text-gray-900 flex justify-between"
                      >
                        <span>{size.name}</span>
                        <span className="text-gray-500 text-xs">
                          Stock: {size.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description and Details */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
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
                  <p className="text-sm text-gray-600">{product?.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductdet;
