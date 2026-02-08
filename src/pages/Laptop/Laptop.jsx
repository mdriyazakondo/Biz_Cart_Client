import React from "react";
import { useCategoryProductsQuery } from "../../redux/features/product/productApi";
import { motion } from "framer-motion";
import { FaLaptop } from "react-icons/fa";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";
// Fixed typo in import path/name if necessary
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const Laptop = () => {
  // Category name ta dynamic ba properly cased rakha bhalo
  const { data, isLoading, error } = useCategoryProductsQuery("Laptop");

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
        <p className="text-red-400 font-bold bg-red-400/10 px-6 py-3 rounded-xl border border-red-400/20 text-center">
          Failed to load laptops. Please check your connection.
        </p>
      </div>
    );

  const products = data?.products || [];

  return (
    <section className="min-h-screen bg-[#020617] pb-24 pt-32 mt-20">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 uppercase">
              Available <span className="text-blue-500">Models</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full align-middle">
                {products.length} Items
              </span>
            </h1>
            <p className="text-slate-500 mt-2">
              Browse our collection of high-end portable computers.
            </p>
          </div>
          <div className="h-px flex-1 bg-slate-800/50 mx-8 hidden lg:block mb-4"></div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <FeaturedProductsCart product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-32 bg-[#0f172a]/30 rounded-[40px] border border-dashed border-slate-800">
            <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLaptop className="text-slate-600 text-4xl" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">
              No Laptops Found
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              We are currently restocking our laptop inventory. Please check
              back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Laptop;
