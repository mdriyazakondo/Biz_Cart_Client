import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useCreateWishListMutation } from "../../redux/features/wishList/wishListApi";
import Swal from "sweetalert2";
import { useCreateAddToCartMutation } from "../../redux/features/addToCart/addToCartApi";

const FeaturedProductsCart = ({ product }) => {
  const { users } = useAuth();
  const [createWishlist] = useCreateWishListMutation();
  const [createAddToCart] = useCreateAddToCartMutation();
  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.discountPrice - product.price) / product.discountPrice) * 100,
      )
    : 0;

  const handleWishlist = async (product) => {
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
        text: `${product.productName} has been added to your cart.`,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-[#0f172a] rounded-3xl border border-slate-800/50 p-3 transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900">
        <img
          src={product.productImage || "https://via.placeholder.com/300"}
          alt={product.productName}
          className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />

        {/* Dynamic Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xl uppercase tracking-tighter">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <Link
            to={`/products/${product._id}`}
            className="bg-white p-3.5 rounded-2xl text-[#020617] hover:bg-amber-500 transition-all shadow-2xl transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <FiEye size={20} strokeWidth={2.5} />
          </Link>
          <button
            onClick={() => handleWishlist(product)}
            className="bg-white p-3.5 rounded-2xl text-[#020617] hover:bg-amber-500 transition-all shadow-2xl transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <FiHeart size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 py-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            {product.brand || "Premium"}
          </span>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/50 rounded-lg">
            <FiStar className="text-amber-500 fill-amber-500" size={10} />
            <span className="text-[10px] font-black text-white">4.8</span>
          </div>
        </div>

        <h3 className="text-md font-bold text-white mb-4 truncate group-hover:text-amber-500 transition-colors">
          {product.productName}
        </h3>

        {/* Price & Cart Section */}
        <div className="flex items-center justify-between border-t border-slate-800/50 pt-5 mt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter">
              ${product.price}
            </span>
            {product.discountPrice > product.price && (
              <span className="text-[11px] text-slate-500 line-through font-black">
                ${product.discountPrice}
              </span>
            )}
          </div>

          <motion.button
            onClick={() => handleAddToCart(product)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-amber-500 text-slate-950 h-14 w-14 rounded-2xl shadow-lg shadow-amber-500/10 flex items-center justify-center hover:bg-white transition-all duration-300"
          >
            <FiShoppingCart size={22} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsCart;
