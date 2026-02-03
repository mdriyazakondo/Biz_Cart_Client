import React, { useState } from "react";
import {
  useMyAllProductQuery,
  useProductDeleteMutation,
} from "../../../redux/features/product/productApi";
import { FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateProduct from "./components/UpdateProduct";

const MyProduct = () => {
  const { data, isLoading } = useMyAllProductQuery();
  const [deleteProduct] = useProductDeleteMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your shop!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Product has been removed.",
            icon: "success",
            background: "#0f172a",
            color: "#fff",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
            background: "#0f172a",
            color: "#fff",
          });
        }
      }
    });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="text-white p-10 text-center">Loading Products...</div>
    );

  const products = data || [];

  return (
    <div className="min-h-screen  p-4 md:p-10 text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              My Inventory
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and track your listed products
            </p>
          </div>
          <span className="bg-[#0f172a] border border-gray-800 px-4 py-2 rounded-full text-xs font-mono text-blue-400">
            Total: {products.length} Items
          </span>
        </div>

        {/* Table Container */}
        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e293b]/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-800">
                  <th className="px-6 text-nowrap py-5">Product Details</th>
                  <th className="px-6 text-nowrap py-5">Category & Brand</th>
                  <th className="px-6 text-nowrap py-5">Pricing</th>
                  <th className="px-6 text-nowrap py-5">Stock</th>
                  <th className="px-6 text-nowrap py-5 text-center">Status</th>
                  <th className="px-6 text-nowrap py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-blue-500/5 transition-all group"
                  >
                    {/* Product Name & Image */}
                    <td className="px-6 text-nowrap py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden shrink-0">
                          {product.productImage &&
                          product.productImage.startsWith("http") ? (
                            <img
                              src={product.productImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="max-w-50">
                          <p className="font-semibold text-gray-100 truncate">
                            {product.productName}
                          </p>
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">
                            SKU: {product.sku || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & Brand */}
                    <td className="px-6 text-nowrap py-4">
                      <div className="text-sm">
                        <p className="text-blue-400 font-medium">
                          {product.category}
                        </p>
                        <p className="text-gray-500 text-xs">{product.brand}</p>
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="px-6 text-nowrap py-4">
                      <div className="text-sm">
                        <p className="text-emerald-400 font-bold">
                          ${product.price}
                        </p>
                        {product.discountPrice > 0 && (
                          <p className="text-gray-500 text-[10px] line-through">
                            ${product.discountPrice}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-6 text-nowrap py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${product.quantity > 10 ? "bg-emerald-500" : "bg-red-500"}`}
                        ></div>
                        <span className="text-sm font-medium">
                          {product.quantity}{" "}
                          <span className="text-gray-600 text-[10px]">pcs</span>
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 text-nowrap py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          product.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 text-nowrap py-4">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-400 p-2 hover:bg-blue-500/10 rounded-lg"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product?._id)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UpdateProduct
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyProduct;
