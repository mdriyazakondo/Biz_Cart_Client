import React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiArrowRight } from "react-icons/fi";

const NewArrivals = () => {
  // Real Professional Product Images (Unsplash)
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
        "https://www.sony.com.my/image/13eac3d58a02295bdf3ed5293469b2b6?fmt=png-alpha&wid=960",
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
    <section className="py-24 bg-white">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d97706] font-black tracking-[0.3em] uppercase text-xs mb-3 block">
              Global Standards
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tight">
              New{" "}
              <span className="text-slate-300 font-light italic">Arrivals</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ x: 8 }}
            className="mt-6 md:mt-0 flex items-center gap-2 text-[#0f172a] font-black border-b-2 border-[#0f172a] pb-1 hover:text-[#d97706] hover:border-[#d97706] transition-all"
          >
            VIEW COLLECTION <FiArrowRight />
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {newProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative aspect-3/4 rounded-[2.5rem] overflow-hidden bg-slate-100 mb-6 shadow-sm border border-slate-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Plus Action Button */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-[#0f172a] text-[#d97706] rounded-2xl flex items-center justify-center shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#d97706] hover:text-white"
                >
                  <FiPlus size={26} strokeWidth={3} />
                </motion.button>

                {/* Floating Category Label */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0f172a] shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2">
                <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter group-hover:text-[#d97706] transition-colors leading-none">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xl font-bold text-slate-400">
                    ${item.price}
                  </p>
                  <span className="h-px flex-1 bg-slate-100 mx-4 hidden group-hover:block transition-all"></span>
                  <span className="text-[#d97706] font-black text-xs hidden group-hover:block">
                    NEW
                  </span>
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
