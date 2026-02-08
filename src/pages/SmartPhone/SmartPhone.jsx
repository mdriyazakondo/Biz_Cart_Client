import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryProductsQuery } from "../../redux/features/product/productApi";
import { FaMobileAlt, FaCamera, FaBatteryFull, FaSearch } from "react-icons/fa";
import { BsCpu } from "react-icons/bs";

import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const SmartPhone = () => {
  const { data, isLoading, error } = useCategoryProductsQuery("SmartPhones");
  const [activeBrand, setActiveBrand] = useState("All");

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center p-10 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] backdrop-blur-md">
          <p className="text-red-400 font-bold text-xl">Connection Error</p>
          <p className="text-slate-500 mt-2">
            Could not sync with the smartphone inventory.
          </p>
        </div>
      </div>
    );

  const allProducts = data?.products || [];

  const brands = ["All", ...new Set(allProducts.map((p) => p.brand))];

  const filteredProducts =
    activeBrand === "All"
      ? allProducts
      : allProducts.filter((p) => p.brand === activeBrand);

  return (
    <section className="min-h-screen bg-[#020617] pb-32 pt-30">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 uppercase">
              Available <span className="text-blue-500">Models</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full align-middle">
                {allProducts.length} Items
              </span>
            </h1>
            <p className="text-slate-500 mt-2">
              Browse our collection of high-end portable computers.
            </p>
          </div>
          <div className="h-px flex-1 bg-slate-800/50 mx-8 hidden lg:block mb-4"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <FeaturedProductsCart product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* --- EMPTY STATE --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-40 bg-[#0f172a]/20 rounded-[4rem] border border-dashed border-slate-800">
            <div className="relative inline-block mb-6">
              <FaMobileAlt className="text-slate-800 text-7xl" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest">
              Out of Stock
            </h3>
            <p className="text-slate-500 mt-2">
              No smartphones match the selected criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartPhone;
