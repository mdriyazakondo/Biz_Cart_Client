import React from "react";
import FeaturedProductsCart from "../../../../components/FeaturedProducts/FeaturedProducts";
import { useTrendingProductsQuery } from "../../../../redux/features/product/productApi";
import { motion } from "framer-motion";

const TopCategories = () => {
  const { data: products, isLoading, isError } = useTrendingProductsQuery();

  // Skeleton/Loading State
  if (isLoading)
    return (
      <div className="py-24 bg-[#020617] text-center">
        <div className="inline-block w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-black tracking-widest text-xs uppercase">
          Fetching Trending Gear...
        </p>
      </div>
    );

  // Error State
  if (isError)
    return (
      <div className="py-24 bg-[#020617] text-center">
        <p className="text-red-400 font-bold bg-red-400/10 inline-block px-6 py-2 rounded-full border border-red-400/20">
          Oops! Failed to synchronize products.
        </p>
      </div>
    );

  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-1 bg-amber-500 rounded-full"></span>
              <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">
                Most Wanted
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Trending <span className="text-amber-500">Products</span>
            </h2>
            <p className="text-slate-500 font-medium mt-4 max-w-md">
              Selected premium items that are currently dominating the
              professional landscape.
            </p>
          </motion.div>

          <div className="h-px flex-1 bg-slate-800/50 mx-8 hidden lg:block"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products?.map((product, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
