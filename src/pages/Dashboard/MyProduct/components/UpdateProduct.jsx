import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaSave, FaCloudUploadAlt, FaSync } from "react-icons/fa";
import Swal from "sweetalert2";
import { useProductUpdateMutation } from "../../../../redux/features/product/productApi";
import { imageUpload } from "../../../../utils";

const UpdateProduct = ({ product, isOpen, onClose }) => {
  const [updateProduct] = useProductUpdateMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm();


  useEffect(() => {
    if (product) {
      reset({
        productName: product?.productName,
        brand: product?.brand,
        price: product?.price,
        discountPrice: product?.discountPrice,
        quantity: product?.quantity,
        description: product?.description,
        category: product?.category,
        status: product?.status,
      });
      setImagePreview(product?.productImage);
    }
  }, [product, reset]);

  const handleUpdateSubmit = async (data) => {
    try {
      let finalImageUrl = product?.productImage;

      // Jodi notun image select kora hoy
      if (data.imageFile && data.imageFile[0]) {
        finalImageUrl = await imageUpload(data.imageFile[0]);
      }

      const updatedData = {
        productName: data.productName,
        brand: data.brand,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        quantity: Number(data.quantity),
        description: data.description,
        category: data.category,
        status: data.status,
        productImage: finalImageUrl,
      };
      await updateProduct({
        productId: product?._id,
        product: updatedData,
      }).unwrap();

      Swal.fire({
        title: "Updated!",
        text: "Product details have been updated successfully.",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#0f172a] w-full max-w-2xl my-auto rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaSync className="text-blue-500" size={18} /> Update Inventory
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateSubmit)}
          className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar"
        >
          {/* Image Upload Area */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-3xl p-6 bg-[#1e293b]/20 group hover:border-blue-500/50 transition-all relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-32 h-32 object-cover rounded-2xl border-2 border-blue-500 shadow-lg"
                alt="Preview"
              />
            ) : (
              <FaCloudUploadAlt
                size={40}
                className="text-gray-600 group-hover:text-blue-500"
              />
            )}
            <input
              type="file"
              {...register("imageFile")}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            <p className="mt-3 text-[11px] text-gray-500">
              Click to change product image
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Product Name
              </label>
              <input
                {...register("productName")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Brand Name
              </label>
              <input
                {...register("brand")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-white outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Price ($)
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-emerald-400 font-bold outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                {...register("discountPrice")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-orange-400 font-bold outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Stock Qty
              </label>
              <input
                type="number"
                {...register("quantity")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-3.5 text-white outline-none"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-gray-300 font-bold py-4 rounded-2xl hover:bg-gray-700 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FaSave /> Update Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
