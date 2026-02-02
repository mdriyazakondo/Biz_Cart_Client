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
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-[#d97706]">
              <FiTrendingUp strokeWidth={3} />
              <span className="font-black text-xs uppercase tracking-[0.3em]">
                Top Choice
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight">
              Best <span className="text-[#d97706]">Sellers</span>
            </h2>
          </motion.div>

          <div className="hidden md:flex gap-2 bg-white p-1 rounded-2xl border border-slate-200">
            <button className="px-6 py-2 bg-[#0f172a] text-white rounded-xl font-bold text-sm">
              Weekly
            </button>
            <button className="px-6 py-2 text-slate-500 hover:text-[#0f172a] font-bold text-sm">
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
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-4xl border border-slate-100 p-4 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full rounded-3xl overflow-hidden bg-slate-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#d97706] hover:text-white">
                  <FiHeart size={18} />
                </button>
                <div className="absolute bottom-4 left-4 bg-[#0f172a]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                  🔥 {product.sales}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 px-2">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#d97706] text-[10px] font-black uppercase tracking-widest">
                    {product.category}
                  </p>
                  <div className="flex text-[#d97706]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < product.rating ? "fill-current" : "text-slate-200"
                        }
                        size={10}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-black text-[#0f172a] group-hover:text-[#d97706] transition-colors line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-black text-[#0f172a]">
                    ${product.price}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#0f172a] text-[#d97706] p-3 rounded-xl shadow-lg hover:shadow-[#d97706]/30 transition-all"
                  >
                    <FiShoppingCart size={20} strokeWidth={2.5} />
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
