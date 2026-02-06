import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetProductDetailsQuery } from "../../redux/features/product/productApi";
import {
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Share2,
  Zap,
  Award,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Swal from "sweetalert2";
import { useCreateWishListMutation } from "../../redux/features/wishList/wishListApi";
import useAuth from "../../hooks/useAuth";
import { useCreateAddToCartMutation } from "../../redux/features/addToCart/addToCartApi";
const ProductDetails = () => {
  const { productId } = useParams();
  const { users } = useAuth();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);
  const [createAddToCart] = useCreateAddToCartMutation();
  const [createWishlist] = useCreateWishListMutation();
  const product = response?.data || response;

  const handleWishlist = async (productData) => {
    if (!users?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to add items to wishlist!",
        confirmButtonColor: "#3b82f6",
        background: "#0f172a",
        color: "#fff",
      });
    }

    const wishlistAdd = {
      productId: productData._id,
      userName: users.displayName,
      userEmail: users.email,
      authorName: product.authorName,
      authorEmail: product.authorEmail,
      productName: product.productName,
      description: product.description,
      price: product.price,
      productImage: product.productImage,
      brand: product.brand,
      category: product.category,
      quantity: product.quantity,
      sku: product.sku || "N/A",
      status: product.status,
    };

    try {
      Swal.fire({
        title: "Adding to Wishlist...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        background: "#0f172a",
        color: "#fff",
      });

      await createWishlist(wishlistAdd).unwrap();

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: `${product.productName} has been added to your wishlist.`,
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
        iconColor: "#ec4899",
      });
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

  const handleAddToCart = async (addToCartData) => {
    // 1️⃣ Check if user is logged in
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
      productId: addToCartData._id,
      userName: users.displayName,
      userEmail: users.email,
      authorName: addToCartData.authorName || "Unknown",
      authorEmail: addToCartData.authorEmail || "Unknown",
      productName: addToCartData.productName,
      description: addToCartData.description,
      price: addToCartData.price,
      productImage: addToCartData.productImage,
      brand: addToCartData.brand,
      category: addToCartData.category,
      quantity: 1, // default 1
      sku: addToCartData.sku || "N/A",
      status: addToCartData.status || "cart",
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

      // 5️⃣ Show success
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

  if (isLoading) return <ProductSkeleton />;
  if (isError)
    return (
      <div className="text-center py-20 text-red-400 font-bold">
        Product not found!
      </div>
    );

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-200 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* 1. Navbar Space / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-28 sm:px-6 lg:px-8">
        <nav className="flex text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-10 items-center gap-2">
          <a href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </a>
          <span className="opacity-30">/</span>
          <a href="/shop" className="hover:text-indigo-400 transition-colors">
            Collection
          </a>
          <span className="opacity-30">/</span>
          <span className="text-slate-300 truncate">
            {product?.productName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* 2. Image Showcase Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square bg-slate-800/50 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-sm overflow-hidden group flex items-center justify-center p-12 shadow-2xl">
              {/* Decorative Glow */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>

              <img
                src={product?.productImage}
                alt={product?.productName}
                className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />

              <div className="absolute bottom-8 right-8 flex gap-3">
                <button className="p-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-full hover:bg-indigo-600 transition-all text-white shadow-xl">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Sub Images */}
            <div className="grid grid-cols-4 gap-4 px-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-indigo-500 transition-all cursor-pointer p-3 group"
                >
                  <img
                    src={product?.productImage}
                    className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                    alt="thumb"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Product Info Content */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              <Award size={14} /> {product?.brand} Official Store
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tighter">
              {product?.productName}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-bold border-l border-slate-700 pl-4 uppercase tracking-widest">
                492 Reviews
              </span>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 font-light">
              {product?.description}. Precision engineered for excellence and
              designed to stand out in any environment.
            </p>

            {/* Pricing Card */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-4xl p-8 mb-10 backdrop-blur-md">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black text-white">
                  ${product?.price}
                </span>
                <span className="text-xl text-slate-500 line-through font-light">
                  ${product?.discountPrice}
                </span>
              </div>
              <p className="text-green-400 text-sm font-bold flex items-center gap-1">
                <Zap size={14} fill="currentColor" /> Flash Deal: Save{" "}
                {Math.round(
                  ((product?.discountPrice - product?.price) /
                    product?.discountPrice) *
                    100,
                )}
                % Today
              </p>
            </div>

            {/* Selection & Actions */}
            <div className="space-y-6 mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-yellow-600  rounded-full h-16 px-8 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-500 text-white transform active:scale-95 shadow-[0_0_40px_rgba(79,70,229,0.2)] transition-all duration-600"
                >
                  <ShoppingCart size={20} /> Add to Bag
                </button>
              </div>

              <button
                onClick={() => handleWishlist(product)}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors py-2 group"
              >
                <Heart
                  size={18}
                  className="group-hover:fill-red-500 group-hover:text-red-500 transition-all"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Add to Wishlist
                </span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-1 gap-4 border-t border-slate-800 pt-8">
              <div className="flex items-center gap-4 text-slate-400 bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
                <Truck className="text-indigo-400" size={24} />
                <div className="text-xs">
                  <p className="font-black text-slate-200 uppercase tracking-tighter">
                    Fast Priority Shipping
                  </p>
                  <p>Order within 2 hours for tomorrow delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Specs Section */}
        <div className="mt-32 border-t border-slate-800/50 pt-20 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={20} className="text-indigo-500" /> Guarantee
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed text-justify">
                Every {product?.productName} comes with a 2-year international
                warranty. We ensure 100% authentic quality directly from{" "}
                {product?.brand}.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
                <RotateCcw size={20} className="text-indigo-500" /> Easy Returns
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed text-justify">
                Not satisfied? We offer a 30-day no-questions-asked return
                policy. Our couriers will pick it up from your doorstep.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={20} className="text-indigo-500" /> Secure
                Checkout
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed text-justify">
                Your data security is our priority. All transactions are
                encrypted with military-grade SSL security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for Dark Mode
const ProductSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-32 animate-pulse bg-[#0f172a]">
    <div className="grid grid-cols-12 gap-16">
      <div className="col-span-7 h-150 bg-slate-800 rounded-[2.5rem]"></div>
      <div className="col-span-5 space-y-10">
        <div className="h-20 w-full bg-slate-800 rounded-2xl"></div>
        <div className="h-40 w-full bg-slate-800 rounded-3xl"></div>
        <div className="h-16 w-full bg-slate-800 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default ProductDetails;
