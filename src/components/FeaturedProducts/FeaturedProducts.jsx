import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";

const FeaturedProductsCart = ({ product }) => {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group bg-white rounded-[2.5rem] border border-slate-100 p-4 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)]"
    >
      <div className="relative h-64 w-full rounded-4xl overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-[#d97706] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg">
          {product.discount}% OFF
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-[#0f172a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="bg-white p-3 rounded-full text-[#0f172a] hover:bg-[#d97706] hover:text-white transition-all shadow-xl">
            <FiEye size={20} />
          </button>
          <button className="bg-white p-3 rounded-full text-[#0f172a] hover:bg-[#d97706] hover:text-white transition-all shadow-xl">
            <FiHeart size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={
                i < product.rating
                  ? "text-[#d97706] fill-[#d97706]"
                  : "text-slate-300"
              }
              size={14}
            />
          ))}
        </div>

        <h3 className="text-xl font-extrabold text-[#0f172a] mb-2 truncate group-hover:text-[#d97706] transition-colors">
          {product.name}
        </h3>

        <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 min-h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#0f172a] tracking-tighter">
              ${product.price}
            </span>
            <span className="text-sm text-slate-400 line-through font-bold">
              ${product.oldPrice}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-[#0f172a] text-[#d97706] p-4 rounded-2xl shadow-lg hover:shadow-[#d97706]/20 transition-all flex items-center justify-center"
          >
            <FiShoppingCart size={22} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsCart;
