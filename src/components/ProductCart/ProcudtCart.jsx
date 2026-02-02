import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";

const ProductCart = ({ product }) => {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl border border-slate-100 overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Top Image & Badge */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-[#d97706] text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
          {product.discount}% OFF
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity">
          <FiHeart />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex text-[#d97706] mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className="fill-current" size={12} />
          ))}
        </div>

        <h3 className="text-[#0f172a] font-bold text-lg mb-2 truncate group-hover:text-[#d97706] transition-colors">
          {product.name}
        </h3>

        <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#0f172a]">
              ${product.price}
            </span>
            <span className="text-xs text-slate-400 line-through font-bold">
              ${product.oldPrice}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            className="bg-[#0f172a] text-[#d97706] p-3 rounded-xl hover:bg-[#d97706] hover:text-white transition-all shadow-lg"
          >
            <FiShoppingCart size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCart;
