import React from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import {
  useDecrementAddToCartMutation,
  useDeleteAddToCartManyMutation,
  useDeleteAddToCartMutation,
  useGetAllAddToCartQuery,
  useIncrementAddToCartMutation,
} from "../../redux/features/addToCart/addToCartApi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useCreateOrderApiMutation } from "../../redux/features/order/orderApi";
import { useGetRoleByUserQuery } from "../../redux/features/users/userApi";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const AddToCart = () => {
  const { users } = useAuth();

  // API Hooks
  const { data: cartResponse, isLoading: isCartLoading } =
    useGetAllAddToCartQuery(users?.email);
  const [incrementAddToCart] = useIncrementAddToCartMutation();
  const [decrementAddToCart] = useDecrementAddToCartMutation();
  const [deleteAddToCart] = useDeleteAddToCartMutation();
  const [deleteAddToCartMany] = useDeleteAddToCartManyMutation();
  const [orderCreate, { isLoading: isOrderCreating }] =
    useCreateOrderApiMutation();
  const { data: userData } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  // Data Handlers
  const cartItems = cartResponse?.AddToCart || [];
  const subtotal = cartResponse?.totalPrice || 0;
  const shipping = cartItems.length > 0 ? 15.0 : 0;
  const tax = subtotal * 0.05;
  const totalAmount = subtotal + shipping + tax;

  // Functions
  const handleIncrement = async (id) => await incrementAddToCart(id);

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      await decrementAddToCart(item._id);
    } else {
      handleDeleteAddToCart(item._id);
    }
  };

  const handleDeleteAddToCart = async (cartId) => {
    const result = await Swal.fire({
      title: "Remove Item?",
      text: "Are you sure you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#1e293b",
      confirmButtonText: "Yes, Remove",
      background: "#020617",
      color: "#fff",
      iconColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await deleteAddToCart(cartId).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
          background: "#020617",
          color: "#fff",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to delete",
          background: "#020617",
          color: "#fff",
        });
      }
    }
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) return;

    const orderData = {
      userId: userData?.user?._id,
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: Number(totalAmount.toFixed(2)),
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      status: "Pending",
    };

    try {
      await orderCreate(orderData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Order Placed! 🎉",
        text: "Your order has been recorded successfully.",
        background: "#020617",
        color: "#fff",
      });
      await deleteAddToCartMany(users.email).unwrap();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error?.data?.message || "Something went wrong",
        background: "#020617",
        color: "#fff",
      });
    }
  };

  if (isCartLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-800/50 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
              <ShoppingBag className="text-blue-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                My <span className="text-blue-500">Cart</span>
              </h1>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                {cartItems.length} Products in your bag
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="text-gray-400 hover:text-blue-400 text-xs font-bold uppercase tracking-widest transition-all"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-3">
            <div className="bg-[#0f172a]/50 rounded-4xl border border-gray-800 overflow-hidden shadow-2xl backdrop-blur-sm">
              {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 bg-slate-900/50">
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                          Product
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Quantity
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Subtotal
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {cartItems.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-white/2 transition-colors group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-5">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-800 bg-slate-900 shrink-0 shadow-lg">
                                <img
                                  src={item.productImage}
                                  alt=""
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                  {item.productName}
                                </h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">
                                  {item.brand} •{" "}
                                  <span className="text-blue-500/60">
                                    {item.category}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-3 bg-[#020617] w-fit mx-auto p-1.5 rounded-xl border border-gray-800/50 shadow-inner">
                              <button
                                onClick={() => handleDecrement(item)}
                                className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-black text-white text-sm w-6">
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
                          <td className="p-6 text-center">
                            <span className="text-lg font-black text-white tracking-tighter">
                              ${item.price.toFixed(2)}
                            </span>
                          </td>
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
                  <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                    <ShoppingBag size={40} className="text-gray-700" />
                  </div>
                  <h2 className="text-xl font-black text-white italic tracking-widest uppercase">
                    Cart is Empty
                  </h2>
                  <Link
                    to="/"
                    className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest py-3 px-8 rounded-full transition-all"
                  >
                    Explore BizCart
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl sticky top-28">
              <h3 className="text-lg font-black text-white mb-8 uppercase tracking-widest italic border-b border-gray-800 pb-4">
                Order Summary
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-500">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <span>Tax (5%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-6 border-t border-gray-800 mt-4">
                  <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.3em] mb-1">
                    Total Amount
                  </p>
                  <span className="text-3xl font-black text-blue-500 tracking-tighter leading-none">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="relative mb-6 group">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  className="w-full bg-[#020617] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 text-[10px] font-black tracking-widest placeholder:text-gray-700 transition-all"
                />
              </div>

              <button
                onClick={handleOrder}
                disabled={isOrderCreating || cartItems.length === 0}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${
                  isOrderCreating
                    ? "bg-slate-800 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/40"
                }`}
              >
                {isOrderCreating ? "Processing..." : "Confirm Checkout"}
                {!isOrderCreating && <ArrowRight size={16} />}
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 opacity-40">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                  Secure Checkout
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
