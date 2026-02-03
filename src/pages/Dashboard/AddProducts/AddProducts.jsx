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
      createdAt: new Date().toISOString().split("T")[0],
      quantity: 0,
    },
  });

  const onSubmit = async (data) => {
    if (data.imageFile && data.imageFile[0]) {
      data.productImage = await imageUpload(data.imageFile[0]); 
    }

    try {
      await createProduct({
        authorName: users?.displayName,
        authorEmail: users?.email,
        ...data,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Product Listed",
        text: "Your product has been added successfully!",
        showConfirmButton: false,
        timer: 2000,
        background: "#0f172a",
        color: "#fff",
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error adding the product.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 md:px-8 text-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent italic">
              ADD NEW LISTING
            </h1>
            <p className="text-gray-500 mt-2 flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
              <FaBoxOpen className="text-blue-500" /> Inventory Management
              System
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-[#0f172a] px-4 py-2 rounded-lg border border-gray-800">
            Author:{" "}
            <span className="text-blue-400 font-mono">
              {users?.displayName || "Admin"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Image & Status */}
            <div className="space-y-6">
              <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-800 shadow-xl">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 block">
                  Product Image
                </label>

                {/* Image Upload UI (Functionality chara) */}
                <div className="relative group cursor-pointer border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-8 transition-all bg-[#1e293b]/20 text-center">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("imageFile")}
                  />
                  <FaCloudUploadAlt
                    size={40}
                    className="mx-auto text-gray-600 group-hover:text-blue-400 transition-colors mb-2"
                  />
                  <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                    Drag & Drop or{" "}
                    <span className="text-blue-500 font-bold">Browse</span>
                  </p>
                  <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-tighter">
                    JPG, PNG up to 5MB
                  </p>
                </div>

                <div className="mt-6">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                    Or Image URL
                  </label>
                  <input
                    {...register("productImage")}
                    className="w-full bg-[#1e293b]/50 text-white p-3 rounded-xl border border-gray-800 outline-none focus:border-blue-500 text-sm"
                    placeholder="https://image-link.com"
                  />
                </div>
              </div>

              <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-800 shadow-xl">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 block">
                  Availability
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#1e293b]/50 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold"
                >
                  <option value="Active">🟢 Active</option>
                  <option value="Draft">🟠 Draft</option>
                </select>
              </div>
            </div>

            {/* Middle & Right Column: Details */}
            <div className="lg:col-span-2 space-y-6 font-sans">
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaInfoCircle className="text-blue-500" /> Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2 ml-1 tracking-widest">
                      Product Title *
                    </label>
                    <input
                      {...register("productName", {
                        required: "Name is required",
                      })}
                      className={`w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.productName ? "border-red-500" : "border-gray-800"}`}
                      placeholder="e.g. iPhone 15 Pro Max"
                    />
                    {errors.productName && (
                      <p className="text-red-400 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
                        {errors.productName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2 ml-1 tracking-widest">
                      Brand
                    </label>
                    <input
                      {...register("brand")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Apple, Samsung..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2 ml-1 tracking-widest">
                      Category
                    </label>
                    <select
                      {...register("category")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaDollarSign className="text-emerald-500" /> Pricing &
                  Inventory
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">
                      Base Price ($)
                    </label>
                    <input
                      type="number"
                      {...register("price", { required: true })}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">
                      Discount ($)
                    </label>
                    <input
                      type="number"
                      {...register("discountPrice")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("quantity")}
                      className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaTags className="text-purple-500" /> Extra Details
                </h3>
                <textarea
                  {...register("description")}
                  rows="4"
                  className="w-full bg-[#1e293b]/30 text-white p-4 rounded-xl border border-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe the main features, benefits, and specifications..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-900/40 uppercase tracking-[4px] text-lg active:scale-95"
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
