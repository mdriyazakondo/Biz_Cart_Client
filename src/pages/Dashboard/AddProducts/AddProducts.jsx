import React from "react";
import { useForm } from "react-hook-form";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      quantity: 0,
    },
  });

  const onSubmit = (data) => {
    console.log("Biz-Cart Data (Dark Mode):", data);
    alert("Product listed successfully in Dark Mode!");
    reset();
  };

  return (
    <div className="min-h-screen  py-10 px-5">
      {" "}
      {/* Deep Black/Navy background */}
      <div className="max-w-5xl mx-auto bg-[#0f172a] shadow-2xl rounded-3xl border border-gray-800 p-8 md:p-12">
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Add New Product
          </h2>
          <p className="text-gray-400 mt-2">
            Create a new listing for the Biz-Cart marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                {...register("productName", { required: "Name is required" })}
                className={`w-full bg-[#0f172a] text-white p-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.productName ? "border-red-500" : "border-gray-700"}`}
                placeholder="Enter product title..."
              />
              {errors.productName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Image URL & Brand */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Product Image URL
              </label>
              <input
                {...register("productImage")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Brand
              </label>
              <input
                {...register("brand")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Biz-Cart Exclusive"
              />
            </div>

            {/* Price & Discount */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                {...register("discountPrice")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Category & Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option className="bg-[#1e293b]" value="Electronics">
                  Electronics
                </option>
                <option className="bg-[#1e293b]" value="Fashion">
                  Fashion
                </option>
                <option className="bg-[#1e293b]" value="Accessories">
                  Accessories
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                {...register("quantity")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* SKU & Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                SKU
              </label>
              <input
                {...register("sku")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SKU-88-001"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option className="bg-[#1e293b]" value="Active">
                  Active
                </option>
                <option className="bg-[#1e293b]" value="Draft">
                  Draft
                </option>
              </select>
            </div>

            {/* Tags & Created Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tags
              </label>
              <input
                {...register("tags")}
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="sale, new, apple"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Created At
              </label>
              <input
                type="date"
                {...register("createdAt")}
                className="w-full bg-[#0f172a] text-gray-400 p-4 rounded-xl border border-gray-700 outline-none cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows="4"
                className="w-full bg-[#0f172a] text-white p-4 rounded-xl border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell customers more about this product..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-blue-900/20"
            >
              Confirm & Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
