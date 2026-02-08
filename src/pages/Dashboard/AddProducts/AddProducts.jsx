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
import LoadingSpinner from "../../../components/LogdingSpnner/LoadingSpnner";

const AddProducts = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { users } = useAuth();

  const categories = ["Electronics", "Smartphones", "Laptops", "SmartWatch"];

  const { register, handleSubmit, reset } = useForm({
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

      if (data.imageFiles?.length > 0) {
        const filesArray = Array.from(data.imageFiles).slice(0, 3);
        uploadedImages = await Promise.all(
          filesArray.map((file) => imageUpload(file)),
        );
      }

      const finalProductData = {
        authorName: users?.displayName || "Admin",
        authorEmail: users?.email || "admin@system.com",
        productName: data.productName,
        description: data.description,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        productImage: uploadedImages[0] || "",
        brand: data.brand,
        category: data.category,
        quantity: Number(data.quantity),
        sku: data.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
        status: data.status,
        featured: data.featured,
        createdAt: new Date(),
      };

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 text-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic uppercase">
            Add New Listing
          </h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
            <FaBoxOpen className="text-blue-500" /> Inventory System
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-800 shadow-xl">
                <label className="text-sm font-bold text-gray-400 uppercase mb-4 block">
                  Product Images (Max 3)
                </label>
                <div className="relative group border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("imageFiles")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FaCloudUploadAlt className="mx-auto text-4xl text-gray-600 group-hover:text-blue-400 mb-2" />
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
                  className="w-full bg-[#1e293b]/50 text-white p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">🟢 Active</option>
                  <option value="Draft">🟠 Draft</option>
                </select>

                <div className="mt-4 flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
                  <input
                    type="checkbox"
                    {...register("featured")}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <label className="text-sm font-bold text-gray-400">
                    Feature this product
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* BASIC DETAILS */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaInfoCircle className="text-blue-500" /> Basic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register("productName", { required: true })}
                    placeholder="Product Name"
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                  />

                  <input
                    {...register("brand")}
                    placeholder="Brand"
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                  />

                  <select
                    {...register("category", { required: true })}
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500 text-gray-300"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0f172a]">
                        {cat}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    {...register("quantity")}
                    placeholder="Quantity"
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* PRICING */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaDollarSign className="text-emerald-500" /> Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price"
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    {...register("discountPrice")}
                    placeholder="Discount Price"
                    className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaTags className="text-purple-500" /> Description
                </h3>
                <textarea
                  {...register("description")}
                  rows="4"
                  placeholder="Tell something about the product..."
                  className="w-full bg-[#1e293b]/30 p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
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
