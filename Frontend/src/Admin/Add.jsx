import React, { useRef, useState } from "react";
import SlideBar from "../Components/SlideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createproduct,
  getallproduct,
  updateproduct,
} from "../features/adminproductslice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Add() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((s) => s.adminproductslice);
  const [updatemode, setupdatemode] = useState(false);
  const [editproduct, seteditproduct] = useState();

  // Refs
  const nameRef = useRef();
  const mainCatRef = useRef();
  const subCatRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const highlightsRef = useRef();
  const detailsRef = useRef();

  const sizeRefs = {
    S: useRef(),
    M: useRef(),
    L: useRef(),
    XL: useRef(),
  };

  //  Image state
  const [selectedImages, setSelectedImages] = useState([]);

  //  Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = [...selectedImages, ...files].slice(0, 5); // max 5 images
    setSelectedImages(total);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (id) {
      setupdatemode(true);
      if (products.length === 0) {
        dispatch(getallproduct());
      } else {
        const productfound = products.find((p) => p._id === id);
        if (productfound) seteditproduct(productfound);
      }
    }
  }, [id, products, dispatch]);
  useEffect(() => {
    if (editproduct) {
      (nameRef.current.value = editproduct.name || ""),
        (mainCatRef.current.value = editproduct.mainCategory || ""),
        (subCatRef.current.value = editproduct.subCategory || ""),
        (priceRef.current.value = editproduct.price || " "),
        (descRef.current.value = editproduct.description || ""),
        (highlightsRef.current.value = editproduct.highlights || ""),
        (detailsRef.current.value = editproduct.details || "");
      if (editproduct.sizes) {
        editproduct.sizes.forEach((v) => {
          if (sizeRefs[v.name]) {
            sizeRefs[v.name].current.value = v.stock;
          }
        });
      }
      setSelectedImages(editproduct.images || []);
    }
  }, [editproduct]);

  // 🧾 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = new FormData();
    Data.append("name", nameRef.current.value);
    Data.append("mainCategory", mainCatRef.current.value);
    Data.append("subCategory", subCatRef.current.value);
    Data.append("price", priceRef.current.value);
    Data.append("description", descRef.current.value);
    Data.append("highlights", highlightsRef.current.value);
    Data.append("details", detailsRef.current.value);

    //  Corrected sizes (use `name` not `size`)
    const sizes = [
      { name: "S", stock: Number(sizeRefs.S.current.value) || 0 },
      { name: "M", stock: Number(sizeRefs.M.current.value) || 0 },
      { name: "L", stock: Number(sizeRefs.L.current.value) || 0 },
      { name: "XL", stock: Number(sizeRefs.XL.current.value) || 0 },
    ];
    Data.append("sizes", JSON.stringify(sizes));

    selectedImages.forEach((file) => {
      Data.append("images", file);
    });
    try {
      if (updatemode) {
        await dispatch(updateproduct({ id, Data }));
        toast.success("Update Product added successfully!");
        nameRef.current.value = "";
        mainCatRef.current.value = "";
        subCatRef.current.value = "";
        priceRef.current.value = "";
        descRef.current.value = "";
        highlightsRef.current.value = "";
        detailsRef.current.value = "";
        Object.keys(sizeRefs).forEach(
          (key) => (sizeRefs[key].current.value = "")
        );
        setSelectedImages([]);
      } else {
        await dispatch(createproduct(Data)).unwrap();
        toast.success(" Product added successfully!");

        // 🧹 Reset all fields
        nameRef.current.value = "";
        mainCatRef.current.value = "";
        subCatRef.current.value = "";
        priceRef.current.value = "";
        descRef.current.value = "";
        highlightsRef.current.value = "";
        detailsRef.current.value = "";
        Object.keys(sizeRefs).forEach(
          (key) => (sizeRefs[key].current.value = "")
        );
        setSelectedImages([]);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.msg || " Failed to product");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <SlideBar />
      </div>

      {/* Main Content */}

      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="border-b px-6 sm:px-8 py-4 sm:py-6 bg-gray-50">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {updatemode ? "Update a product" : "➕ Add New Product"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Fill in the details below to add a new product
              </p>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Product Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Enter product name"
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Main Category ID
                    </label>
                    <input
                      ref={mainCatRef}
                      type="text"
                      placeholder="Enter main category ID"
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Sub Category
                    </label>
                    <input
                      ref={subCatRef}
                      type="text"
                      placeholder="Enter sub category"
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      ref={priceRef}
                      type="number"
                      placeholder="Enter price"
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3">
                    Sizes & Stock
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {["S", "M", "L", "XL"].map((size) => (
                      <div
                        key={size}
                        className="p-4 border rounded-xl hover:shadow-sm transition"
                      >
                        <label className="block font-medium text-gray-600 mb-2">
                          {size} Size Stock
                        </label>
                        <input
                          ref={sizeRefs[size]}
                          type="number"
                          min="0"
                          placeholder="Stock qty"
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black/70 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

             
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Upload Images (Max 5)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                    {selectedImages.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square border rounded-xl overflow-hidden"
                      >
                        <img
                          src={
                            file instanceof File
                              ? URL.createObjectURL(file)
                              : file.src || file.url
                          }
                          alt={`preview-${index}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
               
                  </div>

                  {selectedImages.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Upload product images (jpg, png, webp)
                    </p>
                  )}
                </div>

                {/* Text Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      ref={descRef}
                      placeholder="Enter product description"
                      rows={4}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Highlights
                    </label>
                    <textarea
                      ref={highlightsRef}
                      placeholder="Enter product highlights"
                      rows={4}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Details
                  </label>
                  <textarea
                    ref={detailsRef}
                    placeholder="Enter product details"
                    rows={5}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/70 focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white w-full sm:w-auto px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                  >
                    {updatemode ? "Update" : "➕ Add "}
                  </button>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />

                {error && (
                  <div className="text-red-600 mt-2">
                    {error.msg || error.error || JSON.stringify(error)}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Add;
