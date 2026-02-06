import React from "react";
import {
  Trash2,
  ShoppingCart,
  Heart,
  ArrowLeft,
  CreditCard,
  Loader2,
} from "lucide-react";
import {
  useDeleteWishlistMutation,
  useGetAllWishlistQuery,
  useWishListAllDeleteMutation,
} from "../../redux/features/wishList/wishListApi";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  useCreateAddToCartMutation,
  useCreateManyAddToCartMutation,
} from "../../redux/features/addToCart/addToCartApi";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const WishList = () => {
  const { users } = useAuth();
  const [createAddToCart] = useCreateAddToCartMutation();
  const [createManyAddToCart] = useCreateManyAddToCartMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [deleteWishlistAll] = useWishListAllDeleteMutation();

  const {
    data: wishListResponse,
    isLoading,
    refetch: refetchWishlist,
  } = useGetAllWishlistQuery(users?.email);

  const wishlistItems = wishListResponse?.wishlist || [];
  const totalPrice = wishListResponse?.totalPrice || 0;

  // 🔹 Delete single wishlist item
  const handleDeleteWishlist = async (wishlistId) => {
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
          didOpen: () => Swal.showLoading(),
          background: "#0f172a",
          color: "#fff",
        });

        await deleteWishlist(wishlistId).unwrap();
        refetchWishlist();

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

  // 🔹 Add single item to cart
  const handleAddToCart = async (item) => {
    if (!users?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to add items to cart!",
        confirmButtonColor: "#3b82f6",
        background: "#0f172a",
        color: "#fff",
      });
    }

    const cartItem = {
      productId: item._id,
      userName: users.displayName,
      userEmail: users.email,
      authorName: item.authorName || "Unknown",
      authorEmail: item.authorEmail || "Unknown",
      productName: item.productName,
      description: item.description,
      price: item.price,
      productImage: item.productImage,
      brand: item.brand,
      category: item.category,
      quantity: 1,
      sku: item.sku || "N/A",
      status: item.status || "cart",
    };

    try {
      Swal.fire({
        title: "Adding to Cart...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: "#0f172a",
        color: "#fff",
      });

      await createAddToCart(cartItem).unwrap();
      refetchWishlist();

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${cartItem.productName} has been added to your cart.`,
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
        iconColor: "#10b981",
      });

      await deleteWishlist(item._id).unwrap();
      refetchWishlist();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong! Please try again.",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  // 🔹 Move all wishlist items to cart
  const handleMoveAllToCart = async () => {
    if (!users?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to move items to cart!",
        confirmButtonColor: "#3b82f6",
        background: "#0f172a",
        color: "#fff",
      });
    }

    if (wishlistItems.length === 0) return;

    try {
      Swal.fire({
        title: "Moving items to Cart...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: "#0f172a",
        color: "#fff",
      });

      const products = wishlistItems.map((item) => ({
        productId: item._id,
        productName: item.productName,
        description: item.description,
        price: item.price,
        productImage: item.productImage,
        brand: item.brand,
        category: item.category,
        quantity: 1,
        sku: item.sku || "N/A",
        status: item.status || "cart",
        authorName: item.authorName || "Unknown",
        authorEmail: item.authorEmail || "Unknown",
      }));

      await createManyAddToCart({
        userName: users.displayName,
        userEmail: users.email,
        products,
      }).unwrap();

      refetchWishlist();

      Swal.fire({
        icon: "success",
        title: "Moved to Cart!",
        text: "All wishlist items have been added to your cart.",
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
        iconColor: "#10b981",
      });
      await deleteWishlistAll(users?.email).unwrap();
      refetchWishlist();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong! Please try again.",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 py-12 px-4 md:px-8 mt-5">
      <div className="max-w-360 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-800/50 pb-8">
          <div>
            <h1 className="text-4xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3 italic">
              <Heart className="text-pink-500 fill-pink-500" /> MY WISHLIST
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-[0.2em] font-semibold">
              {wishListResponse?.count || 0} items curated by you
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-all group bg-[#0f172a] px-5 py-2 rounded-2xl border border-gray-800"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Wishlist Table */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0f172a] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
              {wishlistItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 bg-[#1e293b]/30">
                        <th className="p-6 text-xs font-bold uppercase text-gray-500 tracking-wider">
                          Product
                        </th>
                        <th className="p-6 text-xs font-bold uppercase text-gray-500 tracking-wider text-center">
                          Price
                        </th>
                        <th className="p-6 text-xs font-bold uppercase text-gray-500 tracking-wider text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {wishlistItems.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-700 bg-[#1e293b] shrink-0 relative">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="max-w-xs">
                                <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-blue-400 transition-colors">
                                  {item.productName}
                                </h3>
                                <p className="text-xs text-gray-500 mb-2 uppercase tracking-tighter">
                                  {item.brand || "Premium Brand"}
                                </p>
                                <div className="flex gap-2">
                                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase">
                                    {item.category}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <span className="text-xl font-black text-white">
                              ${item.price}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleAddToCart(item)}
                                title="Add to Cart"
                                className="p-3 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-2xl transition-all shadow-lg active:scale-95 border border-blue-500/20"
                              >
                                <ShoppingCart size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteWishlist(item._id)}
                                title="Remove Item"
                                className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-24 text-center">
                  <div className="w-24 h-24 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                    <Heart size={48} className="text-gray-700" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    Your wishlist is empty
                  </h2>
                  <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">
                    Looks like you haven't added any items yet. Start exploring
                    our premium collection.
                  </p>
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] p-8 rounded-3xl border border-gray-800 shadow-2xl sticky top-24">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest border-b border-gray-800 pb-4 flex items-center gap-2">
                <CreditCard className="text-blue-500" size={20} /> Order Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Total Items:</span>
                  <span className="text-white font-bold">
                    {wishlistItems.length}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal:</span>
                  <span className="text-white font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Shipping:</span>
                  <span className="text-emerald-500 uppercase text-[10px] font-black bg-emerald-500/10 px-2 py-1 rounded">
                    Free
                  </span>
                </div>

                <div className="pt-6 border-t border-gray-800 mt-6">
                  <div className="flex flex-col gap-1 mb-8">
                    <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                      Estimated Total
                    </span>
                    <span className="text-5xl font-black text-white leading-none tracking-tighter">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    disabled={wishlistItems.length === 0}
                    onClick={handleMoveAllToCart}
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-[0.2em] text-xs active:scale-95 mb-4"
                  >
                    Move All To Cart
                  </button>

                  <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-tighter">
                    <span>Secure Checkout</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
