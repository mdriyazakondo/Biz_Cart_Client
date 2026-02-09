import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiStar, FiHeart, FiTrendingUp } from "react-icons/fi";

const BestSellers = () => {
  const popularProducts = [
    {
      id: 1,
      name: "MacBook Pro M3",
      category: "Laptops",
      price: "1999.00",
      rating: 5,
      sales: "1.2k+ Sold",
      image:
        "https://static0.xdaimages.com/wordpress/wp-content/uploads/2023/11/macbook-pro-m3-max-xda-review08761.jpg",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "Phones",
      price: "999.00",
      rating: 5,
      sales: "3k+ Sold",
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Logitech MX Master 3",
      category: "Accessories",
      price: "99.00",
      rating: 4,
      sales: "5k+ Sold",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Dell UltraSharp 32",
      category: "Monitors",
      price: "749.00",
      rating: 5,
      sales: "800+ Sold",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-[#020617]">
      {" "}
      {/* Background full dark */}
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="flex items-center gap-2 mb-3 text-indigo-500">
              <FiTrendingUp strokeWidth={3} className="animate-bounce" />
              <span className="font-black text-[10px] uppercase tracking-[0.4em]">
                Market Favorites
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Best <span className="text-indigo-500">Sellers</span>
            </h2>
          </motion.div>

          <div className="flex gap-2 bg-[#0f172a] p-1.5 rounded-2xl border border-slate-800">
            <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all">
              Weekly
            </button>
            <button className="px-8 py-2.5 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-colors">
              Monthly
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-[#0f172a] rounded-[2.5rem] border border-slate-800/50 p-5 transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] relative overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full rounded-4xl overflow-hidden bg-slate-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-indigo-600 hover:scale-110">
                  <FiHeart size={18} />
                </button>

                {/* Sales Badge */}
                <div className="absolute bottom-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl">
                  {product.sales}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-8 px-2">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    {product.category}
                  </p>
                  <div className="flex gap-0.5 text-amber-400 bg-amber-400/5 px-2 py-1 rounded-lg">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < product.rating ? "fill-current" : "text-slate-700"
                        }
                        size={10}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-1 tracking-tight">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      Starting at
                    </span>
                    <span className="text-2xl font-black text-white">
                      ${product.price}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-slate-950 p-4 rounded-2xl shadow-xl hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  >
                    <FiShoppingCart size={22} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
