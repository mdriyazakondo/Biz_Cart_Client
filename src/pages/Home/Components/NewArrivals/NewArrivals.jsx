import React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiArrowRight } from "react-icons/fi";

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      name: "Apple Watch Ultra",
      category: "Wearables",
      price: "799.00",
      image:
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      category: "Audio",
      price: "348.00",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000",
    },
    {
      id: 3,
      name: "Keychron K2 Keyboard",
      category: "Accessories",
      price: "99.00",
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Canon EOS R5",
      category: "Photography",
      price: "3299.00",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              Luxury Tech Selection
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              New{" "}
              <span className="text-slate-700 font-light italic">Arrivals</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ x: 10 }}
            className="group flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.2em] border-b border-slate-800 pb-2 hover:text-amber-500 hover:border-amber-500 transition-all"
          >
            VIEW COLLECTION
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {newProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-900 mb-8 border border-slate-800/50 group-hover:border-amber-500/30 transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />

                {/* Floating Plus Action Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-6 right-6 w-16 h-16 bg-white text-slate-950 rounded-2xl flex items-center justify-center shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-amber-500"
                >
                  <FiPlus size={28} strokeWidth={3} />
                </motion.button>

                {/* Category Label */}
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/10">
                  {item.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="px-1">
                <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-amber-500 transition-colors duration-300">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-5">
                  <p className="text-xl font-bold text-slate-500 group-hover:text-white transition-colors">
                    ${item.price}
                  </p>

                  {/* Subtle 'New' indicator that appears on hover */}
                  <div className="overflow-hidden h-5">
                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest translate-y-10 group-hover:translate-y-0 transition-transform duration-500 block">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
