import React from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import {
  useDecrementAddToCartMutation,
  useDeleteAddToCartMutation,
  useGetAllAddToCartQuery,
  useIncrementAddToCartMutation,
} from "../../redux/features/addToCart/addToCartApi";
import { Link } from "react-router";
import Swal from "sweetalert2";
const AddToCart = () => {
  const { users } = useAuth();
  const [incrementAddToCart] = useIncrementAddToCartMutation();
  const [decrementAddToCart] = useDecrementAddToCartMutation();
  const [deleteAddToCart] = useDeleteAddToCartMutation();
  const { data: cartResponse, isLoading } = useGetAllAddToCartQuery(
    users?.email,
  );

  const handleIncrement = async (incrementId) => {
    await incrementAddToCart(incrementId);
  };
  const handleDecrement = async (incrementId) => {
    await decrementAddToCart(incrementId);
  };

  const handleDeleteAddToCart = async (wishlistId) => {
    // 1. Confirmation Alert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#fff",
      iconColor: "#f59e0b",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Removing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          background: "#0f172a",
          color: "#fff",
        });

        await deleteAddToCart(wishlistId).unwrap();

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Item has been removed from your wishlist.",
          timer: 2000,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#fff",
          iconColor: "#10b981",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error?.data?.message || "Failed to delete the item.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  const cartItems = cartResponse?.AddToCart || [];
  const subtotal = cartResponse?.totalPrice || 0;

  // Static calculations
  const shipping = cartItems.length > 0 ? 15.0 : 0;
  const tax = subtotal * 0.05; // 5% Tax
  const totalAmount = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-blue-500 animate-spin" size={48} />
          <p className="text-gray-500 font-bold tracking-widest animate-pulse uppercase">
            Syncing Bag...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 py-12 px-4 md:px-8 mt-5">
      <div className="max-w-360 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-800 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
              <ShoppingBag className="text-blue-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                Shopping Cart
              </h1>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                {cartResponse?.count || 0} Products in your bag
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="text-gray-400 hover:text-blue-400 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Table (Left Column) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0f172a] rounded-4xl border border-gray-800 overflow-hidden shadow-2xl">
              {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 bg-[#1e293b]/30">
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                          Product Details
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Quantity
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Subtotal
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {cartItems.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-white/2 transition-colors group"
                        >
                          {/* Product Info */}
                          <td className="p-6">
                            <div className="flex items-center gap-5">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-800 bg-[#1e293b] shrink-0">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                  {item.productName}
                                </h3>
                                <p className="text-[10px] text-nowrap text-gray-500 font-bold uppercase tracking-tighter mt-1">
                                  {item.brand} •{" "}
                                  <span className="text-blue-500/60">
                                    {item.category}
                                  </span>
                                </p>
                                <p className="text-sm font-black text-gray-400 mt-2">
                                  ${(item.price / item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Quantity Controls */}
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-3 bg-[#020617] w-fit mx-auto p-1 rounded-xl border border-gray-800/50">
                              <button
                                onClick={() => handleDecrement(item._id)}
                                className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-black text-white text-sm w-4">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrement(item._id)}
                                className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-gray-500 hover:text-emerald-500 transition-all"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td className="p-6 text-center">
                            <span className="text-lg font-black text-white tracking-tighter">
                              ${item.price.toFixed(2)}
                            </span>
                          </td>

                          {/* Delete Action */}
                          <td className="p-6 text-center">
                            <button
                              onClick={() => handleDeleteAddToCart(item._id)}
                              className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-24 text-center">
                  <ShoppingBag
                    size={60}
                    className="mx-auto text-gray-800 mb-6"
                  />
                  <h2 className="text-xl font-black text-white italic">
                    CART IS EMPTY
                  </h2>
                  <Link
                    to="/"
                    className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:underline mt-4 inline-block"
                  >
                    Explore Shop
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl sticky top-24">
              <h3 className="text-lg font-black text-white mb-8 uppercase tracking-widest italic border-b border-gray-800 pb-4">
                Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-500">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-6 border-t border-gray-800 mt-4">
                  <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.3em] mb-1">
                    Total Amount
                  </p>
                  <span className="text-3xl font-black text-white tracking-tighter leading-none">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="relative mb-6">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  className="w-full bg-[#020617] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 text-[10px] font-black tracking-widest"
                />
              </div>

              <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/40 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 active:scale-95 group">
                Checkout{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 opacity-50">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                  Secure Checkout Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
