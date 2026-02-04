import React from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../../redux/features/product/productApi";
import useAuth from "../../../hooks/useAuth";
import {
  FaCloudUploadAlt,
  FaBoxOpen,
  FaDollarSign,
  FaTags,
  FaInfoCircle,
} from "react-icons/fa";
import { imageUpload } from "../../../utils";

const AddProducts = () => {
  const [createProduct] = useCreateProductMutation();
  const { users } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "Active",
      category: "Electronics",
      quantity: 0,
      discountPrice: 0,
      featured: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      let uploadedImages = [];

      // 1. Multiple Image Upload Logic (Max 3)
      if (data.imageFiles && data.imageFiles.length > 0) {
        const filesArray = Array.from(data.imageFiles).slice(0, 3);

        // Sob gulo image eksathe upload hobe
        const uploadPromises = filesArray.map((file) => imageUpload(file));
        uploadedImages = await Promise.all(uploadPromises);
      }

      // 2. Data Formatting (Schema onujayi)
      const finalProductData = {
        authorName: users?.displayName || "Admin",
        authorEmail: users?.email || "admin@system.com",
        productName: data.productName,
        description: data.description,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        // Jodi schema string hoy, tobe amra prothom image pathachhi.
        // Jodi [String] hoy, tobe pura array pathaben.
        productImage: uploadedImages[0] || data.productImageUrl || "",
        brand: data.brand,
        category: data.category,
        quantity: Number(data.quantity),
        sku: data.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
        status: data.status,
        featured: data.featured,
        createdAt: new Date(),
      };

      // 3. API Call
      await createProduct(finalProductData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Product Listed",
        text: "Successfully added to inventory!",
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });

      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 text-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic uppercase">
            Add New Listing
          </h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
            <FaBoxOpen className="text-blue-500" /> Inventory System
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-800 shadow-xl">
                <label className="text-sm font-bold text-gray-400 uppercase mb-4 block">
                  Product Images (Max 3)
                </label>
                <div className="relative group border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-8 transition-all bg-[#1e293b]/20 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("imageFiles")}
                  />
                  <FaCloudUploadAlt
                    size={40}
                    className="mx-auto text-gray-600 group-hover:text-blue-400 mb-2"
                  />
                  <p className="text-sm text-gray-400">
                    Click or Drag to upload
                  </p>
                </div>
              </div>

              <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-800 shadow-xl">
                <label className="text-sm font-bold text-gray-400 uppercase mb-4 block">
                  Listing Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#1e293b]/50 text-white p-4 rounded-xl border border-gray-800 outline-none"
                >
                  <option value="Active">🟢 Active</option>
                  <option value="Draft">🟠 Draft</option>
                </select>

                <div className="mt-4 flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
                  <input
                    type="checkbox"
                    {...register("featured")}
                    className="w-5 h-5 rounded accent-blue-500"
                  />
                  <label className="text-sm font-bold text-gray-400">
                    Feature this product
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column (Details) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaInfoCircle className="text-blue-500" /> Basic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Product Name *
                    </label>
                    <input
                      {...register("productName", {
                        required: "Name is required",
                      })}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g. Sony WH-1000XM5"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Brand
                    </label>
                    <input
                      {...register("brand")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none"
                      placeholder="Sony"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Category
                    </label>
                    <select
                      {...register("category")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Audio">Audio</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      SKU Code
                    </label>
                    <input
                      {...register("sku")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none"
                      placeholder="SNY-001"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("quantity")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaDollarSign className="text-emerald-500" /> Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Base Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: true })}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                      Discount Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("discountPrice")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaTags className="text-purple-500" /> Description
                </h3>
                <textarea
                  {...register("description")}
                  rows="4"
                  className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest active:scale-95"
              >
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
