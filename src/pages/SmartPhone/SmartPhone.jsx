import React from "react";
import { motion } from "framer-motion";
import { useCategoryProductsQuery } from "../../redux/features/product/productApi";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";

const SmartPhone = () => {
  const { data, isLoading, error } = useCategoryProductsQuery("SmartPhones");

  console.log("API Response:", data);

  if (isLoading)
    return <div className="text-white text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-20">
        Error loading products.
      </div>
    );

  return (
    <section className="py-24 bg-[#020617] mt-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {data?.products?.map((product, index) => (
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

        {data?.products?.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default SmartPhone;
